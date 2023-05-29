import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, ActivityIndicator, TextInput } from "react-native";
import MapView from "react-native-maps";
import { Button, Icon } from "react-native-elements";
import Popup from "../components/Popup";
import { fetchJobs, jobsInfo, jobsListing } from "../store";

const MapScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { region, searchError, noListing, searching } = useSelector(
    (state) => state.jobs
  );
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
      <View
        style={[
          styles.searchSection,
          {
            backgroundColor: "#009688",
            height: 80,
            marginLeft: 15,
            marginRight: 15,
          },
        ]}
      >
        <Button
          title={
            searching ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Icon color="white" name="search" size={35}></Icon>
            )
          }
          buttonStyle={{ backgroundColor: "#009688" }}
          onPress={onButtonPress}
        />
        <TextInput
          style={styles.input}
          onChangeText={setJobTitle}
          value={jobTitle}
          placeholder="Job Title (Optional)"
          editable={!searching}
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
  input: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    height: 60,
    backgroundColor: "white",
    color: "#009688",
    fontSize: 18,
  },
  searchSection: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  searchIcon: {
    padding: 5,
    backgroundColor: "#009688",
  },
});

export default MapScreen;
