//this is the main screen for the Check Mail Request feature
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import Hero from "./homeComp/Hero";
import NavBtn from "./homeComp/NavBtn";

const CheckMailRequest = ({ navigation }) => {
  const imageName = "checkMail";
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
              textAlign: "center",
            }}
          >
            Fill out your{"\n"}Check Mail Request
          </Text>
        </View>
        <Hero imageName={imageName} />
        <View style={styles.info}>
          <Text style={{ fontSize: 18, marginBottom: 15, fontWeight: "200" }}>
            How does a Check Mail Request work?
          </Text>
          <Text>
            If you are expecting a letter or a package and have yet to receive
            it, save yourself a trip to the Treadaway Mailroom and fill out a
            form instead.{"\n\n"}In this form, detail information such as a
            tracking number, when the date of when the package or letter may
            have been shipped, an expected arrival date, and any relevant
            information that may assist your mailroom administrator in finding
            your mail.{"\n\n"}The mailroom administrator will view your request
            and you will receive updates with the status of your delivery.
          </Text>
        </View>
        <View style={styles.btnHolder}>
          <NavBtn
            navigation={navigation}
            navigateString={"New Request"}
            imageName={"newRequest"}
            text={"Create new request"}
          />
          <NavBtn
            navigation={navigation}
            navigateString={"Past Requests"}
            imageName={"pastRequests"}
            text={"View recent requests"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckMailRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 15,
    marginHorizontal: 10,
    alignItems: "center",
  },
  info: {
    marginVertical: 20,
    marginHorizontal: 15,
  },
});
