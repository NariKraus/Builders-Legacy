#!/bin/bash
rm -rf content;
mkdir content;

for page in `ls templates/ | sed s/\.html//g`; do
    if [ "${page}" != "pageheader" -a "${page}" != "pagefooter" ]; then
        if [ "`head -n1 templates/${page}.html | grep DOCTYPE`" == "" ]; then
            echo "Building ${page}.html";
            cat templates/{pageheader,${page},pagefooter}.html > content/${page}.html;
            if [ "${page}" == "settings" ]; then
                echo "Modifying ${page}.html";
                # Search for a specific string and append a new string to it
                current_datetime=$(date +'%Y%m%d%H%M%S')
                sed -i "s|<p id=\"date-placeholder\"></p>|<p id=\"built-date\"><strong>Version: </strong>${current_datetime}</p>|" "content/${page}.html"
            fi
        else
            echo "Copying ${page}.html";
            cat templates/${page}.html > content/${page}.html;
        fi
    fi
done
echo "Page builds complete.";