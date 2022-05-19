# !/usr/bin/env bash 

CSS_FILE=$(find dist/assets -type f -name "index.*.css")
JS_FILE=$(find dist/assets -type f -name "index.*.js")


CSS_STRIPPED=$(echo "$CSS_FILE" | sed "s/dist\/assets\///g")
# JS_STRIPPED=$(echo "$JS_FILE" | sed "s/dist\/assets\///g")
# JS2_STRIPPED=$(echo "$JS_FILE[1]" | sed "s/dist\/assets\///g")
# arr=()
count=0
for i in $JS_FILE
do
    TEMP=$(echo "$i" | sed "s/dist\/assets\///g")
    echo "$TEMP"
    sed -i'.bak' -e "s/id=\"replaceMeJS$count\"/type=\"module\" src=\".\/assets\/$TEMP\"/g" dist/index.html
    let "count+=1" 
    echo "$count"
done


sed -i'.bak' -e "s/id=\"replaceMeCSS\"/rel=\"stylesheet\" href=\".\/assets\/$CSS_STRIPPED\"/g" dist/index.html
# sed -i'.bak' -e "s/id=\"replaceMeJS\"/type=\"module\" src=\".\/assets\/${arr[0]}\"/g" dist/index.html


rm -rf dist/static/
rm -rf dist/index.html.bak


