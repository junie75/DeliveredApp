//this is the interactive map screen for the mailroom
import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { imageLookup } from "../imageLookup";

const MailMapScreen = () => {
  const mapRef = useRef(null); // Ref for the map component
  const markers = useRef([]); // Ref for storing marker references

  //list of halls and their coordinates and pin colors
  const halls = [
    {
      name: "Treadaway Hall (Mailroom)",
      pinColor: "red",
      coordinates: {
        latitude: 29.45470275536168,
        longitude: -98.56354245690179,
      },
    },
    {
      name: "Cremer Hall",
      pinColor: "blue",
      coordinates: {
        latitude: 29.449822722445038,
        longitude: -98.5677002515853,
      },
    },
    {
      name: "Perigeaux Hall",
      pinColor: "green",
      coordinates: {
        latitude: 29.450765857641912,
        longitude: -98.56785290174348,
      },
    },
    {
      name: "Founders Hall",
      pinColor: "orange",
      coordinates: {
        latitude: 29.449662160842546,
        longitude: -98.56544111645259,
      },
    },
    {
      name: "Chaminade Hall",
      pinColor: "purple",
      coordinates: {
        latitude: 29.452053532573377,
        longitude: -98.56150884585826,
      },
    },
    {
      name: "Marian Hall",
      pinColor: "yellow",
      coordinates: {
        latitude: 29.451035696229447,
        longitude: -98.56279948077439,
      },
    },
    {
      name: "Lourdes Hall",
      pinColor: "cyan",
      coordinates: {
        latitude: 29.45041186126853,
        longitude: -98.56528989837825,
      },
    },
    {
      name: "Dougherty Hall",
      pinColor: "magenta",
      coordinates: {
        latitude: 29.449849153374988,
        longitude: -98.56441970416331,
      },
    },
    {
      name: "Leies Hall",
      pinColor: "brown",
      coordinates: {
        latitude: 29.450047429946625,
        longitude: -98.56833265938766,
      },
    },
    {
      name: "Anthony Frederick Hall",
      pinColor: "teal",
      coordinates: {
        latitude: 29.450579841485,
        longitude: -98.5661802731333,
      },
    },
    {
      name: "Adele Hall",
      pinColor: "lime",
      coordinates: {
        latitude: 29.449727775461227,
        longitude: -98.56703513304315,
      },
    },
    {
      name: "Bordeaux Hall",
      pinColor: "pink",
      coordinates: {
        latitude: 29.449677137035696,
        longitude: -98.56638818711893,
      },
    },
    {
      name: "John Donohoo Hall",
      pinColor: "silver",
      coordinates: {
        latitude: 29.45069353456274,
        longitude: -98.5667924764602,
      },
    },
  ];

  // Function to render markers
  const renderMarkers = () => {
    // Map through halls and render a marker for each hall
    return halls.map((hall, index) => (
      <Marker
        key={index}
        coordinate={hall.coordinates}
        title={hall.name}
        pinColor={hall.pinColor}
        ref={(marker) => (markers.current[index] = marker)} // Ref for the marker
      />
    ));
  };

  // Function to handle when a box containing the hall is press
  const handleHallPress = (coordinates, index) => {
    // Animate to the pin marker
    mapRef.current.animateToRegion({
      ...coordinates,
      latitudeDelta: 0.00099, // Adjust as needed
      longitudeDelta: 0.001, // Adjust as needed
    });

    // Show the callout with the hall name for the marker
    markers.current[index].showCallout();
  };

  // Function to render the item for the FlatList
  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleHallPress(item.coordinates, index)}>
      <View style={styles.markerContainer}>
        <View
          style={[styles.markerBox, { backgroundColor: item.pinColor }]}
        ></View>
        <Text style={styles.markerName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.gMap}
        initialRegion={{
          //coordinates for the center of the map and the zoom level of st mary's university
          latitude: 29.45387 - 0.002,
          longitude: -98.561432 - 0.003,
          latitudeDelta: 0.0099,
          longitudeDelta: 0.01,
        }}
      >
        {
          //show the pin markers
          renderMarkers()
        }
      </MapView>
      <View style={styles.listContainer}>
        <FlatList
          data={halls}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default MailMapScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },

  wrapper: {
    marginHorizontal: 15,
  },

  map: {
    height: 400,
    width: "auto",
  },
  gMap: {
    flex: 1,
  },

  markerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    height: 50,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  markerBox: {
    height: 20,
    width: 20,
    backgroundColor: "navy",
  },

  listContainer: {
    flex: 1,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
