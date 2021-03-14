<template>
    <div>
      <h1 class="storename">Jcheez's Zi Char</h1>
      <ul style="display: flex;">
        <li class="box"><router-link to="/" exact>Home</router-link></li>
        <li class="box"><router-link to="/orders" exact>Orders</router-link></li>    
      </ul>

      <div v-if="'Sambal KangKung' in this.order">Sambal KangKung: {{this.order["Sambal KangKung"]}}</div>
      <div v-else>Sambal KangKung: 0</div>
      <input v-bind:id="index" type="number" placeholder = 0 min="0" v-model="sk"><br><br>

      <div v-if="'Cereal Prawn' in this.order">Cereal Prawn: {{this.order["Cereal Prawn"]}}</div>
      <div v-else>Cereal Prawn: 0</div>
      <input v-bind:id="index" type="number" placeholder = 0 min="0" v-model="cp"><br><br>

      <div v-if="'Mapo Tofu' in this.order">Mapo Tofu: {{this.order["Mapo Tofu"]}}</div>
      <div v-else>Mapo Tofu: 0</div>
      <input v-bind:id="index" type="number" placeholder = 0 min="0" v-model="mt"><br><br>
      
      <div v-if="'Dry Beef Hor Fun' in this.order">Dry Beef Hor Fun: {{this.order["Dry Beef Hor Fun"]}}</div>
      <div v-else>Dry Beef Hor Fun: 0</div>
      <input v-bind:id="index" type="number" placeholder = 0 min="0" v-model="db"><br><br>

      <div v-if="'Pork Fried Rice' in this.order">Pork Fried Rice: {{this.order["Pork Fried Rice"]}}</div>
      <div v-else>Pork Fried Rice: 0</div>
      <input v-bind:id="index" type="number" placeholder = 0 min="0" v-model="pf"><br><br>

      <div v-if="'Prawn omelette' in this.order">Prawn omelette: {{this.order["Prawn omelette"]}}</div>
      <div v-else>Prawn omelette: 0</div>
      <input v-bind:id="index" type="number" placeholder = 0 min="0" v-model="po"><br><br>

      <button v-on:click="back()">Update Order</button>
    </div>
</template>

<script>
import database from '../firebase.js';

export default {
    data() {
        return {
            datapacket:[],
            order:{},
            number:[],
            sk:0,
            cp:0,
            mt:0,
            db:0,
            pf:0,
            po:0,
            id:this.$route.params.doc_id 
        }
    }, 
    methods: {
        fetchItems: function() {
          database.collection('menu').get().then(snapshot => {          
              snapshot.docs.forEach(doc1 => { 
                  this.datapacket.push([doc1.data().name,0])
                  this.number.push(0)
              })               
          });
          database.collection('orders').get().then(snapshot => {         
              snapshot.docs.forEach(doc2 => { 
                if (doc2.id==this.id) {
                  this.order=doc2.data();
                  //console.log(this.order)
                }
              })
          });
          //console.log(this.datapacket);
          console.log(this.datapacket.length);
          for (var i = 0; i < this.datapacket.length; i++){
            console.log(i);
          }

        },
        back: function() {
          var neworder = this.order;
          if (this.sk!=0){
            neworder["Sambal KangKung"]=this.sk;
          }
          if (this.cp!=0){
            neworder["Cereal Prawn"]=this.cp;
          }
          if (this.mt!=0){
            neworder["Mapo Tofu"]=this.mt;
          }
          if (this.db!=0){
            neworder["Dry Beef Hor Fun"]=this.db;
          }
          if (this.pf!=0){
            neworder["Pork Fried Rice"]=this.pf;
          }
          if (this.po!=0){
            neworder["Prawn omelette"]=this.po;
          }
          database.collection('orders').doc(this.id).set(neworder).then(()=>{
            this.$router.push('orders');
            location.reload();
          });
          
        }
    },
    created() {
        this.fetchItems();
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