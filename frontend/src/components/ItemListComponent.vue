<template>
    <div>      
      <!-- <h2>Darlehen vom {{darlehen[0] ? darlehen[0].datum : 'Loading...' }}  Betrag:  {{darlehen[0] ? darlehen[0].betrag : 'Loading...' }} € </h2>-->
      <h2>Darlehen vom {{darlehen[0] ? darlehen[0].datum : 'Loading...' }}  Betrag:  {{darlehen[0] ? formattedMoney(this.darlehen[0].betrag)  : 'Loading...' }} € </h2>
      <h2> offener Restbetrag: {{darlehenDiv ? formattedMoney(darlehenDiv) : 'Loading...' }} </h2>      
      
      <div >
        <form @submit.prevent="deleteTilgungen">        
         <!--  <button type="submit" :disabled="selectedRows.length == 0"> delte selected data</button>     -->
          <b-button type="submit" :disabled="selectedRows.length == 0" variant="warning">delte selected data</b-button>   
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
        <tr v-for="t in tilgungen" :key="t.id"
          :class="{ selected: isSelected(t.id) }"
          @click="toggleSelection(t.id)"
        >
          <td>{{ t.id }}</td>
          <td>{{ t.datum }}</td>
          <td>{{ formattedMoney(t.betrag) }}</td>
          <td><!-- 
            <span v-if="t.validated">{{ t.validated }}</span>
            <img v-else :src="../assets/logo.png" alt="Image" /> -->
            <span v-if="t.validated">{{ t.validated }}</span>
            <img v-else :src="imageUrl" alt="Image" width="30" height="30" />            
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </template>
  
  <script>

  //import {  fetchDarlehen, fetchTilgungen } from "../js/dataservice";
  import eventBus from '../eventBusFunctions';
  
 export default {
    components: {
      
    },
    data() {
      return {
        imageUrl: `${process.env.BASE_URL}openValidation.png`, // Set to your actual image URL
        //imageUrl: "https://www.hosteurope.de/blog/wp-content/uploads/2015/04/Abbildung-Favicon-einf%C3%BCgen-mit-Homepage-Baukasten-300x186.png", // Set to your actual image URL
        
        tilgungen: [],
        //idSum: 0, // Initialize the sum to 0
        darlehen: [],
        //darlehenDiv:0,
        selectedRows: [],
   
      };
    },
    computed: {    
      idSum:  function()  {        
        return Object.values(this.tilgungen).reduce((sum, entry) => sum + entry.betrag, 0);
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
      //this.updateData();
      eventBus.$on('evt_ItemListComp_udpateDarlehen', async (data) => {
        console.log("ItemListComp got darlehen from eventBus: ", data[0])        
        this.darlehen =  data;        
      });
      eventBus.$on('evt_ItemListComp_udpateTilgungen', async (data) => {
        console.log("ItemListComp got tilgungen from eventBus: ", data)        
        this.tilgungen =  data;        
      });
      
    },
    created() {
      eventBus.$emit('evt_eb_udpateDarlehen');
      eventBus.$emit('evt_eb_udpateTilgungen');
    },
    methods: {


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

      deleteTilgungen() {
        console.log("emiting evt_eb_deleteTilgungen ")
        eventBus.$emit('evt_eb_deleteTilgungen',this.selectedRows );          
        
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