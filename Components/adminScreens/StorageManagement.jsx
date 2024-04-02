import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native";

const StorageManagement = () => {
  const showExceedingStorage = () => {
    let notifications = [];
    for (let i = 0; i < 5; i++) {
      notifications.push(
        <View key={i} style={styles.storageBox}>
          <View style={styles.headers}>
            <Text style={styles.hdrTxt}>Package ID: 8117654</Text>
            <Text style={styles.hdrTxt}>Received: 03/31/2024</Text>
            <Text style={[styles.hdrTxt, styles.hdrTxtRed]}>
              Dispose: 04/13/2024
            </Text>
          </View>
          <View style={styles.btnHolder}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnTxt}>Resolve</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnTxt}>Notify</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnRed]}>
              <Text style={[styles.btnTxt, styles.btnTxtRed]}>Dispose</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return notifications;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.boxContainer}>
          {showExceedingStorage()}
          {/* <View style={styles.storageBox}>
            <View style={styles.headers}>
              <Text style={styles.hdrTxt}>Package ID: 8117654</Text>
              <Text style={styles.hdrTxt}>Received: 03/31/2024</Text>
              <Text style={[styles.hdrTxt, styles.hdrTxtRed]}>
                Dispose: 04/13/2024
              </Text>
            </View>
            <View style={styles.btnHolder}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnTxt}>Resolve</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnTxt}>Notify</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnRed]}>
                <Text style={[styles.btnTxt, styles.btnTxtRed]}>Dispose</Text>
              </TouchableOpacity>
            </View>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StorageManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  boxContainer: {
    marginHorizontal: 10,
  },
  storageBox: {
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    // marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  headers: {
    flex: 3,
    // paddingLeft: 10,
    justifyContent: "space-around",
    // borderColor: "yellow",
    // borderWidth: 1,
  },
  hdrTxt: {
    // textAlign: "center",
    // marginLeft: 10,
    fontSize: 12,
    fontFamily: "FragmentMono-Regular",
  },
  hdrTxtRed: {
    color: "red",
  },
  btnHolder: {
    flexDirection: "row",
    flex: 2,
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 5,
    // columnGap: 5,
    // borderColor: "blue",
    // borderWidth: 1,
  },
  btn: {
    borderRadius: 5,
    backgroundColor: "lightgray",
    padding: 10,
    margin: 2,
  },
  btnRed: {
    backgroundColor: "red",
    // color: "#fff",
  },
  btnTxt: {
    fontSize: 8,
    fontFamily: "FragmentMono-Regular",
  },
  btnTxtRed: {
    color: "#fff",
  },
});
