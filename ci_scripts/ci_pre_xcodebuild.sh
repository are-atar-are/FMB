#!/bin/sh

# Install CocoaPods dependencies
cd ios
bundle install
bundle exec pod install
