'use strict';
const alexaTest=require('alexa-skill-test-framework');
alexaTest.initialize(
	require('./java.js'),"amzn1.ask.skill.00000000-0000-0000-0000-000000000000","amzn1.ask.account.VOID"
);
alexaTest.initializeI18N({});
alexaTest.setLocale("ja-JP");

describe("AMAZON.HelpIntent",function(){
	alexaTest.test([
		{ request: alexaTest.getIntentRequest("AMAZON.HelpIntent"), shouldEndSession: true },
	]);
});

