#!/bin/bash

# Firebase iOS Setup Script
# This script ensures Firebase is properly configured for iOS

echo "🔧 Setting up Firebase for iOS..."

cd /Users/areatar/.openclaw/workspace/FMB/ios

# Check if GoogleService-Info.plist exists
if [ ! -f "FMB/GoogleService-Info.plist" ]; then
    echo "❌ GoogleService-Info.plist not found!"
    echo "Please download it from Firebase Console and place it at ios/FMB/GoogleService-Info.plist"
    exit 1
fi

echo "✅ GoogleService-Info.plist found"

# Check if Firebase is initialized in AppDelegate
if ! grep -q "#import <Firebase.h>" "FMB/AppDelegate.mm"; then
    echo "⚠️  Firebase not initialized in AppDelegate.mm"
    echo "Please add the following to AppDelegate.mm:"
    echo '  #import <Firebase.h>'
    echo '  [FIRApp configure];'
fi

# Install pods
echo "📦 Installing CocoaPods..."
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
pod install

echo "✅ Firebase iOS setup complete!"
echo ""
echo "Next steps:"
echo "1. Open FMB.xcworkspace in Xcode"
echo "2. Build and run the app"
echo "3. Check console for Firebase initialization messages"