#!/bin/bash
[ -d dist ] && rm -rf dist
mkdir dist
cp -r public/* dist
# esbuild --bundle --minify src/index.js
# cat public/index.head.html > dist/index.html
# echo -n '      <a id="applink" href="javascript:void%20function(){' >> dist/index.html
BUILD_ID=$(echo -n $(date "+%Y%m%d_%H%M%S" | tr -d '\r\n') $(git rev-parse --short HEAD | tr -d '\r\n'))
echo build $BUILD_ID
# cat src/loader.min.js \
#     | sed 's/ /%20/g' \
#     | sed 's/"/%22/g' \
#     | sed 's/#/%23/g' \
#     | sed 's/&/%26/g' \
#     | sed 's/\?/%3F/g' \
#     | sed "s/BUILD_ID/$BUILD_ID/" \
#     | tr -d '\r\n' >> dist/index.html
# rm src/loader.min.js
# echo '}();">' >> dist/index.html
# cat public/index.tail.html | sed "s/BUILD_ID/$BUILD_ID/" >> dist/index.html
esbuild --bundle --minify --outfile=dist/index.js src/index.js

# memo
# <script>
#  const ready = () => {
#    let s = document.createElement('script')
#    s.src = 'script.js?' + (new Date()).getTime()
#    document.body.appendChild(s)
#  }
#  document.addEventListener("DOMContentLoaded", ready);
# </script>
