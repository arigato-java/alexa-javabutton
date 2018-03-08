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
	"988bc15a584a7886520d56e9c1855ce8b90c311793317bf373e3584f717a876c",
	"34e191626e98231012856dc4b02717d6a273c2a8607f2d371c0b1e3d371bd55a",
	"e626fa4128497573725a2e991083ec14dcd06b7f8d1382240694e8a4e84a8d09",
	"51fff1672e731da5c3aa8249fe412062be06a49e7b721ee127dc52470193d90d",
	"f16312f46ac29fd456b05c66f6a275cefd6338d06d24840a7aaa07dadb0c92d6",
	"89ec7245128eaf1880fb2efa8ba4e5b16e1ffc884e3219849f2cfd10ce72cb18",
	"3d9dc3c78cf2af5d7588a14f67c0c774939bcf676b5e22634b9aefa42e5b2606",
	"a736287e9758abebf3bc38796cb1a0d78b0de143b9962af9ca717d370c1839fc",
	"a6ed1eaab74c44bf0c2c0fcc4a954fdb4f736bdad3430ee8626c06e9de072624",
	"9aa5e562a8e79ab030c054ed8619e7d4edf4a8448971ce2e86920ec55e1606ad"
]);

function KakugenAmazonify(kakugen){
	const emojiRegex=require('emoji-regex/es2015/text.js');
	const emojis=emojiRegex();
	let amzn1=kakugen.replace(/ダウンロード?/g,'ド');
	let amzn2=amzn1.replace(/[?？｜]/g,'。');
	let amzn3=amzn2.replace(/自殺/g,'ノットジャバ');
	let amzn4=amzn3.replace(/殺/g,'コロコロ');
	let amzn5=amzn4.replace(emojis,'');
	return amzn5;
}

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
		let kakugen_amzn=KakugenAmazonify(kakugen);
		this.response.cardRenderer(AppletName,kakugen_amzn);
		this.response.speak(kakugen_amzn);
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
