#!/usr/bin/env bash
set -euo pipefail

TARGET_DIR=${1:-app}

if [ -d "$TARGET_DIR" ] && [ -n "$(ls -A $TARGET_DIR)" ]; then
  echo "Target directory $TARGET_DIR already exists and is not empty. Aborting."
  exit 1
fi

# Use Docker image to run rails new so host does not need Ruby installed.
docker run --rm -v "$(pwd):/app" -w /app ruby:3.2 bash -lc "gem install rails -v 7.0.0 --no-document && rails new $TARGET_DIR --skip-bundle --database=sqlite3"

echo "Rails app created at $TARGET_DIR. Run 'cd $TARGET_DIR && bundle install' to install gems." 
