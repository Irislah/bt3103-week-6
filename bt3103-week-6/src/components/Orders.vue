<template>
    <div>
      <h1 class="storename">Jcheez's Zi Char</h1>
      <ul style="display: flex;">
        <li class="box"><router-link to="/" exact>Home</router-link></li>
        <li class="box"><router-link to="/orders" exact>Orders</router-link></li>     
      </ul>
      
      <div class="part">
        <ul style="display: flex;">
            <li class="box" v-for="order in orders" :key="order[0]">
                <div v-for="(itemName,itemCount) in order[1]" :key="itemCount">
                    {{itemCount}} : {{itemName}}
                </div>
              <button class="but" v-bind:id="order[0]" v-on:click="deleteItem($event)">Delete</button>
              <button class="but" v-bind:id="order[0]" v-on:click="route($event)">Modify</button>
            </li>
        </ul> 
      </div>      
    </div>
</template>

<script>
import database from '../firebase.js';

export default {
    data() {
        return {
            orders:[],  
        }
    }, 
    methods: {
        fetchItems: function() {
          database.collection('orders').get().then(snapshot => {
              snapshot.docs.forEach(doc => {                  
                  this.orders.push([doc.id,doc.data()]);
                  //console.log(this.orders);
              });
          });
        },
        deleteItem: function(event) {
          let doc_id = event.target.getAttribute("id");
          this.orders = this.orders.filter(x => x[0]!=doc_id);
          database.collection('orders').doc(doc_id).delete();
        },
        route: function(event) {
          let doc_id=event.target.getAttribute("id")
          this.$router.push({name:"modify",params:{doc_id:doc_id}})
          //this.$router.push({names:'/modify',params:{id:id}});
          //router.push()和this.$route都不行
        }     
    },
    created() {
        this.fetchItems();
        //console.log(this.orders);
    }
}
</script>

<style scoped>

ul {
  /* display: flex; */
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

.box {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}

.storename {
    background-color:#8CB4DC;
    color:white;
    text-align:center;
    padding: 18px;
}

.but {
  float:left;
  margin-left: 30px;
}

.left {
  float:left;
  margin-left: 30px;
}
</style>