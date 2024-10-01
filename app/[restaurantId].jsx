import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { getOpenStatus } from "../services/api"; // Function to fetch restaurant status
import { Colors } from "../constants/Colors";

export default function RestaurantDetailScreen() {
  const { restaurantId, image_url, name } = useLocalSearchParams(); // Get the dynamic restaurantId from the URL + other details you need
  const [restaurantStatus, setRestaurantStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await getOpenStatus(restaurantId); // Fetch open/close status using the restaurant ID from URL
        setRestaurantStatus(status);
      } catch (error) {
        console.error("Error fetching restaurant status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [restaurantId]);

  return (
    <ImageBackground
      source={{ uri: image_url }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <View style={styles.card}>
            <View style={styles.content}>
              {/* Restaurant Name */}
              <Text style={styles.title}>{name}</Text>
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
});
