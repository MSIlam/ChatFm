# FmChat
A chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location.

### Key Features 
- A page where users can enter their name and choose a background color for the chat screen before joining the chat. 
- A page displaying the conversation, as well as an input field and submit button. 
- The chat provide users with three additional communication features: sending images, taking photos and location data. 
- Data gets stored online and offline.
### Screenshots

<p align="center">
  <img src="./img/chat1.png" alt="First Image" style="width: 200px; height: auto; margin-right: 20px;">
  <img src="./img/chat3.png" alt="Second Image" style="width: 200px; height: auto; margin-right: 20px;">
  <img src="./img/chat4.png" alt="Second Image" style="width: 200px; height: auto;">
</p>

## Tech tools
- React native
- React navigator
- Expo
- Gifted chat library
- Firebase (Googles cloudbased database) 
- useNetInfo
- AsyncStorage

### Steps to get started
#### Environment setup
- Clone this repository
- Install Node JS on your device
#### Setup Expo
- Install Expo globally: `npm install -g expo-cli`
- Sign up for an Expo Account to be able to run the app on your device
- Navigate to the folder and run `npm install`
#### Firebase setup
- Sign in at Google Firebase
- Create a Project
- Create Database in Firestore Database (choose a close region from the dropdown, and Start in production mode)
- Change allow read, write: if false; to allow read, write, if true; in Rules tab
- Register app `(</>)` in Project Overview
- Now, follow the provided directions of adding Firebase SDK:
- Install firebase: `npm install firebase`
- Initialize firebase: Copy and paste the provided Firebase configuration and change them in the App.js of the downloaded repository
#### Android studio setup
- Download Android Studio(Win) or iOS Simulator/XCode(Mac)
- Complete installation and setup in your device
- Open the emulator
#### Open the app
- Run `expo start` in the terminal. Follow the instruction to access the app via the iOS Simulator/Android Emulator/web browser/ physical device