# frozen_string_literal: true
require 'bundler'
require 'dotenv/tasks'
require 'aws-sdk'
require 'uri'
require './lib/deployment'

def bucket
  ENV['AWS_S3_DEPLOYMENT_BUCKET']
end

task check_env: :dotenv do
  keys = %w(INDIGOSHIFT_HOST AWS_S3_DEPLOYMENT_BUCKET
            AWS_ACCESS_KEY AWS_SECRET_KEY)
  keys.each do |key|
    abort("#{key} must be defined in your environment") unless ENV[key]
  end
end

task :deploy, [:html_expiry, :asset_expiry] => :check_env do |_, args|
  html_expiry = args[:html_expiry] || 15
  asset_expiry = args[:asset_expiry] || 31_536_000
  IndigoShift::Deployment.deploy_site(bucket, html_expiry, asset_expiry)
end

task default: [:deploy]
