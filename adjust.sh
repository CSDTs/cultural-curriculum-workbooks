# !/usr/bin/env bash 

CSS_FILE=$(find dist/assets -type f -name "index.*.css")
JS_FILE=$(find dist/assets -type f -name "index.*.js")

CSS_STRIPPED=$(echo "$CSS_FILE" | sed "s/dist\/assets\///g")
JS_STRIPPED=$(echo "$JS_FILE" | sed "s/dist\/assets\///g")

sed -i'.bak' -e "s/id=\"replaceMeCSS\"/rel=\"stylesheet\" href=\".\/assets\/$CSS_STRIPPED\"/g" dist/index.html
sed -i'.bak' -e "s/id=\"replaceMeJS\"/type=\"module\" crossorigin src=\".\/assets\/$JS_STRIPPED\"/g" dist/index.html

rm -rf dist/static/
rm -rf dist/index.html.bak


