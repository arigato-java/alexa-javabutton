# アレクサ、あなたとジャバ

[![CircleCI](https://circleci.com/gh/arigato-java/alexa-javabutton.svg?style=svg)](https://circleci.com/gh/arigato-java/alexa-javabutton)

> アレクサ、ジャバボタンでジャバして

> アレクサ、ジャバボタンで5回ジャバして

> アレクサ、ジャバボタンで30億回ジャバして

> アレクサ、ジャバボタンを開いて。ジャバが動くデバイスの数は？

> アレクサ、ジャバボタンで名言を教えて

以下開発中

> アレクサ、ジャバボタンで明日の天気を調べて


## デプロイ方法

* Alexaのラムダはus-east-1 に設置する。
* `alexa-sdk` を使うために、ラムダ作ろときのテンプレートに `alexa-skill-kit-sdk-factskill` を選ぶ
* パーミッションは Simple Microservice でOK

あとは、Alexa Developer Console からポチポチとやる

`scripts/deploy.sh` のような感じでアップデートしたら自動でデプロイしていくと良い。
