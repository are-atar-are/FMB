#!/bin/sh

# Configure manual code signing for CI/CD
# This script runs after the repository is cloned

set -e

echo "Running post-clone setup..."

cd ios

# Update project to use manual signing
echo "Configuring manual code signing..."
sed -i '' 's/CODE_SIGN_STYLE = Automatic;/CODE_SIGN_STYLE = Manual;/g' FMB.xcodeproj/project.pbxproj
sed -i '' 's/CODE_SIGN_IDENTITY = "iPhone Developer";/CODE_SIGN_IDENTITY = "Apple Distribution";/g' FMB.xcodeproj/project.pbxproj
sed -i '' 's/CODE_SIGN_IDENTITY = "-";/CODE_SIGN_IDENTITY = "Apple Distribution";/g' FMB.xcodeproj/project.pbxproj
sed -i '' 's/DEVELOPMENT_TEAM = "";*/DEVELOPMENT_TEAM = 46Z55D38V7;/g' FMB.xcodeproj/project.pbxproj

echo "Installing CocoaPods..."
# Install CocoaPods if not available
if ! command -v pod &> /dev/null; then
    echo "Installing CocoaPods..."
    gem install cocoapods
fi

# Run pod install
echo "Running pod install..."
pod install --verbose

echo "Post-clone setup complete!"
