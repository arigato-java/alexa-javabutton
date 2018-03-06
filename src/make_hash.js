'use strict';
// 審査対応用に、格言のブラックリストのハッシュリストを作るためのヘルパー
const kakugen=require('./kakugen.json');
const crypto=require('crypto');

kakugen.forEach((pair)=>{
	var hash=crypto.createHash('sha256');
	hash.update(pair.t);
	var hex=hash.digest('hex');
	console.log(JSON.stringify(pair.t)+" => "+hex);
});

