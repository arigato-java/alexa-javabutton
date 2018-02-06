'use strict';
const Alexa=require('alexa-sdk');
const HelpMessage='例えば、30億回ジャバして、などと言ってください。';

var handlers={
	'LaunchRequest':function(){
		this.response.speak('あなたとジャバ、今すぐダウンロード')
		this.emit(':responseReady');
	},
	'JavaIntent':function(){
		var javaCount=0;
		try{
			javaCount=this.event.request.intent.slots.Javacount.value;
		}catch(ignored){}
		// 呼びかけで「あなジャバ」はプレイヤーが発言している
		var utter=[];
		if(javaCount && 10<javaCount){
			utter.push(javaCount+'のデバイスで走るジャバ');
		}else{
			if(!javaCount){javaCount=1;}
			for(var i=0;i<javaCount;i++){
				utter.push('ジャバ');
			}
		}
		var res=utter.join('、')+'。';
		this.response.cardRenderer('ジャバボタン',res);
		this.response.speak(res);
		this.emit(':responseReady');
	},
	'AMAZON.HelpIntent':function(){
		this.response.speak(HelpMessage);
		this.emit(':ask');
	},
	'AMAZON.CancelIntent':function(){
		this.response.speak('やめるジャバ');
		this.emit(':responseReady');
	},
	'AMAZON.StopIntent':function(){
		this.response.speak('コボルのように死んだ言語。ジャバは置き換えられる時期に来ているのか。');
		this.emit(':responseReady');
	},
	'Unhandled':function(){
		this.emit(':ask',HelpMessage,HelpMessage);
	}
};
exports.handler=function(event,context,callback){
	var alexa=Alexa.handler(event,context);

	//alexa.appId='';
	//alexa.dynamoDBTableName=''; // session mgmt

	alexa.registerHandlers(handlers);
	alexa.execute();
};
