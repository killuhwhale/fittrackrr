# Local Version, no API, SQLite3 DB version....



- Privacy Policy - add https://fittrackrr.com/privacy
- Delete Account w/ all data - add https://fittrackrr.com/removeAccount

## https://www.appicon.co/

// sudo keytool -genkey -v -keystore fitform-upload-key.keystore -alias fitform-signing-key -keyalg RSA -keysize 2048 -validity 10000

npm i --legacy-peer-deps

Git
Update staging from main
\*main
git merge origin/staging
git branch -M staging
git push origin HEAD

brew install node
brew install watchman

# NPM Package

killuhwhal3-rn-secure-storage@2.0.8

# Testing setup https://wix.github.io/Detox/docs/introduction/project-setup

- Android build
  cd android/ && ./gradlew clean && cd .. && detox build --configuration android.emu.debug
  detox test --configuration android.emu.debug
  detox build --configuration android.emu.release

- iOS build
  detox build --configuration ios.sim.debug
  detox build --configuration ios.sim.release

  Testings IDS

## Image

. For example, "mipmap-mdpi", "mipmap-hdpi", "mipmap-xhdpi", "mipmap-xxhdpi", and "mipmap-xxxhdpi".

mdpi (Medium density) - 48 x 48 pixels
hdpi (High density) - 72 x 72 pixels
xhdpi (Extra-high density) - 96 x 96 pixels
xxhdpi (Extra-extra-high density) - 144 x 144 pixels
xxxhdpi (Extra-extra-extra-high density) - 192 x 192 pixels
Save your app icon image in each of the "mipmap" folders that you just created. The image should be named "ic_launcher.png".

In the "AndroidManifest.xml" file of your project, locate the "application" tag.

Inside the "application" tag, add the following line of code to specify the app icon:

perl
Copy code
android:icon="@mipmap/ic_launcher"

## Build android

### Debug

adb shell input keyevent 82

\*\* Muted Audio in Config File -- Fixes Audio static
/home/$USER/Android/Sdk/tools/lib/monitor-x86_64/configuration/config.ini
hw.audioInput=no
hw.audioOutput=no

Change versions in android/app/build.gradle
cd android/ && ./gradlew clean && ./gradlew bundleRelease
android/app/build/outputs/bundle/[app-release.aab]

adb -s 710KPMZ0409387 reverse tcp:8081 tcp:8081
adb -s 710KPMZ0409387 reverse tcp:8000 tcp:8000

emulator -noaudio -avd Pixel_4_API_30 &
adb -s emulator-5554 reverse tcp:8081 tcp:8081
adb -s emulator-5554 reverse tcp:8000 tcp:8000
npx react-native run-android --active-arch-only
npx react-native start

Android SQL File

# Restart adbd as root

adb root

# Enter shell now as root

adb shell

# Move to database dir

## /data/data/com.fitform/databases

adb root
adb shell
cd /data/data/com.fitform/databases
sqlite3 fittrackrr
.headers ON
.mode column




SQLite3 Command Cheat Sheet

# General Commands
Start SQLite3: sqlite3 [database_name.db]
If the database does not exist, SQLite3 will create it.
Exit SQLite3: .exit or .quit

# Database Management
List Databases: .databases
Show Current Database: PRAGMA database_list;
Show Tables in Current Database: .tables
Show Schema of Table: .schema [table_name]

# Table Management
## Create Table:
CREATE TABLE [table_name] (
    [column1_name] [column1_datatype] [column1_constraint],
    [column2_name] [column2_datatype] [column2_constraint],
    ...
);

## Alter Table (e.g., add a column):
ALTER TABLE [table_name] ADD COLUMN [column_name] [data_type];
Drop Table: DROP TABLE [table_name];


## Insert Data:
INSERT INTO [table_name] ([column1], [column2], ...) VALUES ([value1], [value2], ...);

## Update Data:
UPDATE [table_name] SET [column1] = [value1], [column2] = [value2] WHERE [condition];

## Delete Data:
DELETE FROM [table_name] WHERE [condition];

## Select Data:
SELECT * FROM [table_name];
SELECT [column1], [column2] FROM [table_name] WHERE [condition];


Begin Transaction: BEGIN TRANSACTION;
Commit Transaction: COMMIT;
Rollback Transaction: ROLLBACK;

# Index Management
Create Index: CREATE INDEX [index_name] ON [table_name]([column_name]);
Drop Index: DROP INDEX [index_name];

# Other Useful Commands
Explain Query Plan: EXPLAIN QUERY PLAN [sql_query];
Show SQLite Version: .version
Import Data from File: .import [file_path] [table_name]
Backup Database: .backup main [file_name.db]
Restore Database: .restore main [file_name.db]

# SQL Commands
All standard SQL commands (SELECT, INSERT, UPDATE, DELETE, etc.) are supported in SQLite3.

## Formatting and Preferences
Turn on Header Display:
Turn on Column Mode: .mode column
Set Output Format: .mode [mode] (e.g., .mode csv)

// When building your android app locally, by default you build all the 4 Application
// Binary Interfaces (ABIs) : armeabi-v7a, arm64-v8a, x86 & x86_64.
cd android/ && ./gradlew clean && cd .. && npx react-native run-android --active-arch-only

// Test Build command
cd android/ && ./gradlew clean && ./gradlew bundleRelease && cd .. && npx react-native run-android --variant=release

# Build iOS

Versions:
To change the version of your iOS app, you will need to modify the CFBundleShortVersionString and CFBundleVersion keys in your app's Info.plist file.

## POD install

sudo gem install cocoapods
sudo arch -x86_64 gem install ffi
arch -x86_64 pod install
env /usr/bin/arch -arm64 /bin/bash --login

Double click on YOUR_APP_NAME.xcworkspace
Product → Build
Product → Archive

- Make sure to set the device to "Any iOS Device (arm64)".
  After the archive is completed, in the archive window, click on Distribute App.

npx react-native run-ios
npx react-native run-ios --configuration Release

When deleteing build folder or using new simulator, needed to remove DervivedData
rm -r /Users/chrisandaya/Library/Developer/Xcode/DerivedData

npx react-native start
npx react-native run-ios --udid CCF49CB5-3952-4D51-8830-27A2BA1FEB1B
iphone x simulator
npx react-native run-ios --udid 237DB837-16ED-4279-889A-9D2E5EB393E6

git push origin HEAD:staging HEAD

# TODO

- Add Complete list of names

  - Not exactly sure what I am missing but there are a few that Ive stumbled across that are missing.

- Apple Connect

  - ## Support URL

- Google Play

  - https://play.google.com/console/u/0/developers/6076092592456292244/app/4974726312031903268/publishing
    Media:

    - Your app icon must be a PNG or JPEG, up to 1 MB, 512 px by 512 px, and meet our design specifications and metadata policy
    - Your feature graphic must be a PNG or JPEG, up to 15 MB, and 1,024 px by 500 px
    - Upload 2-8 phone screenshots. Screenshots must be PNG or JPEG, up to 8 MB each, 16:9 or 9:16 aspect ratio, with each side between 320 px and 3,840 px
    - Upload up to eight 7-inch tablet screenshots. Screenshots must be PNG or JPEG, up to 8 MB each, 16:9 or 9:16 aspect ratio, with each side between 320 px and 3,840 px
    - Upload up to eight 10-inch tablet screenshots. Screenshots must be PNG or JPEG, up to 8 MB each, 16:9 or 9:16 aspect ratio, with each side between 1,080 px and 7,680 px
    - Upload 4-8 screenshots. Screenshots must be PNG or JPEG, up to 8 MB each, 16:9 or 9:16 aspect ratio, with each side between 1,080 px and 7,680 px

- Take screenshots for App Store
  - Create a Full List og Gyms
    - Create 1 Class with full list of workouts
  - Create a full list of Personal Workouts
  - Create 1 Full WorkoutGroup with Each type.
- Create a demo gyms and workouts for Screenshots
- Create test account for Apple and Google
- Live Stripe
- Live Google Ads
- Create workout engine.

# Bugs:
