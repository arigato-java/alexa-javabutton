'use strict';
const alexaTest=require('alexa-skill-test-framework');
alexaTest.initialize(
	require('./java.js'),"amzn1.ask.skill.00000000-0000-0000-0000-000000000000","amzn1.ask.account.VOID"
);
alexaTest.initializeI18N({});
alexaTest.setLocale("ja-JP");

function printResponse(context,utterance){
	console.log(utterance);
}

describe("LaunchRequest and CancelIntent",function(){
	alexaTest.test([
		{ request: alexaTest.getLaunchRequest(), shouldEndSession: false, repromptNothing:false,
		  saysCallback: printResponse },
		{ request: alexaTest.getIntentRequest('AMAZON.CancelIntent'), shouldEndSession:true,
		  saysCallback: printResponse }
	]);
});

describe("LaunchRequest and StopIntent",function(){
	alexaTest.test([
		{ request: alexaTest.getLaunchRequest(), shouldEndSession: false, repromptNothing:false,
		  saysCallback: printResponse },
		{ request: alexaTest.getIntentRequest('AMAZON.StopIntent'), shouldEndSession:true,
		  saysCallback: printResponse }
	]);
});

describe("LaunchRequest and SessionEndedRequest",function(){
	alexaTest.test([
		{ request: alexaTest.getLaunchRequest(), shouldEndSession: false, repromptNothing:false,
		  saysCallback: printResponse },
		{ request: alexaTest.getSessionEndedRequest('USER_INITIATED'), shouldEndSession:true,
		  saysCallback: printResponse }
	]);
});

describe("AMAZON.HelpIntent",function(){
	alexaTest.test([
		{ request: alexaTest.getIntentRequest("AMAZON.HelpIntent"), shouldEndSession: false,
		  saysCallback: printResponse }
	]);
});

describe("SingleJavaIntent",function(){
	alexaTest.test([
		{ request: alexaTest.getIntentRequest('SingleJavaIntent'), shouldEndSession: true,
		  saysCallback: printResponse }
	]);
});

describe('JavaIntent with small count',function(){
	let slot={'Javacount':8};
	let requestWithSlot=alexaTest.getIntentRequest('JavaIntent',slot);
	alexaTest.test([
		{ request: requestWithSlot, shouldEndSession: true,
		  saysCallback: printResponse }
	]);
});

describe('JavaIntent with huge count',function(){
	let slot={'Javacount':3000000};
	let requestWithSlot=alexaTest.getIntentRequest('JavaIntent',slot);
	alexaTest.test([
		{ request: requestWithSlot, shouldEndSession: true,
		  saysCallback: printResponse }
	]);
});

describe('JavaIntent with invalid count',function(){
	let slot={'Javacount':'?'};
	let requestWithSlot=alexaTest.getIntentRequest('JavaIntent',slot);
	alexaTest.test([
		{ request: requestWithSlot, shouldEndSession: false,
		  saysCallback: printResponse }
	]);
});

describe('JavaCountIntent',function(){
	alexaTest.test([
		{ request: alexaTest.getIntentRequest('JavaCountIntent'), shouldEndSession: true,
		  saysCallback: printResponse }
	]);
});

describe('JavaKakugenIntent',function(){
	alexaTest.test([
		{ request: alexaTest.getIntentRequest('JavaKakugenIntent'), shouldEndSession: true,
		  saysCallback: printResponse }
	]);
});


