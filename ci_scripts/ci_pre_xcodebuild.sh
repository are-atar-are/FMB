#!/bin/sh

# Install CocoaPods dependencies with error handling
set -e

echo "Installing CocoaPods dependencies..."

cd ios

# Check if Gemfile exists
if [ -f "Gemfile" ]; then
    echo "Installing Ruby gems..."
    bundle install
    
    echo "Running pod install..."
    bundle exec pod install
else
    echo "No Gemfile found, running pod install directly..."
    pod install
fi

echo "CocoaPods installation complete!"
