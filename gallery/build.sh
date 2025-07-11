# Build a Gallery distribution into dist/
# Usage:
# ./build.sh
#
# Environment variables:
#   TARGETTYPE=github
#   TARGETTYPE=gitlab
#   TARGETTYPE=local
#
rm -rf dist/
mkdir dist/
cp -r *.md dist/
cp -r resources/ dist/resources/
cp -r JSPsych/ dist/JSPsych/
ejs ./index.ejs -o ./dist/index.html targetType=${TARGETTYPE}
cp gussalufz-16-solved.exolve dist/
cp DataElements.csv dist/
if [ "$TARGETTYPE" = "local" ]; then
  pushd dist/
  ln -s . gallery
  popd
fi
