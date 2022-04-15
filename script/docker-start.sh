#!/usr/bin/env bash

(cd /workspace/next-one && node /workspace/node_modules/.bin/next start) & (cd /workspace/next-two && node /workspace/node_modules/.bin/next start -p 3001)
