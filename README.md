# Delivered - University Mailroom Mobile Application

**Author**: Juni Ejere  
**Project**: Senior Project - Spring 2024

## Overview

Delivered is a mail delivery notification mobile application designed to assist the St. Mary’s University mailroom by improving package and letter notification efficiency for students and faculty. The app provides users with timely notifications when mail arrives and offers administrators an efficient way to manage package storage and notifications.

## Features

### For Students and Faculty:
- Receive notifications when packages or letters are delivered.
- View delivery locations and mailroom information.
- Submit help tickets to check on missing mail.
- Access an interactive map of mail locations on campus.
- View and update account information.

### For Mailroom Administrators:
- Scan packages and store package information.
- Notify students or faculty when mail is delivered.
- Manage package storage, including alerts for package disposal deadlines.
- Handle help requests related to missing mail or delivery status.

## Quick Project Demo

You can quickly demo the Delivered app via Expo Snack: [Quick Project Demo](https://snack.expo.dev/@junie75/delivered)

### Demo Instructions

1. Open the link and choose one of the following options for the demo:
   - iOS
   - Android
   - My Device (recommended)

2. To view the **student side**:
   - Create a new account and log in with your credentials.

3. To view the **admin side**:
   - Use the following login credentials:
     - **Email**: admin@testmail.com
     - **Password**: admin123

### Important Notes

- Downloading **Expo Go** and using "My Device" works best for the demo.
- Login inputs are case sensitive.
- **Helpful hint**: 
   - First, create a student account and log in to explore the client side. 
   - Submit a "Check Mail Request" as a student. 
   - Then, log in as an admin to view the submitted check mail request. 
   - If you scan mail into your newly created student account and then log back in to the student side, you will receive a notification about your mail.

## Installation

1. Install the following development tools:
   - **VS Code**: [Download](https://code.visualstudio.com/download)
   - **GitHub Desktop**: [Download](https://desktop.github.com)
   - **Node.js**: [Download](https://nodejs.org/en/download)
   - **Expo**: [Install Expo](https://docs.expo.dev/get-started/installation/)
   - Optional for testing: **Xcode** (iOS) or **Android Studio** (Android).

2. Clone the project repository:
   ```bash
   git clone https://github.com/junie75/DeliveredApp.git
3. Install dependencies:
   ```bash
   npm install
4. Start the project using Expo:
   ```bash
   npx expo start
 
5. Download the **Expo Go** app from the [App Store (iOS)](https://apps.apple.com/us/app/expo-go/id982107779) or [Google Play (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent).
6. Open the Expo Go app and scan the QR code provided when the project is running.
*** You also have the option to choose to run the app on android or ios using device emulators on Xcode or Android Studio. ***

## Usage

### Students and Faculty

1. **Sign Up/Login**: Create an account or log in with your credentials.
2. **View Notifications**: Check notifications for new mail.
3. **Mailroom Map**: Use the interactive map to locate mailrooms and dormitory mailboxes.
4. **Submit Check Mail Requests**: Use the app to submit a request if your package's tracking number indicates delivery but you haven't received a notification.

### Mailroom Administrators

1. **Admin Portal**: Log in to access administrative functions.
2. **Scan Mail**: Use the app to scan new packages or letters and send notifications to recipients.
3. **Manage Packages**: Track and manage package storage, including resolving missing mail issues.

## Sample Sessions

### Login/Sign Up

1. After launching the app, either sign up for a new account or log in with your existing credentials.
2. Once logged in, the home screen will display notifications of new mail, and you can navigate to different sections like deliveries, the mailroom map, or help tickets.

### Viewing Deliveries

1. On the home screen, click "See your recent deliveries" to view a list of your past deliveries.
2. You can view details like delivery date, mail type (package or letter), and the location of the mailroom where it is stored.

### Submitting a Help Ticket

1. Go to the "Check Mail Request" section to submit a help ticket if your tracking number shows a package has been delivered but you haven't received a notification.
2. Fill in the details of the expected package and submit the request.

### Admin Portal

1. Log in as an admin to access the mailroom management tools with these credentials: 
   Email: admin@testmail.com
   Password: admin123
2. Use the scanning tool to log new mail, notify recipients, and manage storage.
3. Resolve help tickets and track package storage limits.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

