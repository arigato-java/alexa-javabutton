'use strict';
const Alexa=require('alexa-sdk');
const HelpMessage='ジャバして、と言えば、ジャバと発音します。格言を言って、と言えば、ジャバに関する格言を言います。ジャバが走るデバイスの数を調べて、と言うと、推定デバイス数をお答えします。何をしますか？';
const ByeMessage='さようなら、ジャバ。';
const AppletName='ジャバボタン';
// 審査対応　当局による検閲。　格言のブラックリスト
const KakugenBlacklist=new Set([
	"ea968cf58d7700ca2ecaafda932c3f7d0ffef99e30a047c8ee111bc804340c8d",
	"48f26d4e815c74a10ee471c04677123ca41dbd24e3e9cd9f388e5e17fbe395c6",
	"0eadad98665b6c3d6a177f4f6001c0f1b2fbff3db8a4052c08a1e739d8b6a807",
	"285d3ccdd9bf477eec1abf8d4f148dd5c17bbd99deaf2fdfe14af54bef0b622e",
	"b50f498c442f04bad089330772f5568d983256eac3caa2430f2e667e3fb5efce",
	"33015ee3645690e8ffc11883c7d03e19e6d00ea6d2802b996ca6752ba46e1436",

	"612579b1f01a28cfc268fcd83c3596cd50eb91594622ed219aa1d09e0f8dcaa5",
	"9253989554be0169c676eb53a99d673643b929ade87a4314bc9a952155db62ba",
	"ee767df2e0fe9fe3b23dca51d2776a7074cec31c1e83c00053c495b4359d7eb0",
	"52f5bb6236e186f93fe3858aaaeb2b60215cad697ffc083229ec5c0519be45e0",
	"696bfc1b1c1a84b55519c74c566a29efb4129020dbe99852077473ec9bf7f9fe",
	"9140acc15aa511eb5a8d375bb3547c5450830014b462f8bd21eb2fd90fee0e80",
	"91cbec4d5499bc23a25bef0e6ab4f741645ac66b470b247ac92e6109fa23c548",
	"06ba82e893e85581ca15636717f8813159ad5705bc4bbe965ece5c162a85f7f6",
	"99839eb74882b633ca925e3c92b0f877ff801696b7d8b6f811818617c85cd1c0",
	"768d5715c49c7456bb6561cc243c6ba464f2c294a2056f2104b0bae114f00a0b",
	"a4ef27a8886d031e08ae3178d26bf22e59cfc3c8af9d5d107f9704520e4031bd",
	"a8f779250966347eff87e21ebe831ab0364d23e5ea7ff334f88736c4f08b79df",
	"2ed2ff69b7e5589ba747f5a47f073aab73e5c7c5b8dc6189693d3ed26f9e10b4",
	"745ffbfa9a36bde312f208069e706a4c34d0bfb485d76e35e2f3c1046a7cf143",
	"33ba8fd6ecac8ecc7eb01a604ddcf8d3b1b97d3e5cab84edbed19d651720e1f9",
	"3db1b1fddfaca49bb9277c2d4dbe08294b369edf9c8eb467a452cab7ab146fc5"
]);

var handlers={
	'LaunchRequest':function(){
		this.emit(':ask','あなたとジャバにようこそ。'+HelpMessage,HelpMessage);
	},
	'SingleJavaIntent':function(){
		var res='ジャバ。';
		this.response.cardRenderer(AppletName,res);
		this.response.speak(res);
		this.emit(':responseReady');
	},
	'JavaIntent':function(){
		var javaCount=Number(this.event.request.intent.slots.Javacount.value);
		if(!Number.isInteger(javaCount) || javaCount<=0){
			this.emit(':ask','わからないジャバ。複数回ジャバするには、五回ジャバして、のように言ってください。どうしますか？');
		}else{
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
		}
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
		// ブラックリスト処理
		var crypto=require('crypto');
		var hash=crypto.createHash('sha256');
		hash.update(kakugen);
		var hash_hex=hash.digest('hex');
		if(KakugenBlacklist.has(hash_hex)){
			kakugen='ノットジャバ';
		}
		// ブラックリスト処理　おわり
		this.response.cardRenderer(AppletName,kakugen);
		this.response.speak(kakugen);
		this.emit(':responseReady');
	},
	'AMAZON.HelpIntent':function(){
		this.emit(':ask',HelpMessage,HelpMessage);
	},
	'AMAZON.CancelIntent':function(){
		this.emit(':tell',ByeMessage);
	},
	'AMAZON.StopIntent':function(){
		this.emit(':tell',ByeMessage);
	},
	'Unhandled':function(){
		this.emit(':tell','わからないジャバ。');
	}
};
exports.handler=function(event,context,callback){
	var alexa=Alexa.handler(event,context);

	//alexa.appId='';
	//alexa.dynamoDBTableName=''; // session mgmt

	alexa.registerHandlers(handlers);
	alexa.execute();
};
