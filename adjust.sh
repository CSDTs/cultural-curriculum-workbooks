# !/usr/bin/env bash 

CSS_FILE=$(find dist/assets -type f -name "index.*.css")
JS_FILE=$(find dist/assets -type f -name "index.*.js")


# CSS_STRIPPED=$(echo "$CSS_FILE" | sed "s/dist\/assets\///g")
# JS_STRIPPED=$(echo "$JS_FILE" | sed "s/dist\/assets\///g")
# JS2_STRIPPED=$(echo "$JS_FILE[1]" | sed "s/dist\/assets\///g")
# arr=()
js=0
css=0
for i in $JS_FILE
do
    TEMP=$(echo "$i" | sed "s/dist\/assets\///g")
    sed -i'.bak' -e "s/id=\"replaceMeJS$js\"/type=\"module\" crossorigin src=\".\/assets\/$TEMP\"/g" dist/index.html
    let "js+=1" 
done

for i in $CSS_FILE
do
    TEMP=$(echo "$i" | sed "s/dist\/assets\///g")
    sed -i'.bak' -e "s/id=\"replaceMeCSS$css\"/rel=\"stylesheet\" href=\".\/assets\/$TEMP\"/g" dist/index.html
    let "css+=1"
done




# sed -i'.bak' -e "s/id=\"replaceMeJS\"/type=\"module\" src=\".\/assets\/${arr[0]}\"/g" dist/index.html


rm -rf dist/static/
rm -rf dist/index.html.bak


