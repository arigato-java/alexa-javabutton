#!/bin/sh
set -e
SRC_PATH=`realpath \`dirname $0\`/../src`

cd "$SRC_PATH"
wget -nc -nd --quiet https://arigato-java.download/kakugen.json


