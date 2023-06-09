# Explore Jobs by Location

# Mobile Application Design:

- The application uses one-time-password firebase phone login which only requires the users phone number and the user sign in by entering the code sent to them via text message. Currently only accepts phone number with country code +1.
- Once logged in, a map is visible currently defaulted to CA but can be moved to desired area of interest within USA.
- Job title can be entered for search in that area but is not required.
- By clicking on search the screen is navigated to a list of jobs found in that area.
- User can favorite the jobs by swiping right or remove the job by swiping left.
- On review screen all the favorited jobs are visible and links to apply as well.
- Settings screen can be used to remove the liked jobs.
- The search results are provided by serpapi which scrapes from google jobs listing and is limited to 10 results per search as am using the free tier.
- The application is setup for screen rotation.

# Launching the App

Expo go is needed to see the app's functionality as its not available in app store yet. Expo is free to install from app store below are the links.

**Android:** https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US

**IOS:** https://apps.apple.com/us/app/expo-go/id982107779

**To launch the app, Once Expo go is installed scan the below with your phone's camera, ios and android respectively.**

**IOS:**

<img width="271" alt="image" src="https://github.com/marciamoss/explorejobs/assets/45056799/9123b258-d6e6-402a-914c-a80049555438">


**Android:**

<img width="271" alt="image" src="https://github.com/marciamoss/explorejobs/assets/45056799/99e9c334-07ef-45cb-9176-a816603371ac"><br/><br/>

**Resources Used for training:**
- React Native course: https://www.udemy.com/course/react-native-advanced
Project was part of this course which has been modified for current updates with expo and redux and algorithmic changes as how cards are rendered for efficiency.

- Firebase Phone Auth setup with Expo:
https://arjayosma.medium.com/set-up-firebase-phone-authentication-in-expo-sdk-37-without-ejecting-8a472460b1cf

