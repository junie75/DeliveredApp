import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
// import { BarCodeScanner } from "expo-barcode-scanner";
import { AutoFocus, Camera } from "expo-camera";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  getAccountByLName,
  getPackageByTrackingNum,
  getPackagesByTrackingNum,
  insertDelivery,
  updatePackageIsPickedUp,
} from "../../databaseHelper";

const ScanStack = createNativeStackNavigator();

function EnterDelivery({ navigation, route }) {
  const { data, mailType, searchResult } = route.params;
  const currentDate = new Date(); //stamp data of package receival
  const formattedDate = currentDate.toLocaleString();

  const insertAndNotify = async () => {
    const AccID = searchResult.AccID;
    const MailType = mailType;
    // Format date as "YYYY-MM-DD HH:MM:SS"
    const DateReceived = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const TrackingNum = data ? data : "null";

    try {
      await insertDelivery(AccID, MailType, DateReceived, TrackingNum);
      Alert.alert(
        "Insertion Successful",
        `${MailType} has been successfully entered into the database`,
        //array for the buttons displayed on the alert
        [
          {
            text: "Home",
            onPress: () => {
              console.log("Home pressed");
              navigation.navigate("Admin Home");
            },
            // style: "cancel",
          },
          {
            text: "Scan More",
            onPress: () => {
              console.log("Scan more pressed");
              // console.log(myDB);
              // console.log(accounts);
              navigation.navigate("Choose Delivery");
            },
            isPreferred: "true",
          },
        ]
      );
      // navigation.navigate("Admin Home");
    } catch (e) {
      Alert.alert(`Error inserting ${fname}`, e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.txt, { marginTop: 10 }]}>Confirm Details?</Text>
      <View
        style={[
          styles.containerCard,
          {
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            padding: 20,
            height: 250,
            justifyContent: "space-around",
          },
        ]}
      >
        <Text style={styles.txt}>
          Recipient: {searchResult.Fname} {searchResult.Lname}
        </Text>
        <Text style={styles.txt}>Mail Type: {mailType}</Text>
        <Text style={styles.txt}>Date Received: {formattedDate}</Text>
        <Text style={styles.txt}>Tracking Number: {data ? data : "null"} </Text>
        <Text style={styles.txt}></Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          insertAndNotify();
        }}
        // style={{ alignSelf: "flex-end" }}
      >
        <Text style={[styles.txt, { color: "blue" }]}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

//Find the recipient of the package
function FindUser({ navigation, route }) {
  const { data } = route.params || {};
  const [nameSearch, setNameSearch] = useState("");
  const [searchPressed, setSearchPressed] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  //If data has tracking number as a value, mail type is package, else mail type is a letter
  const mailType = data ? "Package" : "Letter";

  //get matching recipient last names
  const getResults = () => {
    getAccountByLName(nameSearch)
      .then((resultSet) => {
        setSearchResults(resultSet.rows._array); //retrive array of account objects
      })
      .catch((error) => {
        console.error("Error searching accounts: ", error);
      });
  };

  //return
  const showResults = () => {
    return searchResults.map((searchResult, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={styles.resultsBox}
          onPress={() =>
            navigation.navigate("Enter Delivery", {
              data,
              mailType,
              searchResult,
            })
          }
        >
          <Text style={styles.txt}>
            {searchResult.Fname} {searchResult.Lname}
          </Text>
          {/* <Text style={styles.txt}>{searchResults.Email}</Text> */}
          <Text style={styles.txt}>{searchResult.Address}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerCard}>
        {
          //if coming from new package, display tracking number
          data && (
            <View style={{ marginBottom: 30 }}>
              <Text style={[styles.txt, { fontSize: 10, color: "red" }]}>
                Tracking Number: {data}
              </Text>
            </View>
          )
        }
        <Text style={styles.txt}>Enter recipient's last name</Text>
        <TextInput
          style={[styles.txt, styles.nameSearch]}
          placeholder="name.."
          onChangeText={setNameSearch}
        />
        <TouchableOpacity
          onPress={() => {
            setSearchPressed(true);
            getResults();
          }}
          style={{ alignSelf: "flex-end" }}
        >
          <Text style={[styles.txt, { color: "blue" }]}>Search</Text>
        </TouchableOpacity>
      </View>
      {searchPressed && (
        <ScrollView style={styles.containerCard}>{showResults()}</ScrollView>
      )}
    </View>
  );
}

//page to determine if entering new package or new letter
function ChooseDelivery({ navigation }) {
  const next = "findUser";
  return (
    <View style={styles.container}>
      <View style={styles.containerCard}>
        <Text style={styles.txt}>
          What type of delivery would you like to enter?
        </Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Scan Package", { next })}
          >
            <Text style={styles.txt}>New Package</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Find User")}
          >
            <Text style={styles.txt}>New Letter</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View></View>
    </View>
  );
}

function PackagePickup({ navigation, route }) {
  const { data } = route.params || {}; //receives tracking number from scanPackage
  const [packageInfo, setPackageInfo] = useState([]);
  const trackingNum = data;

  //call getResults upon loading of the page
  useEffect(() => {
    getResults();
  }, []);

  //change package to picked up in the database
  const updatePackageToPickedUp = async (deliveryID) => {
    const currentDate = new Date(); //stamp data of package receival
    const datePickedUp = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " "); //format to fit into db correctly
    try {
      const result = await updatePackageIsPickedUp(deliveryID, datePickedUp);
      console.log("Package updated successfully:", result);
    } catch (error) {
      //handle errors if any
      console.error("Error updating package:", error);
    }
  };

  //get package by tracking number
  const getResults = () => {
    getPackageByTrackingNum(trackingNum)
      .then((resultSet) => {
        setPackageInfo(resultSet.rows._array); //retrive array of account objects
        console.log(resultSet.rows._array);
      })
      .catch((error) => {
        console.error("Error searching deliveries: ", error);
      });
  };

  //display packages with the same tracking number
  const showResults = () => {
    return packageInfo.map((packageFound, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={[styles.resultsBox, { alignItems: "flex-start" }]}
          onPress={() => updatePackageToPickedUp(packageFound.DeliveryID)}
        >
          <Text style={styles.txt}>ID: {packageFound.DeliveryID}</Text>
          <Text style={styles.txt}>
            Recipient: {packageFound.Fname} {packageFound.Lname}
          </Text>
          <Text style={styles.txt}>Received: {packageFound.DateReceived}</Text>
          <Text style={styles.txt}>Address: {packageFound.Address}</Text>
          <Text style={styles.txt}>
            Tracking Num: {packageFound.TrackingNum}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text>Package Pickup Screen</Text>
      <View style={{ marginBottom: 30 }}>
        <Text style={[styles.txt, { fontSize: 10, color: "red" }]}>
          Tracking Number: {data}
        </Text>
      </View>
      <ScrollView style={styles.containerCard}>{showResults()}</ScrollView>
    </View>
  );
}

//page to determine if entering new package or new letter
function ChooseEntry({ navigation }) {
  const next = "packagePickup";
  return (
    <View style={styles.container}>
      <View style={styles.containerCard}>
        <Text style={styles.txt}>
          Is this a new delivery or a package pickup?
        </Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Choose Delivery")}
          >
            <Text style={styles.txt}>New Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Scan Package", { next })}
          >
            <Text style={styles.txt}>Package Pickup</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View></View>
    </View>
  );
}

function ScanPackage({ navigation, route }) {
  const { next } = route.params; //next has the next route scanPackage should call
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    console.log(data);
    //send tracking number to next page based on which function called it
    if (next === "findUser") {
      navigation.navigate("Find User", { data });
    } else if (next === "packagePickup") {
      navigation.navigate("Package Pickup", { data });
    } else {
      Alert.alert("Next route was not given");
      navigation.navigate("Admin Home");
    }
  };

  //display barcode scanner with device camera
  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
          autoFocus={AutoFocus.on}
        />
      </View>
    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission not granted</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Welcome to the Barcode Scanner App!</Text> */}
      <Text style={styles.paragraph}>Scan a barcode to start your job.</Text>
      {renderCamera()}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setScanned(false)}
        disabled={scanned}
      >
        <Text style={styles.buttonText}>Scan Barcode </Text>
      </TouchableOpacity>
    </View>
  );
}

const ScanMail = ({ navigation }) => {
  return (
    <ScanStack.Navigator>
      <ScanStack.Screen
        name="Choose Entry"
        component={ChooseEntry}
        options={{ headerShown: false }}
      />
      <ScanStack.Screen
        name="Package Pickup"
        component={PackagePickup}
        options={{ headerShown: false }}
      />
      <ScanStack.Screen
        name="Choose Delivery"
        component={ChooseDelivery}
        options={{ headerShown: false }}
      />
      <ScanStack.Screen
        name="Scan Package"
        component={ScanPackage}
        options={{ headerShown: false }}
      />
      <ScanStack.Screen
        name="Find User"
        component={FindUser}
        options={{ headerShown: false }}
      />
      <ScanStack.Screen
        name="Enter Delivery"
        component={EnterDelivery}
        options={{ headerShown: false }}
      />
    </ScanStack.Navigator>
  );
};

export default ScanMail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  containerCard: {
    // backgroundColor: "lightblue",
    margin: 20,
    marginTop: 30,
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
    // borderRadius: 10,
    // height: "70%",
    width: "90%",
  },
  btnContainer: {
    marginTop: 50,
    //alignItems: "center",
    justifyContent: "space-around",
    // flex: 1,
    // borderWidth: 2,
    // borderColor: "yellow",
    height: 200,
  },
  btn: {
    borderWidth: 2,
    borderColor: "blue",
    alignItems: "center",
    paddingVertical: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    width: "80%",
    aspectRatio: 1,
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 40,
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  txt: {
    // fontSize: 10,
    fontFamily: "FragmentMono-Regular",
    // color: "blue",
  },
  nameSearch: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  resultsBox: {
    // flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderWidth: 2,
    borderColor: "blue",
    alignItems: "center",
    margin: 15,
  },
});
