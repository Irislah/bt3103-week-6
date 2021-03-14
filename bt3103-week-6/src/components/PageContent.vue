<template>
  <div>
    <h1 class="storename">Jcheez's Zi Char</h1>
      <ul>
        <li><router-link to="/" exact>Home</router-link></li>
        <li><router-link to="/orders" exact>Orders</router-link></li>
      </ul>
    <div class="part">
        <ul class="box">
            <li v-for="item in items" :key="item.name"><div v-text="item.name"></div><img v-bind:src="item.imageURL"><br>${{item.price}}<qc v-bind:item="item" v-on:counter="onCounter"></qc></li>
        </ul> 
    </div>
    <div class="part">
        <basket v-bind:itemsSelected="itemsSelected"></basket>
        <!-- <button style="background-color:pink;border-radius: 5px;" v-on:click="sendOrder">Add Order</button> -->
        <p v-show="flag">Subtotal: ${{subTotal}}</p>
        <p v-show="flag">Grand Total: ${{parseFloat(subTotal*1.07).toFixed(2)}}</p>
    </div>
  </div>
</template>

<script>
import QuantityCounter from './QuantityCounter.vue';
import Basket from './Basket.vue';
import database from '../firebase.js';

export default {
    // props:['itemsList'],  
    data() {
        return {
            itemsSelected: [],
            flag: false,
            items:[],
            result: 0       
        }
    },
    components: {
        'qc': QuantityCounter,
        'basket':Basket
    },
    methods: {
        onCounter: function (item, count) {
            if (this.itemsSelected.length === 0 && count > 0) {
                //If there is nothing in items selected, push the ORDER in
                this.itemsSelected.push([item.name, count, item.price]);
            } else {
                // Loop through everything to check what is not in the basket
                for (let i = 0; i < this.itemsSelected.length; i++) {
                    const curr_item = this.itemsSelected[i];
                    const item_name = curr_item[0];
                    var update = false;
                    // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                    if (item_name == item.name && count>0) {
                        this.itemsSelected.splice(i,1);
                        this.itemsSelected.push([item.name, count, item.price]);
                        //curr_item[1] = count;
                        update = true;
                    } else if (item_name == item.name && count==0) {
                        // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.                        
                        this.itemsSelected.splice(i,1);
                        update = true;
                    }
                }
                // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
                if (update==false) {
                    this.itemsSelected.push([item.name, count, item.price]);
                }                
            }
        },
        fetchItems: function() {
          database.collection('menu').get().then(snapshot => {
              let item={}
              snapshot.docs.forEach(doc => {
                  console.log(doc.data());
                  item=doc.data()
                  item.id=doc.id
                  this.items.push(item);
              });
          });
        },
        // sendOrder: function() {
        //     database.collection('orders').add({
        //         name: "HHH",
        //         count: 2
        //         }).then(() => {location.reload()});
        // }
    },
    created() {
        this.fetchItems();
    },

    computed: {
      subTotal: function() {
        var cost=0;
        var item;
        for (var i=0; i<this.itemsSelected.length; i++) {
            item = this.itemsSelected[i];
            cost += item[1]*item[2];
        }
        return cost;
        }
    }

    }



</script>

<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}

.storename {
    background-color:#8CB4DC;
    color:white;
    text-align:center;
    padding: 18px;
}

.part {
    float:left;
}
</style>