


//const apiUrl = 'http://codesrv:3000';
//const apiUrl = 'http://192.168.1.113:3000';

const port = window.location.port ? ':' + window.location.port : '';
const apiUrl = window.location.protocol + '//' + window.location.hostname + port;

////////////////////////
// test
let items = ['I1']

export const getTestItems = () => {
    console.log("returing testItems: " + items)
    return items;
}

export const insertItem = (newItem) => {
    items.push(newItem);
    console.log("New test-Item added");
}
////////////////////////



export async function fetchTilgungen() {  
    try {
      const response = await fetch(apiUrl+'/api/tilgung');      
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }  
      const data = await response.json();
      console.log(data); // Handle the data you received
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }


  }

  export async function fetchDarlehen() {  
    try {
      const response = await fetch(apiUrl+'/api/darlehen');      
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }  
      const data = await response.json();
      console.log(data); // Handle the data you received
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

export async function addTilgung(data) {
    try {
        const response = await fetch(apiUrl+'/api/addTilgung',{
          method: "POST",  
          headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( 
              data
            )
        }); // Replace with your API endpoint
        console.log("response to addTilgung: ", response.status, " ok: ", response.ok);
        
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

export async function deleteTilgung(data) {
  try {
      const response = await fetch(apiUrl+'/api/deleteTilgung',{
        method: "POST",  
        headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify( 
            data
          )
      }); // Replace with your API endpoint
      console.log("response to deleteTilgung: ", response.status, " ok: ", response.ok);
      
  } catch (error) {
      console.error('Error deleting items:', error);
  }    
}
