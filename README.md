# indigoShift Website

A simple static landing page for indigoShift llc

# Initial Setup

## Dependencies

The following dependencies must be met before attempting a build:

* [ruby 2.3.3](https://www.ruby-lang.org)
* [Bundler](http://bundler.io/)
* [Nokogiri](http://www.nokogiri.org/tutorials/installing_nokogiri.html). Note that the nokogiri gem will only build if its native dependencies are met first.
* [npm](https://www.npmjs.com/)

## Environment

At a minimum ```INDIGOSHIFT_HOST=https://www.indigoshift.com``` must be defined in either the environment or a ```.env``` file. For deployment, the following variables must be defined as well:

* ```AWS_S3_DEPLOYMENT_BUCKET```
* ```AWS_ACCESS_KEY```
* ```AWS_SECRET_KEY```

## Install

```
Public: git clone https://github.com/klittlepage/indigoshift_site.git
Private: git clone git@github.com:klittlepage/indigoshift_site.git
cd indigoshift_site
bundle install
npm install
```

# Build

Build the site by running ```bundle exec middleman build```. Site contents will be rendered into the ```build``` directory. If assets static assets have changed you must run the ```build``` command twice to inline.

# Development

## Live Reloading

To build the site continuously while live reloading assets, run ```bundle exec middleman serve```.

## Linting

Run ```rubocop``` to check ruby code before committing.

# Deployment

Make sure that the environmental variables defined in the [environment](#environment) section are set.

The default ```rake``` task deploys to production:

```rake deploy``` or simply ```rake```

By default ```Cache-Control``` headers are set for all build assets, including html. The expiry times can be configured in the ```deploy``` task in ```Rakefile```, but in general should not be changed.
