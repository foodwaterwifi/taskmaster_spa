#!/bin/bash

export MIX_ENV=prod
export PORT=4797
export NODEBIN=`pwd`/assets/node_modules/.bin
export PATH="$PATH:$NODEBIN"

echo "Building..."

mkdir -p ~/.config

mix deps.get # get the out of date dependencies
mix compile # compile source
(cd assets && npm install) # install the npm dependencies
(cd assets && webpack --mode production) # set webpack mode to production
mix phx.digest # compress static files

echo "Generating release..."
mix release --env=prod # generate the release

echo "Starting app..."

_build/prod/rel/taskmaster3/bin/taskmaster3 foreground # start app in the foreground
