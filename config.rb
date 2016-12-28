# frozen_string_literal: true
require 'dotenv'
Dotenv.load

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

ignore %r{^stylesheets/}
ignore %r{^javascripts/}
ignore %r{^fonts/}
ignore %r{^images/}

config[:markdown_engine] = :kramdown
config[:host] = ENV['INDIGOSHIFT_HOST']
config[:asset_build_dir] = '.tmp/dist'

helpers do
  def host
    config[:host]
  end

  def webpack_asset_path(asset)
    manifest = JSON.parse(File.read(File.join(config[:asset_build_dir],
                                              'assets', 'manifest.json')))
    File.join('assets', manifest[asset])
  end
end

activate :directory_indexes

activate :external_pipeline,
         name: :webpack,
         command: if build?
                    'MIDDLEMAN_ENV=production ' \
                    './node_modules/webpack/bin/webpack.js ' \
                    '--bail --optimize-minimize'
                  else
                    './node_modules/webpack/bin/webpack.js --watch -d'
                  end,
         source: config[:asset_build_dir],
         latency: 1

configure :development do
  activate :livereload
end

configure :build do
  activate :minify_html
  activate :asset_hash, ignore: /\.(css|js|map)$/
end
