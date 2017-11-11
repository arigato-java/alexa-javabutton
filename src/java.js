'use strict';
const Alexa=require('alexa-sdk');

var handlers={
	'LaunchRequest':function(){
		this.emit('MyIntent');
	},
	'MyIntent':function(){
		// 呼びかけで「あなジャバ」はプレイヤーが発言している
		this.response.speak('今すぐダウンロード');
		this.emit(':responseReady');
	}
};
exports.handler=function(event,context,callback){
	var alexa=Alexa.handler(event,context);

	//alexa.appId='';
	//alexa.dynamoDBTableName=''; // session mgmt
	
	alexa.registerHandlers(handlers);
	alexa.execute();
};

