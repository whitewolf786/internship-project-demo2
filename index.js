// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
}
var flight= new Array(['Air India','Delhi','Mumbai',5000],['Air India','Mumbai','Ahmedabad',4500],['Indigo','Delhi','Mumbai',4300],['SpiceJet','Mumbai','Ahmedabad',4000],['SpiceJet','Delhi','Mumbai',4000]);
flight.push(['GoAir','Delhi','Mumbai',4500],['Indigo','Mumbai','Ahmedabad',3300],['Indigo','Mumbai','Ahmedabad',3500],['Vistara','Delhi','Mumbai',5500],['SpiceJet','Mumbai','Ahmedabad',3500]);

    function createFlight(agent)
    {   
         var date= new Date(agent.parameters.date);
         var datenow= new Date();
         var src= agent.parameters.geocity;
         var des= agent.parameters.geocity1;
    
    if(date.getFullYear()<datenow.getFullYear())
    {
        agent.add(' Cannot book flights for year : '+date.getFullYear());
    }
    else if(date.getMonth()<datenow.getMonth())
         {
              agent.add(' Cannot book flights for month : '+(date.getMonth()+1));
         }    
         else if(date.getMonth()==datenow.getMonth())
                {
                    if(date.getDay()<datenow.getDay())
                    {
                      agent.add(' Cannot book flights for date : '+date.getDate());  
                    }
                    else 
                     {
        
        agent.add('I have found the following flights matching your search : ');
        for ( var i=0; i<flight.length; i++ )
         {
             if((flight[i][1]==src)&&(flight[i][2]==des))
             {  
                agent.add(i+')'+'Flight : '+flight[i][0]+'  From : '+flight[i][1]+'  To : '+flight[i][2]+'  Ticket : Rs.'+flight[i][3]);
               
             }
             
         }
                     }
                     
                }
                else 
                {
        agent.add('I have found the following flights matching your search : ');
        for ( i=0; i<flight.length; i++ )
         {
             if((flight[i][1]==src)&&(flight[i][2]==des))
             {  
                agent.add(i+')'+'Flight : '+flight[i][0]+'  From : '+flight[i][1]+'  To : '+flight[i][2]+'  Ticket : Rs.'+flight[i][3]);
               
             }
             
         }
                }
        
    }
   
    function selectFlight(agent)
    {       
        var option= agent.parameters.option;
        var pass= agent.parameters.pass;
        var date= new Date(agent.parameters.date);
        var p= parseInt(pass);
        var total= flight[option][3]*p;
        agent.add('Flight : '+flight[option][0]);
        agent.add('From : '+flight[option][1]);
        agent.add('To : '+flight[option][2]);
        agent.add('Date of Travel : '+date);
        agent.add('Price : '+flight[option][3]);
        agent.add('Passengers : '+pass);
        agent.add('Total Amount : Rs.'+total);
        agent.add('Do you want to confirm the booking ?');
    }
   
      
      
  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('flight_book_details_full', createFlight);
  intentMap.set('flight_selection', selectFlight);
  intentMap.set('flight_selection_no', createFlight);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
