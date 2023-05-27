import React, { useState } from "react";
import { View, Text, Platform, Pressable, Dimensions } from "react-native";
import MapView from "react-native-maps";
import { Card, Button } from "react-native-elements";
import Swipe from "../components/Swipe";
import Popup from "../components/Popup";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const DeckScreen = ({ jobs, region, likeJob, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cardMove, setCardMove] = useState(false);

  const renderCard = (job, dataIndex, total, currentJob) => {
    let numOfCards = [];
    if (currentJob) {
      for (let i = 0; i < total - dataIndex - 1; i++) {
        numOfCards.push(i);
      }
    }
    return (
      <View
        style={{
          backgroundColor: "white",
          height: SCREEN_HEIGHT,
        }}
      >
        <Card>
          <Card.Title>{job.title}</Card.Title>
          <View style={{ height: 300 }}>
            <MapView
              scrollEnabled={false}
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === "android"}
              initialRegion={region}
            ></MapView>
          </View>
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
            <Text>
              (Job {dataIndex + 1} of {total})
            </Text>
          </View>
          <View style={styles.detailWrapper}>
            {!modalVisible ? (
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.highlightsTextStyle}>Job Highlights</Text>
              </Pressable>
            ) : (
              ""
            )}
            {modalVisible && currentJob ? (
              <Popup
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                modalText={job.description}
              />
            ) : (
              ""
            )}
          </View>
        </Card>
        {numOfCards.map((index) => {
          return (
            <View
              key={index}
              style={[
                styles.stackView,
                {
                  borderLeftWidth: cardMove ? 0 : 2,
                  borderRightWidth: cardMove ? 0 : 2,
                },
              ]}
            >
              <Card.Divider
                key={index}
                color={cardMove ? "white" : ""}
                width={cardMove ? 0 : 2}
                style={[
                  styles.cardDivider,
                  { marginTop: SCREEN_HEIGHT < 700 ? 1 : 10 },
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
            onPress={() => {
              navigation.navigate("Map");
            }}
          />
        </Card>
      </View>
    );
  };
  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      <Swipe
        data={jobs}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
        onSwipeRight={(job) => likeJob(job)}
        keyProp="job_id"
        setCardMove={setCardMove}
      />
    </View>
  );
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
    // marginTop: 5,
    marginBottom: 0,
  },
};

export default DeckScreen;
