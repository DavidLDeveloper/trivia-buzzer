echo "Building to /dist..."
mkdir dist
cp * dist
cp -r assets dist
bun build --minify --target=bun --outfile=dist/server.js server.js
echo "Complete."