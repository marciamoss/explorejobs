import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Alert,
  Modal,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { geocode, jobsInfo } from "../store";

const LocationChange = ({ locationChange, setLocationChange }) => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const handleSubmit = () => {
    setLocationChange(!locationChange);
    dispatch(geocode(address, jobsInfo));
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={locationChange}
        supportedOrientations={[
          "portrait",
          "landscape",
          "portrait-upside-down",
          "landscape-left",
          "landscape-right",
        ]}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setLocationChange(!locationChange);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setLocationChange(!locationChange)}
            >
              <Icon name="close" color="#FBEC02" size={35}></Icon>
            </Pressable>
            <Text style={styles.headerText}>
              You can drag on the map or type here to change location
            </Text>

            <TextInput
              style={styles.input}
              onChangeText={setAddress}
              value={address}
              placeholder="Zipcode or State or Address"
            />
            <Pressable
              style={[
                styles.button,
                styles.buttonSubmit,
                {
                  backgroundColor: !address ? "lightgray" : "green",
                },
              ]}
              onPress={handleSubmit}
              disabled={!address}
            >
              <Text
                style={[
                  styles.textStyle,
                  {
                    fontWeight: !address ? "normal" : "bold",
                    color: !address ? "gray" : "white",
                  },
                ]}
              >
                Submit
              </Text>
            </Pressable>
            <Text style={styles.note}>Job Search is limited to USA only</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#091238",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  buttonSubmit: {
    backgroundColor: "green",
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    height: 60,
    width: 300,
    backgroundColor: "white",
    color: "#009688",
    borderWidth: 2,
  },
  headerText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    marginBottom: 10,
    marginTop: 15,
  },
  note: {
    textAlign: "center",
    color: "#FBEC02",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LocationChange;
