import {Client } from '../LogicApi/ApiModels';

export const testData = () => {
    var jopa = new Client("https://localhost:7277");
     var test = jopa.getAllPosts(0,10);
    

  // return (<h1>fuck</h1> );
}