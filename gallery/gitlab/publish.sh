REMOTE="git@gitlab.com:smartdown/gallerydemo.git"
rm -rf dist
npm run build
rm dist/gallery
rm -rf /tmp/gallery-publish/
mkdir -p /tmp/gallery-publish/public/
cp gitlab/gitlab-ci.yml /tmp/gallery-publish/.gitlab-ci.yml
cp -r dist/ /tmp/gallery-publish/public/
cp gitlab/index.html /tmp/gallery-publish/public/
cd /tmp/gallery-publish/

git init
git checkout -b master
touch .nojekyll
git add . .nojekyll
git commit -m "Initial commit"
git remote add origin ${REMOTE}
git push --force origin master
