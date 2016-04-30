#!/bin/bash
code=0
for f in $(git diff --staged --diff-filter=ACMTUXB --name-only -- '*.js')
do
  git show :$f | eslint --stdin --stdin-filename=$f
  if (( $? ))
  then
    code=1
  fi
done
exit $code
