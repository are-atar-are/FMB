#!/bin/sh

# Configure manual code signing for CI/CD
# This script runs after the repository is cloned

set -e

echo "Running post-clone setup..."

cd ios

# Update project to use manual signing
sed -i '' 's/CODE_SIGN_STYLE = Automatic;/CODE_SIGN_STYLE = Manual;/g' FMB.xcodeproj/project.pbxproj
sed -i '' 's/CODE_SIGN_IDENTITY = "iPhone Developer";/CODE_SIGN_IDENTITY = "Apple Distribution";/g' FMB.xcodeproj/project.pbxproj
sed -i '' 's/CODE_SIGN_IDENTITY = "-";/CODE_SIGN_IDENTITY = "Apple Distribution";/g' FMB.xcodeproj/project.pbxproj

echo "Installing CocoaPods..."
if command -v bundle &> /dev/null; then
    bundle install
    bundle exec pod install
else
    pod install
fi

echo "Post-clone setup complete!"
