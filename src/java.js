'use strict';
const Alexa=require('alexa-sdk');
const HelpMessage='ジャバして、と言えば、ジャバと発音します。格言を言って、と言えば、ジャバに関する格言を言います。ジャバが走るデバイスの数を調べて、と言うと、推定デバイス数をお答えします。';
const AppletName='ジャバボタン';

var handlers={
	'LaunchRequest':function(){
		let askMessage=HelpMessage+'何をしますか？';
		this.emit(':ask','あなたとジャバ、今すぐダウンロード。'+askMessage,askMessage);
	},
	'JavaIntent':function(){
		var javaCount=0;
		try{
			javaCount=this.event.request.intent.slots.Javacount.value;
		}catch(ignored){}
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
		this.response.cardRenderer(AppletName,res);
		this.response.speak(res);
		this.emit(':responseReady');
	},
	'JavaCountIntent':function(){	// ジャバが動くデバイスの数
		const atTime=Date.now();
		const javapointX=Date.UTC(2015,9,5,16,41,9); // 2015-Oct-05T16:41:00Z 7 Billion Devices (Oracle India)
		const javapointY=Date.UTC(2016,7,29,16,58,52); // 2016-08-29T16:58:52Z 15 Billion Devices (java.go)

		const tXY=javapointY-javapointX;
		const logdevX=Math.log(7e9);
		const logdevY=Math.log(15e9);
		const devdiffXY=logdevY-logdevX;

		const tNX=atTime-javapointX;
		const projection=Math.round(Math.exp(logdevX+(tNX/tXY)*devdiffXY));
		const res=String(projection)+'のデバイスで走るジャバ';
		this.response.cardRenderer(AppletName,res);
		this.response.speak(res);
		this.emit(':responseReady');
	},
	'JavaKakugenIntent':function(){ // 格言
		const tbl=require('./kakugen.json');
		const k_id=Math.floor(Math.random()*tbl.length);
		let kakugen=tbl[k_id].t;
		this.response.cardRenderer(AppletName,kakugen);
		this.response.speak(kakugen);
		this.emit(':responseReady');
	},
	'AMAZON.HelpIntent':function(){
		this.emit(':tell',HelpMessage);
	},
	'AMAZON.CancelIntent':function(){
		this.emit(':tell','さようなら、ジャバ。');
	},
	'AMAZON.StopIntent':function(){
		this.emit(':tell','さようなら、ジャバ。');
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
