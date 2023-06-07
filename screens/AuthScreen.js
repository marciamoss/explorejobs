import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Alert,
  View,
  StyleSheet,
  TextInput,
  Text,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-elements";
import { initiateLogin, authInfo, verifyCode } from "../store";
import { useGetOrientation } from "../hooks";
import { initializeApp } from "firebase/app";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

const AuthScreen = ({ navigation }) => {
  const recaptchaVerifier = useRef(null);
  const {
    firebaseConfig,
    token,
    loading,
    codeSentError,
    verifyCodeError,
    verificationId,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [inputError, setInputError] = useState(false);
  const [screenWidth, screenHeight, orientation] = useGetOrientation();
  const [app, setApp] = useState(null);

  useEffect(() => {
    if (firebaseConfig) {
      setApp(initializeApp(firebaseConfig));
    }
  }, [firebaseConfig]);

  useEffect(() => {
    if (token) {
      navigation.navigate("Main", { screen: "Map" });
    }
  }, [token]);

  useEffect(() => {
    if (codeSentError) {
      Alert.alert("Alert", "Unable to send text to the given number");
      dispatch(authInfo({ codeSentError: false }));
    }
  }, [codeSentError]);

  useEffect(() => {
    if (verifyCodeError) {
      Alert.alert("Alert", "Code Verification Failed");
      dispatch(authInfo({ verifyCodeError: false }));
    }
  }, [verifyCodeError]);

  const handlSubmit = () => {
    const phformat = /^\d{10}$/;
    if (!phone.match(phformat)) {
      setInputError(true);
      Alert.alert(
        "Alert",
        "Phone Number must be 10 digits, and no space or special characters"
      );
      return;
    }
    if (verificationId) {
      if (!code) {
        Alert.alert("Alert", "Enter the code");
      }
      dispatch(verifyCode(authInfo, phone, code, app));
    } else {
      dispatch(initiateLogin(authInfo, phone, recaptchaVerifier.current, app));
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: screenHeight * 0.1,
      }}
    >
      <Text style={styles.textStyle}>
        {verificationId
          ? `Enter the verification Code texted to "${phone}"`
          : "We will text you a code to sign in, Standard messaging rates apply"}
      </Text>
      <View
        style={[
          {
            flexDirection: orientation === "landscape" ? "row" : "column",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              borderColor: inputError
                ? "red"
                : verificationId
                ? "lightgrey"
                : "lightblue",
              backgroundColor: verificationId ? "lightgrey" : "white",
              width:
                orientation === "landscape"
                  ? screenWidth * 0.4
                  : screenWidth * 0.9,
            },
          ]}
          editable={!verificationId}
          onChangeText={(value) => {
            setPhone(value);
            setInputError(false);
          }}
          value={phone}
          placeholder="Phone Number"
          returnKeyType={"done"}
        />
        <TextInput
          style={[
            styles.input,
            {
              borderColor: verificationId ? "lightblue" : "lightgrey",
              backgroundColor: verificationId ? "white" : "lightgrey",
              width:
                orientation === "landscape"
                  ? screenWidth * 0.2
                  : screenWidth * 0.9,
            },
          ]}
          editable={verificationId ? true : false}
          onChangeText={(value) => setCode(value)}
          value={code}
          placeholder="Enter Code"
        />
        <Button
          buttonStyle={styles.button}
          disabled={loading}
          disabledStyle={{ backgroundColor: "transparent" }}
          title={
            loading ? (
              <ActivityIndicator size="large" color="black" />
            ) : verificationId ? (
              "Verify"
            ) : (
              "Submit"
            )
          }
          onPress={handlSubmit}
        />
      </View>
      <Button
        type="clear"
        buttonStyle={{
          marginTop: orientation === "landscape" ? 0 : 15,
          justifyContent: "flex-end",
          paddingTop: 0,
        }}
        titleStyle={{ textDecorationLine: "underline", fontSize: 15 }}
        disabled={loading}
        disabledStyle={{ backgroundColor: "transparent" }}
        title={loading ? "" : "Try a different number"}
        onPress={() => {
          dispatch(
            authInfo({
              verificationId: null,
              codeSentError: false,
              verifyCodeError: false,
            })
          );
        }}
      />
      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "space-between",
            width:
              orientation === "landscape"
                ? screenWidth * 0.7
                : screenWidth * 0.97,
          },
        ]}
      >
        {app ? (
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={app.options}
          />
        ) : (
          ""
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    margin: 12,
    borderWidth: 5,
    padding: 10,
    fontSize: 18,
    color: "#009688",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
    height: 50,
  },
  textStyle: {
    textAlign: "center",
    fontSize: 18,
    color: "#03535C",
  },
});

export default AuthScreen;
