# FMB Project Setup Guide

## 📋 Prerequisites

Before starting, you need:
- Apple Developer Account ($99/year)
- Google Play Developer Account ($25 one-time)
- GitHub organization: ARE-ATAR-Industries
- Firebase account

---

## 🍎 PART 1: iOS Setup (Baby Steps)

### Step 1: Create App ID in Apple Developer Portal

1. Go to https://developer.apple.com/account/resources/identifiers/list
2. Click **(+)** → **App IDs** → **App**
3. **Description**: FMB
4. **Bundle ID**: `Explicit` → `com.fmb.ios`
5. Enable any capabilities you need (Push Notifications, etc.)
6. Click **Continue** → **Register**

### Step 2: Create Apple Distribution Certificate

**What you need**: This certificate is used to sign the app for distribution.

1. Go to https://developer.apple.com/account/resources/certificates/list
2. Click **(+)** → **Apple Distribution**
3. Follow instructions to create CSR (Certificate Signing Request):
   - Open **Keychain Access** on your Mac
   - Go to: **Keychain Access** → **Certificate Assistant** → **Request a Certificate From a Certificate Authority**
   - **User Email**: Your Apple ID email
   - **Common Name**: `FMB Distribution`
   - Select **Saved to disk**
   - Save as `FMB.certSigningRequest`
4. Upload the CSR file
5. Click **Continue** → **Download** the certificate
6. Double-click to install it in Keychain Access

### Step 3: Export Certificate as .p12

**Why**: The .p12 file is what GitHub Actions needs to sign the app.

1. Open **Keychain Access**
2. Find: **My Certificates** → **Apple Distribution: Your Name**
3. Right-click → **Export**
4. Save as: `FMB_Distribution.p12`
5. Set password: `FMBApp2024` (remember this!)

### Step 4: Create Provisioning Profile

**For Internal Distribution (Ad Hoc)**: This lets you distribute to specific devices.

1. Go to https://developer.apple.com/account/resources/profiles/list
2. Click **(+)** → **Ad Hoc**
3. **App ID**: Select `com.fmb.ios`
4. **Certificate**: Select your Apple Distribution certificate
5. **Devices**: Select the devices you want to test on (register them first in Devices section)
6. **Profile Name**: `FMB Ad Hoc`
7. Click **Generate** → **Download**

### Step 5: Prepare GitHub Secrets

**Encode the certificate**:
```bash
base64 -i FMB_Distribution.p12 | pbcopy
```

**Encode the provisioning profile**:
```bash
base64 -i FMB_Ad_Hoc.mobileprovision | pbcopy
```

### Step 6: Add Secrets to GitHub

Go to: https://github.com/ARE-ATAR-Industries/FMB/settings/secrets/actions

Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `BUILD_CERTIFICATE_BASE64` | Paste the base64 of .p12 |
| `P12_PASSWORD` | `FMBApp2024` |
| `DEVELOPMENT_PROFILE_BASE64` | Paste the base64 of .mobileprovision |
| `KEYCHAIN_PASSWORD` | Any random password (e.g., `openssl rand -base64 32`) |

---

## 🤖 PART 2: Android Setup (Baby Steps)

### Step 1: Generate Keystore

**What is this**: The keystore is like a password for your Android app. It proves you are the owner.

Run this command on your Mac:
```bash
cd FMB/android/app
keytool -genkey -v -keystore fmb-upload.keystore -alias fmb -keyalg RSA -keysize 2048 -validity 10000
```

When prompted:
- **Keystore password**: `FMBApp2024`
- **Key password**: `FMBApp2024` (same as keystore)
- **Your name**: Your name
- **Organizational unit**: Development
- **Organization**: FMB
- **City**: Cape Town
- **State**: Western Cape
- **Country**: ZA

### Step 2: Encode Keystore for GitHub

```bash
base64 -i fmb-upload.keystore | pbcopy
```

### Step 3: Add Android Secrets to GitHub

Go to: https://github.com/ARE-ATAR-Industries/FMB/settings/secrets/actions

Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `ANDROID_KEYSTORE_BASE64` | Paste the base64 |
| `ANDROID_KEYSTORE_PASSWORD` | `FMBApp2024` |
| `ANDROID_KEY_ALIAS` | `fmb` |
| `ANDROID_KEY_PASSWORD` | `FMBApp2024` |

---

## 🔥 PART 3: Firebase Setup (Baby Steps)

### Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Click **Create project**
3. **Project name**: `fmb-app`
4. Disable Google Analytics (or enable if you want)
5. Click **Create project**

### Step 2: Add iOS App to Firebase

1. Click **iOS icon** (</>)
2. **Bundle ID**: `com.fmb.ios`
3. **App nickname**: `FMB iOS`
4. Click **Register app**
5. Download `GoogleService-Info.plist`
6. Move it to `FMB/ios/FMB/`

### Step 3: Add Android App to Firebase

1. Click **Android icon** (</>)
2. **Package name**: `com.fmb.android`
3. **App nickname**: `FMB Android`
4. Click **Register app**
5. Download `google-services.json`
6. Move it to `FMB/android/app/`

### Step 4: Enable App Distribution

1. In Firebase Console, go to **App Distribution** (left sidebar)
2. Click **Get started**
3. Accept terms

### Step 5: Create Testers Group

1. Go to **Testers & Groups** tab
2. Click **Add group**
3. **Group name**: `testers`
4. Add tester emails
5. Click **Save**

---

## 🚀 PART 4: First Build

Once all the above is done, notify me and I'll trigger the first build!

The build will:
1. ✅ Build iOS IPA (signed)
2. ✅ Build Android APK (signed)
3. ✅ Upload to GitHub artifacts
4. ⏳ (Optional) Upload to Firebase (we can set this up later)

---

## 📁 What I've Already Set Up

✅ React Native 0.73.6 project
✅ Redux with Redux Persist
✅ Dashboard feature with example
✅ CI/CD workflow file
✅ Project structure

**Next**: You need to do Steps 1-3 above, then I'll push the code and trigger the build!