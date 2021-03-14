<template>
    <div>
        <p> Menu: </p>
        <ul>
            <li v-for="(stuff, x) in itemsSelected" :key="x">{{stuff[0]}} x{{stuff[1]}}</li>
        </ul>
        <button style="background-color:pink;border-radius: 5px;" v-on:click="sendOrder">Add Order</button>
        <p v-show="flag">Subtotal: ${{subTotal}}</p>
        <p v-show="flag">Grand Total: ${{parseFloat(subTotal*1.07).toFixed(2)}}</p>
    </div>
</template>

<script>
import database from '../firebase.js';

export default {
    props:['itemsSelected'],
    data() {
        return {
            flag: false,
            result: 0       
        }
    },
    methods:{
        sendOrder: function() {
            var order = {}
            for (let i = 0; i < this.itemsSelected.length; i++) {
                var curr_item = this.itemsSelected[i];
                order[curr_item[0]] = curr_item[1];
            }
            database.collection('orders').add(order).then(() => {location.reload()});
        }
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

</style>