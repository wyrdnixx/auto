<template>
    <div>      
      
      <!-- <h2>Darlehen vom {{darlehen[0] ? darlehen[0].datum : 'Loading...' }}  Betrag:  {{darlehen[0] ? darlehen[0].betrag : 'Loading...' }} € </h2>-->
      <h2>Darlehen vom {{darlehen[0] ? darlehen[0].datum : 'Loading...' }}  Betrag:  {{darlehen[0] ? formattedMoney(this.darlehen[0].betrag)  : 'Loading...' }} € </h2>
      <h2> offener Restbetrag: {{darlehenDiv ? formattedMoney(darlehenDiv) : 'Loading...' }} </h2>      
      
      <div v-if="!selectedRows.length == 0">
        <form @submit.prevent="deleteData">        
          <button type="submit"> delte selected data</button>       
        </form>
      </div>      
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Datum</th>
          <th>Betrag</th>
          <th>Validiert</th>
        </tr>
      </thead>
      <tbody>
        <tr class="summaryLine">
          <td></td>
          <td>Summe</td>
          <td>{{ formattedMoney(idSum) }} </td>
          <td></td>
        </tr>
        <tr v-for="t in tilgung" :key="t.id"
          :class="{ selected: isSelected(t.id) }"
          @click="toggleSelection(t.id)"
        >
          <td>{{ t.id }}</td>
          <td>{{ t.datum }}</td>
          <td>{{ formattedMoney(t.betrag) }}</td>
          <td>{{ t.validated }}</td>
        </tr>
      </tbody>
    </table>
    </div>
  </template>
  
  <script>

  import {  fetchDarlehen, fetchTilgungen } from "../js/dataservice";

  export default {
    data() {
      return {
        tilgung: [],
        //idSum: 0, // Initialize the sum to 0
        darlehen: [],
        //darlehenDiv:0,
        selectedRows: [],
        
      };
    },
    computed: {    
      idSum:  function()  {        
        return Object.values(this.tilgung).reduce((sum, entry) => sum + entry.betrag, 0);
      },
      darlehenDiv: function() {
        // check if the darlehen has alraedy been fetched...
        if (undefined != this.darlehen[0]) {
          return Math.abs(this.darlehen[0].betrag - this.idSum);          
        } else {
          return null
        }
        
      }
    },
    
    mounted() {      
      this.updateData();
    },
    created() {
      
    },
    methods: {

      async updateData() {
        try {
          this.darlehen = await fetchDarlehen();              
          this.tilgung = await fetchTilgungen();          
        }catch(error) {
          console.error('Error fetching data:',error)
        }
      },

      formattedMoney(number) {
      // Format the number as a money value
        return number.toLocaleString('de-DE', {
          style: 'currency',
          currency: 'EUR', // Change this to match your currency
        });
      },
      toggleSelection(index) {
        if (this.isSelected(index)) {
          this.selectedRows = this.selectedRows.filter(selectedIndex => selectedIndex !== index);
        } else {
          this.selectedRows.push(index);
        }
      },
      isSelected(index) {
        return this.selectedRows.includes(index);
      },    
    },
  };
  </script>
    <style scoped>
    /* Add your CSS styles here */

    .summaryLine{
      font-weight: bold;
      background-color: #b3b3b3;
    }

    .selected {
       background-color: #cce6ff; /* Apply your preferred style */
    }
    </style>