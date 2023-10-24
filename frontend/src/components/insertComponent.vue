<template>
    <div>
      <h2>Tilgung eintragen</h2>
      <!-- 
        <form @submit.prevent="insertTilgung">
        <div>
          <label for="id">ID:</label>
          <input type="number" id="id" v-model="item.id" >
        </div>
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="item.name" required>
        </div>
        <div>
          <button type="submit">Insert item</button>
        </div>
      </form>
      -->

      <form @submit.prevent="addTilgung">
        <div>
          <label for="datum">Datum:</label>
          <input type="date" lang="de" id="datum" v-model="tilgung.datum" required>
        </div>
        <div>
          <label for="betrag">Betrag:</label>
         <input type="number" step="0.01" id="betrag" v-model="tilgung.betrag" required>
         
        </div>
        <button type="submit"> senden</button>       
      </form>


    </div>
  </template>
  
  <script>

  //import { addTilgung} from "../js/dataservice";  
  import eventBus from '../eventBusFunctions';

  export default {
    data() {
      return {
        tilgung: {
          datum: '',
          betrag: '227.25',
        },
      };
    },
    methods: {     
      async addTilgung() {
        try {

          eventBus.$emit('evt_eb_addTilgung', this.tilgung);
        }catch(error) {
          console.error('Error fetching data:',error);
        }
      },
    }
}
      
    
  
  </script>
  
  <style scoped>
  /* Add your CSS styles here */
  </style>