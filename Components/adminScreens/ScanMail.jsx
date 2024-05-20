//this screen is where the admin can scan in new mail deliveries or packages and handle package pickups
//because the scan mail functionalites are so in depth, it utilizes its own stack navigator to navigate between the different screens
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
import { AutoFocus, Camera } from "expo-camera/legacy";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  getAccountByLName,
  getPackageByTrackingNum,
  getPackagesByTrackingNum,
  insertDelivery,
  updatePackageIsPickedUp,
} from "../../databaseHelper";

//create its own stack navigator to navigate between the different screens
const ScanStack = createNativeStackNavigator();

//function to enter the delivery into the database and notify the recipient
function EnterDelivery({ navigation, route }) {
  const { data, mailType, searchResult } = route.params;
  const currentDate = new Date(); //stamp data of package receival
  const formattedDate = currentDate.toLocaleString();

  //for testing purposes
  console.log(currentDate);
  console.log(formattedDate);

  //insert the delivery into the database and notify the recipient
  const insertAndNotify = async () => {
    const AccID = searchResult.AccID;
    const MailType = mailType;

    // Format date as "YYYY-MM-DD HH:MM:SS"
    const DateReceived = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const TrackingNum = data ? data : "null";

    //set notification alert in secure storage
    try {
      await AsyncStorage.setItem(`${AccID}`, "true");
    } catch (e) {
      // Saving error
      Alert.alert(
        `Error alerting ${searchResult.Fname} ${searchResult.Lname}`,
        e.message
      );
    }

    try {
      //insert into delivery table in database
      await insertDelivery(AccID, MailType, DateReceived, TrackingNum);

      //alert the admin that the delivery has been entered into the database and the recipient has been notified
      Alert.alert(
        "Insertion Successful",
        `${MailType} has been successfully entered into the database and ${searchResult.Fname} ${searchResult.Lname} has been notified`,
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
      Alert.alert(`Error inserting`, e.message);
    }
  };

  //render the confirmation page
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
      >
        <Text style={[styles.txt, { color: "blue" }]}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

//Find the recipient of the package
function FindUser({ navigation, route }) {
  //get the tracking number from the previous page or empty object if it is a letter
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

  //display search results and navigate to enter delivery page with the package information
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
          <Text style={styles.txt}>{searchResult.Address}</Text>
        </TouchableOpacity>
      );
    });
  };

  //render the page
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
      {
        //display the results once last name is searched for
        searchPressed && (
          <ScrollView style={styles.containerCard}>{showResults()}</ScrollView>
        )
      }
    </View>
  );
}

//page to determine if entering new package or new letter
function ChooseDelivery({ navigation }) {
  //sent to scanPackage to determine which page to navigate to next
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

//****FUNCTIONALITY update package to picked up when user comes to pick up package */
function PackagePickup({ navigation, route }) {
  const { data } = route.params || {}; //receives tracking number from scanPackage
  const [packageInfo, setPackageInfo] = useState([]);
  const [packageFound, setPackageFound] = useState(false); //if package is found, set to true
  const trackingNum = data;

  //call getResults upon loading of the page
  useEffect(() => {
    getResults();
  }, []);

  useEffect(() => {
    if (packageInfo.length > 0) {
      setPackageFound(true);
    }
  }, [packageInfo]);

  //change package to picked up in the database
  const updatePackageToPickedUp = async (deliveryID) => {
    const currentDate = new Date(); //stamp date of package receival
    const datePickedUp = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " "); //format to fit into db correctly
    try {
      const result = await updatePackageIsPickedUp(deliveryID, datePickedUp);
      console.log("Package updated successfully:", result);
      //display success message on screen
      Alert.alert("Update Successful", "Package updated successfully");
      //go home
      navigation.navigate("Admin Home");
    } catch (error) {
      //handle errors if any
      console.error("Error updating package:", error);
      Alert.alert("Error updating package:", error);
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
      <ScrollView style={styles.containerCard}>
        {packageFound ? (
          showResults()
        ) : (
          <Text
            style={{
              fontSize: 10,
              color: "gray",
              textAlign: "center",
              marginTop: "50%",
            }}
          >
            No packages found with this tracking number.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

//page to determine if entering new package or new letter
function ChooseEntry({ navigation }) {
  //sent to scanPackage to determine which page to navigate to next
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

//function to scan the barcode of a package, used for both package pick up and new package entry
function ScanPackage({ navigation, route }) {
  const { next } = route.params; //next has the next route scanPackage should call
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  // ask for device camera permissions upon first render
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  //function to handle the barcode scan and navigate to the correct page with the tracking number
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
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

  //return empty page if permissions are not yet determined
  if (hasPermission === null) {
    return <View />;
  }

  //return page with error message if permissions are not granted
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission not granted</Text>
      </View>
    );
  }

  //render barcode scanner
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.paragraph,
          styles.txt,
          { marginTop: 30, marginHorizontal: 15, fontSize: 15 },
        ]}
      >
        Scan a barcode to continue.
      </Text>
      {renderCamera()}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setScanned(false)}
        disabled={scanned}
      >
        <Text style={[styles.buttonText, styles.txt]}>Scan Barcode </Text>
      </TouchableOpacity>
    </View>
  );
}

//navigation tool for scan mail
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
    margin: 20,
    marginTop: 30,
    width: "90%",
  },
  btnContainer: {
    marginTop: 50,
    justifyContent: "space-around",
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

  nameSearch: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  resultsBox: {
    justifyContent: "space-around",
    padding: 10,
    borderWidth: 2,
    borderColor: "blue",
    alignItems: "center",
    margin: 15,
  },
});
