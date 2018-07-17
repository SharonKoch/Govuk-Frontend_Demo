#!/bin/sh
set -e

npm run test
npm run build:package
npm run build:dist

ALL_PACKAGE_VERSION=$(node -p "require('./package/package.json').version")
TAG="v$ALL_PACKAGE_VERSION"
CURRENT_BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

if [ $(git tag -l "$TAG") ]; then
    echo "⚠️ Git tag already exists."
    exit 1;
else
    git add .
    # Since package/ and dist/ are .gitignored any new files
    # Will not be tracked so we need to add them with `--force`.
    git add --force package/ dist/
    git commit -m "Release $TAG"
    #set upstream so that we can push the branch up
    git push --set-upstream origin $CURRENT_BRANCH_NAME
    git push
    echo "🗒 All done. Ready to create a pull request. Once approved, run npm run release"
fi
