#!/bin/bash
git add .
read -p 'Commit Message: ' msg
git commit -am "$msg"
git push
