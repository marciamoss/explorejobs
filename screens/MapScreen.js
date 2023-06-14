import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TextInput,
  Text,
  Pressable,
} from "react-native";
import MapView from "react-native-maps";
import { Button } from "react-native-elements";
import Popup from "../components/Popup";
import LocationChange from "../components/LocationChange";
import Dropdown from "../components/Dropdown";
import { fetchJobs, jobsInfo, jobsListing } from "../store";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const MapScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { region, searchError, noListing, searching, locationChangeError } =
    useSelector((state) => state.jobs);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [popupText, setPopupText] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(10);
  const [locationChange, setLocationChange] = useState(false);

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
    if (locationChangeError) {
      setModalVisible(true);
      setPopupText("Location Could Not Be Found");
      dispatch(jobsInfo({ locationChangeError: false }));
    }
  }, [locationChangeError]);

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
    setExpanded(false);
    dispatch(
      fetchJobs(
        jobsInfo,
        jobsListing,
        jobTitle,
        (numberOfJobs = dropdownValue),
        () => {
          navigation.navigate("Main", { screen: "Deck" });
        }
      )
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
            expanded ? (
              <Icon color="white" name="chevron-down" size={35}></Icon>
            ) : (
              <Icon color="white" name="chevron-up" size={35}></Icon>
            )
          }
          disabled={searching}
          disabledStyle={{ backgroundColor: "#009688" }}
          buttonStyle={{ backgroundColor: "#009688" }}
          onPress={() => setExpanded(!expanded)}
        />
        <TextInput
          style={styles.input}
          onChangeText={setJobTitle}
          value={jobTitle}
          placeholder="Job Title (Optional)"
          editable={!searching}
        />
        <Button
          title={
            searching ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Icon color="white" name="magnify" size={35}></Icon>
            )
          }
          disabled={searching}
          disabledStyle={{ backgroundColor: "#009688" }}
          buttonStyle={{ backgroundColor: "#009688" }}
          onPress={onButtonPress}
        />
      </View>
      {expanded ? (
        <Dropdown
          list={[10, 20, 30, 40, 50]}
          setDropdownValue={setDropdownValue}
          dropdownValue={dropdownValue}
        />
      ) : (
        ""
      )}

      <Pressable
        style={styles.locationChangeSection}
        onPress={() => {
          setLocationChange(!locationChange);
        }}
      >
        <Icon color="white" name="map-marker-radius-outline" size={30}></Icon>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Jump To
        </Text>
      </Pressable>
      {locationChange ? (
        <LocationChange
          locationChange={locationChange}
          setLocationChange={setLocationChange}
        />
      ) : (
        ""
      )}

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
  locationChangeSection: {
    alignItems: "center",
    bottom: 10,
    borderRadius: 50,
    backgroundColor: "#009688",
    elevation: 2,
    flex: 1,
    flexDirection: "row",
    height: 80,
    justifyContent: "center",
    left: 0,
    marginLeft: 15,
    position: "absolute",
    padding: 5,
    width: 80,
    flexDirection: "column",
  },
  searchIcon: {
    padding: 5,
    backgroundColor: "#009688",
  },
});

export default MapScreen;
