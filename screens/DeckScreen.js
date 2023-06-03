import React, { useState } from "react";
import {
  View,
  Text,
  Platform,
  Pressable,
  ActivityIndicator,
} from "react-native";
import MapView from "react-native-maps";
import { Card, Button } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import Swipe from "../components/Swipe";
import Popup from "../components/Popup";
import { likeJob, liked } from "../store";
import { useGetOrientation, useFeedJobs } from "../hooks";

const DeckScreen = ({ navigation }) => {
  const [screenWidth, screenHeight, orientation, layoutChange] =
    useGetOrientation();
  const [currentJobIndex, setSwipeCompleted, totalJobs, currentJob, nextJob] =
    useFeedJobs();
  const dispatch = useDispatch();

  const { jobs, region } = useSelector((state) => state.jobs);
  const [modalVisible, setModalVisible] = useState(false);
  const [cardMove, setCardMove] = useState(false);

  const renderCard = (job, topCard) => {
    return (
      <View
        style={[
          {
            backgroundColor: "white",
            height: screenHeight,
          },
          orientation === "landscape"
            ? {
                width: screenWidth,
                justifyContent: "flex-start",
                alignItems: "center",
              }
            : {},
        ]}
      >
        <Card
          containerStyle={[
            orientation === "landscape"
              ? {
                  width: screenWidth * 0.95,
                }
              : {},
          ]}
        >
          {orientation === "landscape" ? (
            ""
          ) : (
            <Card.Title>{job.title}</Card.Title>
          )}
          <View
            style={[
              orientation === "landscape" ? { flexDirection: "row" } : {},
            ]}
          >
            <View
              style={[
                orientation === "landscape"
                  ? {
                      height: screenHeight * 0.5,
                      width: screenWidth * 0.6,
                    }
                  : { height: screenHeight < 700 ? 200 : 300 },
                { borderColor: "lightgray", borderWidth: 2 },
              ]}
            >
              <MapView
                scrollEnabled={false}
                style={{ flex: 1 }}
                cacheEnabled={Platform.OS === "android"}
                initialRegion={region}
              ></MapView>
            </View>
            <View style={{ marginLeft: 10 }}>
              {orientation === "landscape" ? (
                <View style={{ flexDirection: "row" }}>
                  <Card.Title style={{ flex: 1, flexWrap: "wrap" }}>
                    {job.title}
                  </Card.Title>
                </View>
              ) : (
                ""
              )}
              <View style={styles.detailWrapper}>
                <Text>{job.company_name}</Text>
              </View>
              <View style={styles.detailWrapper}>
                <Text>{job.extensions[0]}</Text>
              </View>
              <View style={styles.detailWrapper}>
                <Text>Location: {job.location}</Text>
              </View>
              <View style={styles.detailWrapper}>
                {!modalVisible ? (
                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}
                  >
                    <Text style={styles.highlightsTextStyle}>
                      Job Highlights
                    </Text>
                  </Pressable>
                ) : (
                  ""
                )}
                {modalVisible && topCard ? (
                  <Popup
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    modalText={job.description}
                  />
                ) : (
                  ""
                )}
              </View>
              <View style={styles.detailWrapper}>
                {topCard ? (
                  <Text>
                    (Job {currentJobIndex + 1} of {jobs.length})
                  </Text>
                ) : (
                  ""
                )}
              </View>
            </View>
          </View>
        </Card>
        {[...Array(totalJobs - 1)].map((item, index) => {
          return (
            <View
              key={index}
              style={[
                styles.stackView,
                {
                  borderLeftWidth: cardMove ? 0 : 2,
                  borderRightWidth: cardMove ? 0 : 2,
                },
                orientation === "landscape"
                  ? { width: screenWidth * 0.95 }
                  : {},
              ]}
            >
              <Card.Divider
                key={index}
                color={cardMove ? "white" : ""}
                width={cardMove ? 0 : 2}
                style={[
                  styles.cardDivider,
                  {
                    marginTop:
                      screenHeight < 400 ? 3 : screenHeight < 700 ? 5 : 10,
                  },
                ]}
              ></Card.Divider>
            </View>
          );
        })}
      </View>
    );
  };
  const renderNoMoreCards = () => {
    return (
      <View
        style={{
          marginTop: 50,
        }}
      >
        <Card>
          <Card.Title>No More Jobs</Card.Title>
          <Button
            title="Back To Map"
            icon={{ name: "my-location", color: "white", size: 35 }}
            titleStyle={{ fontSize: 24 }}
            buttonStyle={{ backgroundColor: "#03A9F4", height: 80 }}
            onPress={() => navigation.navigate("Map")}
          />
        </Card>
      </View>
    );
  };

  if (layoutChange) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color="black" size="large" />
      </View>
    );
  }
  if (currentJob) {
    return (
      <View
        style={{
          marginTop: 10,
          height: screenHeight,
          width: screenWidth,
        }}
      >
        <Swipe
          renderCard={renderCard}
          onSwipeRight={(job) => dispatch(likeJob(liked, job))}
          keyProp="job_id"
          setCardMove={setCardMove}
          setSwipeCompleted={setSwipeCompleted}
          currentJob={currentJob}
          nextJob={nextJob}
        />
      </View>
    );
  } else {
    return renderNoMoreCards();
  }
};

const styles = {
  detailWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "black",
  },
  highlightsTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  stackView: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 0,
    borderLeftColor: "lightgrey",
    borderRightColor: "lightgrey",
    opacity: 0.7,
  },
  cardDivider: {
    marginBottom: 0,
  },
};

export default DeckScreen;
