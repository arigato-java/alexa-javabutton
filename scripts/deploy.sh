#!/bin/sh
set -e
SRC_PATH=`realpath \`dirname $0\`/../src`

pushd "$SRC_PATH"
npm update
rm -f ../lambda.zip
zip -9rXq ../lambda.zip java.js node_modules packages.json kakugen.json
aws --profile lambda lambda update-function-code --function-name AlexaJavabutton --zip-file fileb://../lambda.zip
#aws --profile lambda lambda update-function-configuration --function-name AlexaJavabutton --handler java.handler
popd


