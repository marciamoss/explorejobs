# Explore Jobs by Location

# Mobile Application Design:

- The application uses one-time-password firebase phone login which only requires the users phone number and the user sign in by entering the code sent to them via text message. Currently only accepts phone number with country code +1.
- Once logged in, a map is visible currently defaulted to CA but can be moved to desired area of interest within USA.
- For a quicker change of location on the map, if a user chooses not to drag on the map, there is an option of clicking on **_Jump to_** on bottom left corner of the map and type in zip or address(full/partial) or state to have the map move to desired location for search.
- Job title can be entered for search in that area but is not required.
- Dropdown option to pick number of results(10, 20, 30, 40, 50) for each search is available. Defaults to 10 per search.
- By clicking on search the screen is navigated to a list of jobs found in that area.
- User can favorite the jobs by swiping right or remove the job by swiping left.
- On review screen all the favorited jobs are visible and links to apply as well. If user prefers to delete individual job the option is included within each job.
- Settings screen can be used to remove all the liked jobs.
- The search results are provided by serpapi which scrapes from google jobs listing.
- The application is setup for screen rotation.

# Launching the App

Expo go is needed to see the app's functionality as its not available in app store yet. Expo is free to install from app store below are the links.
**You need to have expo go SDK's of 49 or higher. If it's less than version 49 update the expo go app**

**Android:** https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US

**IOS:** https://apps.apple.com/us/app/expo-go/id982107779

**To launch the app, Once Expo go is installed scan the below with your phone's camera, ios and android respectively.**

<a target="blank" href="./assets/ios.jpg">**--> For iOS App Click Here <--**</a>

<a target="blank" href="./assets/android.jpg">**--> For Android App Click Here <--**<a>

**Resources Used for training:**

- React Native course: https://www.udemy.com/course/react-native-advanced
  Project was part of this course which has been modified for current updates with expo and redux and algorithmic changes as how cards are rendered for efficiency.

- Firebase Phone Auth setup with Expo:
  https://arjayosma.medium.com/set-up-firebase-phone-authentication-in-expo-sdk-37-without-ejecting-8a472460b1cf
