import {Client } from '../LogicApi/ApiModels';

export const TestData = () => {
   var jopa = new Client("https://localhost:7277");
   var test =  jopa.getAllPosts(0,10);
   //console.log(test);
   //console.log("fgfff",test);
  // let govno = test.then(function(response) { return response;})
   //console.log("eeeee",govno);
   return  (
    <div>  
      </div>
    
   );
}




async function getResult(){
  var jopa = new Client("https://localhost:7277");
   var result =  await jopa.getAllPosts(0,10);
   
  return result;
}

export async function DoTask(){
  let data = await getResult();
  console.log(data)
  return <div>
    {data[0].comments?.toString()}
  </div>
}
 
 

 


// Пример отправки  запроса:
export async function GetData(url = '') {
  // Default options are marked with *
   var response =  fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        "Accept": "text/plain",
        "Access-Control-Allow-Origin": "*",
    },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
  }).then(function(response) {response.json()});
  
  return response; // parses JSON response into native JavaScript objects
  }


  export function api<T>(url: string): Promise<T> {

    return fetch(url,
      {
       
        method: "Get",
       
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
    }
  
 