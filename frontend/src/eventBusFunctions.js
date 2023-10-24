
//import { EventBus } from './main.js';

// eventBusFunctions.js
import Vue from 'vue';
const eventBus = new Vue();

import { addTilgung, fetchDarlehen, fetchTilgungen, deleteTilgung} from "./js/dataservice";  



export default eventBus;

    
eventBus.$on('EVTcustom-event2', (data) => {
  // Handle the event data
  console.log("Eventbus got test Data: ", data);
  console.log("Eventbus Data: ", data.betrag, " + ", data.datum);
  console.log("Eventbus ItemListComponentData: ", this.$refs.ItemListComponentRef.darlehen[0].betrag);

  
});

eventBus.$on('evt_eb_udpateDarlehen', async () => {
  console.log("EVT_testUpdateEvent triggered ");
  const res = await fetchDarlehen();
  console.log("eventbus EVT_testUpdateEvent got: ", res[0].datum)
  eventBus.$emit('evt_ItemListComp_udpateDarlehen', res);
});

eventBus.$on('evt_eb_udpateTilgungen', async () => {
  console.log("evt_eb_udpateTilgungen triggered ");
  const res = await fetchTilgungen();  
  eventBus.$emit('evt_ItemListComp_udpateTilgungen', res);
});

eventBus.$on('evt_eb_addTilgung', async (data) => {
  console.log("evt_eb_addTilgung triggered for: ", data)
  try {
     await addTilgung(data);
    eventBus.$emit('evt_eb_udpateTilgungen');
  }catch (error) {
    
    console.log("Error on addTilgung: ", error);

  }
})

eventBus.$on('evt_eb_deleteTilgungen', async (data) => {
  console.log("evt_eb_deleteTilgungen triggered: ", data);
  data.forEach(async (element, index) => {  
    console.log(`evt_eb_deleteTilgungen  ${index}: ${element}`);
    await deleteTilgung(element);
    
  });
  const res = await fetchTilgungen();  
  eventBus.$emit('evt_ItemListComp_udpateTilgungen', res);
});
