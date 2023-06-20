import React, { useState } from "react";
import { View, Text, ScrollView, Linking, Pressable } from "react-native";
import { Card, Button } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import Popup from "../components/Popup";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { removeLikedJob } from "../store";

const ReviewScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { likedJobs } = useSelector((state) => state.likedJobs);
  const [modalVisible, setModalVisible] = useState(false);

  const renderLikedJobs = () => {
    return likedJobs.map((job) => {
      const {
        company_name,
        location,
        extensions,
        apply_options,
        description,
        job_id,
      } = job;
      return (
        <Card
          containerStyle={{
            borderWidth: 2,
            borderColor: "lightgrey",
            borderStyle: "solid",
            borderRadius: 10,
          }}
          key={job_id}
        >
          <View>
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company_name}</Text>
            </View>
            <View style={styles.detailWrapper}>
              <Text>Location: {location}</Text>
            </View>
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{extensions[0]}</Text>
            </View>
            <View style={styles.detailWrapper}>
              {!modalVisible ? (
                <Pressable
                  style={[styles.button, { backgroundColor: "black" }]}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.highlightsTextStyle}>Job Overview</Text>
                </Pressable>
              ) : (
                ""
              )}
              {modalVisible ? (
                <Popup
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                  modalText={description}
                />
              ) : (
                ""
              )}
            </View>
            {apply_options.map((option) => {
              return (
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => Linking.openURL(option.link)}
                  key={option.link}
                >
                  <Text style={styles.highlightsTextStyle}>{option.title}</Text>
                </Pressable>
              );
            })}
            <View style={styles.detailWrapper}>
              <Pressable
                style={[styles.button]}
                onPress={() => dispatch(removeLikedJob(job_id))}
              >
                <Icon name="delete-circle" color="#F44336" size={50}></Icon>
              </Pressable>
            </View>
          </View>
        </Card>
      );
    });
  };
  const renderNoLikedJobs = () => {
    return (
      <Card
        containerStyle={{
          borderWidth: 2,
          borderColor: "lightgrey",
          borderStyle: "solid",
          borderRadius: 10,
        }}
      >
        <Card.Title>No Liked Jobs</Card.Title>
        <Button
          title="Back To Jobs"
          icon={{ name: "description", color: "white", size: 35 }}
          titleStyle={{ fontSize: 24 }}
          buttonStyle={{ backgroundColor: "#03A9F4", height: 80 }}
          onPress={() => navigation.navigate("Deck")}
        />
      </Card>
    );
  };
  return (
    <View>
      {likedJobs.length > 0 ? (
        <ScrollView>{renderLikedJobs()}</ScrollView>
      ) : (
        <ScrollView>{renderNoLikedJobs()}</ScrollView>
      )}
    </View>
  );
};
const styles = {
  detailWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
  },
  italics: {
    fontStyle: "italic",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 5,
  },
  buttonOpen: {
    backgroundColor: "#03A9F4",
  },
  highlightsTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default ReviewScreen;
