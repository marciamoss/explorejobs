import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, ActivityIndicator, TextInput } from "react-native";
import MapView from "react-native-maps";
import { Button } from "react-native-elements";
import Popup from "../components/Popup";
import { fetchJobs, jobsInfo, jobsListing } from "../store";

const MapScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { region, searchError, noListing } = useSelector((state) => state.jobs);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [popupText, setPopupText] = useState(false);
  const [jobTitle, setJobTitle] = useState("");

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  useEffect(() => {
    if (searchError) {
      setModalVisible(true);
      setPopupText("Search Failed on this region");
      dispatch(jobsInfo({ searchError: false }));
    }
  }, [searchError]);

  useEffect(() => {
    if (noListing) {
      setModalVisible(true);
      setPopupText("No Jobs Found, Try a different location");
      dispatch(jobsInfo({ noListing: false }));
    }
  }, [noListing]);

  if (!mapLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const onButtonPress = () => {
    dispatch(
      fetchJobs(jobsInfo, jobsListing, jobTitle, () => {
        navigation.navigate("Main", { screen: "Deck" });
      })
    );
  };
  return (
    <View style={styles.container}>
      <MapView
        region={region}
        style={styles.map}
        onRegionChangeComplete={(region) => dispatch(jobsInfo({ region }))}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setJobTitle}
          value={jobTitle}
          placeholder="Job Title (Optional)"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Search This Area"
          buttonStyle={{
            backgroundColor: "#009688",
            height: 80,
            marginLeft: 15,
            marginRight: 15,
          }}
          icon={{ name: "search", color: "white", size: 35 }}
          onPress={onButtonPress}
        />
      </View>
      {modalVisible ? (
        <Popup
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modalText={popupText}
        />
      ) : (
        ""
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
  inputContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
  },
  input: {
    height: 60,
    margin: 12,
    borderWidth: 5,
    padding: 10,
    borderColor: "#009688",
    backgroundColor: "white",
    fontSize: 18,
    color: "#009688",
  },
});

export default MapScreen;
