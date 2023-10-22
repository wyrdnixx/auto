<template>
  <div id="app">
    <!--
      <img alt="Vue logo" src="./assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    -->
    <insertComponent/>
    <ItemListComponent  ref="ItemListComponentRef" />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import ItemListComponent from './components/ItemListComponent.vue'
import insertComponent from './components/insertComponent.vue';

import { EventBus } from './main.js';


export default {
  name: 'App',
  components: {
   // HelloWorld,
    insertComponent,
    ItemListComponent
  }, 
  created() {
    EventBus.$on('EVTcustom-event', (data) => {
      // Handle the event data
      console.log("Eventbus got test Data: ", data);
      console.log("Eventbus Data: ", data.betrag, " + ", data.datum);
      console.log("Eventbus ItemListComponentData: ", this.$refs.ItemListComponentRef.darlehen[0].betrag);
      EventBus.$emit('EVTRefreshData');

    });

    EventBus.$on('EVTRefreshData', () => {
      this.$refs.ItemListComponentRef.updateData();
    });
  },
  methods: {
    refreshData() {
      //this.$refs.ItemListComponentRef.updateData();
      
     
    }
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 10vh;
        }

        table {
            width: 90%; /* Adjust this to control the table's width as a percentage of the window */
            max-width: 800px; /* Adjust this to set a maximum width for the table */
            background-color: #fff;
            border-collapse: collapse;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            overflow: hidden;
            margin: 20px;
        }

        th, td {
            text-align: left;
            padding: 10px;
            border-bottom: 1px solid #ddd;
            text-align: right;
        }

        th {
            background-color: #4CAF50;
            color: white;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        tr:hover {
            background-color: #e0e0e0;
        }
</style>
