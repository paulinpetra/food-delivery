import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { getOpenStatus, getFilter } from "../services/api"; // Function to fetch restaurant status & filter tags
import { Colors } from "../constants/Colors";
import { useRouter } from "expo-router";

export default function RestaurantDetailScreen() {
  const { restaurantId, image_url, name, filterIds } = useLocalSearchParams(); // Get the dynamic restaurantId from the URL + other details I need
  const router = useRouter(); // Initialize router

  const [restaurantStatus, setRestaurantStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterNames, setFilterNames] = useState([]); // State for filter names

  //fetching the restaurants status and filter tags
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch open/close status
        const status = await getOpenStatus(restaurantId);
        setRestaurantStatus(status);

        // Convert filterIds from string to an array since the parameters from useLocalSearchParams() are passed as strings
        const filterIdsArray = filterIds
          ? filterIds.split(",").map((id) => id.trim())
          : []; // Split and trim whitespace

        // Fetch filter names
        const names = [];
        for (const filterId of filterIdsArray) {
          if (filterId) {
            // Ensure filterId is not empty
            console.log(`Fetching filter for ID: ${filterId}`); // Log filter ID
            const filter = await getFilter(filterId); // Fetch each filter by ID
            if (filter) {
              names.push(filter.name); // Add the filter name to the list
            } else {
              console.warn(`Filter not found for ID: ${filterId}`); // Handle missing filter
            }
          }
        }
        setFilterNames(names); // Set the filter names in state
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [restaurantId, filterIds]);

  // Back button handler
  const handleBackPress = () => {
    router.back(); // Navigate back to the previous screen
  };

  return (
    <ImageBackground
      source={{ uri: image_url }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Image
            source={require("../assets/images/chevron.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <View style={styles.card}>
            <View style={styles.content}>
              {/* Restaurant Name */}
              <Text style={styles.title}>{name}</Text>
              {/* Display Filter Tags */}
              <Text style={styles.filters}>
                {filterNames.length > 0
                  ? filterNames.join(", ")
                  : "No filters available"}
              </Text>

              {/* Open/Closed Status */}
              <Text style={styles.status}>
                {restaurantStatus?.is_currently_open ? "Open" : "Closed"}
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    width: 375,
    height: 220,
  },
  card: {
    width: 343,
    height: 144,
    paddingTop: 16,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },

  content: {
    padding: 16,
    backgroundColor: "#FFFFFF", // Slight overlay for contrast
    borderRadius: 12, // Only apply this to the content to match the card shape
  },
  title: {
    fontSize: 24,
    color: Colors.darkText,
    fontFamily: "Helvetica",
  },
  status: {
    fontSize: 18,
    color: Colors.positive, //make dynamic later
    marginTop: 8,
    fontFamily: "Helvetica",
  },
  filters: {
    fontSize: 14,
    color: Colors.darkText,
    marginTop: 8,
    fontFamily: "Helvetica",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 1,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
});
