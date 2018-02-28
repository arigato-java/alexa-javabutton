#!/bin/bash
SRC_PATH=`realpath \`dirname $0\`/../src`
DIST_PATH=`realpath \`dirname $0\`/../dist`
DIST_FILES="package.json java.js kakugen.json"
mkdir "$DIST_PATH"
set -e

pushd "$SRC_PATH"
cp -a $DIST_FILES "$DIST_PATH"
popd
pushd "$DIST_PATH"
npm update --production
rm -f ../lambda.zip
zip -9rXq ../lambda.zip $DIST_FILES node_modules
echo aws --profile lambda lambda update-function-code --function-name AlexaJavabutton --zip-file fileb://../lambda.zip
#aws --profile lambda lambda update-function-configuration --function-name AlexaJavabutton --handler java.handler
popd


