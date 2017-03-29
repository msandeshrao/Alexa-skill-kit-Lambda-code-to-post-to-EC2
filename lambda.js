exports.handler = function( event, context ) {

   var http = require( 'http' );

   var options = {
      host: <your_host_name_here>,
      path: '/',
      port: '8080',
      method: 'POST',
      'Content-Type': 'application/json;charset=UTF-8'
   };

   callback = function(response) {

      var str = '';

      response.on('data', function (chunk) {
         str += chunk;
      });

      response.on('end', function () {
         output(report, context);
      });
   };

    
   
    
   if (event.request.type === "LaunchRequest"){
        var speechOutput = <Greeting_message_here>;
        var sessionAttributes = {
                                 "speechOutput": speechOutput,
                                 "repromptText": speechOutput 
                             };
         console.log("Here!");
         var speechletResponse = buildSpeechletResponse(<skill_name>, speechOutput, speechOutput, false);
         context.succeed(buildResponse(sessionAttributes, speechletResponse));
       }

    
   if (event.request.type === "IntentRequest") {
      if(event.request.intent.slots.Answer){
        var targetSlot = event.request.intent.slots.Answer.value;
        var report = <response_string_to_return_to_user>;
        var req = http.request(options, callback);
        var postData = <data_to_be_sent_to_server>;
    
        req.write(postData);
        req.end();
      }
      if(event.request.intent.slots.Answers){
        var value = event.request.intent.slots.Answers.value.toString();
        if(<checking_for_condition>){
            var report = <response_string_to_return_to_user>;
            var reqs = http.request(options, callback);
            var postDatas = <data_to_be_sent_to_server>;
            
            reqs.write(postDatas);
            reqs.end();
        }else if(value === "stop"){
        var speechsOutput = <exit_message>;
        var sessionsAttributes = {
                                 "speechOutput": speechsOutput,
                                 "repromptText": speechsOutput 
                             };
         var speechletsResponses = buildSpeechletResponse(<skill_name>, speechsOutput, speechsOutput, true);
         context.succeed(buildResponse(sessionsAttributes, speechletsResponses)); 
      }else{
        var speechsOutput = <handle_undefined_cases_and_respond_back>;
        var sessionsAttributes = {
                                 "speechOutput": speechsOutput,
                                 "repromptText": speechsOutput 
                             };
         var speechletsResponses = buildSpeechletResponse(<skill_name>, speechsOutput, speechsOutput, false);
         context.succeed(buildResponse(sessionsAttributes, speechletsResponses));
      }
      } 
      
   }
};

function output( text, context ) {

   var response = {
      outputSpeech: {
         type: "PlainText",
         text: text
      },
      card: {
         type: "Simple",
         title: "System Data",
         content: text
      },
   shouldEndSession: false
   };

   context.succeed( {response : response} );

}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}
