Rails backend skeleton for experimentation

This folder contains helpers and a Dockerfile to create and run a minimal Ruby on Rails application for experimentation.

Files:
- Dockerfile: development image for Ruby/Rails
- bootstrap.sh: convenience script to generate a new Rails app inside this folder (does not run automatically)

How to create a new Rails app inside this folder (host machine must have Docker or Ruby installed):

1) Using Docker (recommended):
   # from project root
   cd Backend-Rails
   # create the rails app skeleton in ./app
   ./bootstrap.sh app

   Then you can build and run with the Dockerfile.

2) Locally (if you have Ruby and Rails):
   cd Backend-Rails
   gem install rails
   rails new app --database=sqlite3

Bootstrap script usage:
- ./bootstrap.sh <target-dir>
  Example: ./bootstrap.sh app

The script will create a new Rails application in the given directory using Docker (ruby:3.2 image).

Dockerfile notes:
- Exposes port 3000
- Uses sqlite3 for development

This is intentionally minimal: run the bootstrap script to generate a full Rails app skeleton.
