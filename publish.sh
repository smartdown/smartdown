#
# Based upon:
#	https://blog.bloomca.me/2017/12/15/how-to-push-folder-to-github-pages.html
#

REMOTE=`git remote get-url --push origin`
rm -rf dist
npm run build
rm -rf /tmp/smartdown-publish/
cp -r dist/ /tmp/smartdown-publish/
cd /tmp/smartdown-publish/
git init
git checkout -b master
git checkout -b gh-pages
touch .nojekyll
git add . .nojekyll
git commit -m "Initial commit"
git remote add origin ${REMOTE}
git push --force origin gh-pages
