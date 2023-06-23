import {
  MAP_API_KEY,
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  JOB_API_KEY,
  JOB_ROOT_URL,
  JOB_ENGINE,
  JOB_DETAILS_ENGINE,
} from "@env";

exports.FIREBASECONFIG = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

exports.JOB = {
  url: JOB_ROOT_URL,
};

exports.SEARCH = {
  api_key: JOB_API_KEY,
};

exports.JOBDETAILS = {
  jde: JOB_DETAILS_ENGINE,
};

exports.JOB_QUERY_PARAMS = {
  api_key: JOB_API_KEY,
  engine: JOB_ENGINE,
  q: "jobs",
  lrad: 10,
};

exports.GMAP = {
  api_key: MAP_API_KEY,
};
