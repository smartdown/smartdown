REMOTE=`git remote get-url --push origin`
rm -rf dist
npm run build
rm -rf /tmp/gallery-publish/
cp -r dist/ /tmp/gallery-publish/
cd /tmp/gallery-publish/

git init
git checkout -b master
git checkout -b gh-pages
touch .nojekyll
git add . .nojekyll
git commit -m "Initial commit"
git remote add origin ${REMOTE}
git push --force origin gh-pages
