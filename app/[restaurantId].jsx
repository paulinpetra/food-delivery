//eaxmple component, does not match the route
import { useRouter, useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getOpenStatus } from "../services/api"; // Function to fetch restaurant status

export default function RestaurantDetailScreen() {
  const { restaurantId } = useSearchParams(); // Get the dynamic restaurantId from the URL
  const [restaurantStatus, setRestaurantStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await getOpenStatus(restaurantId); // Fetch open/close status using the restaurant ID
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
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Text>
          {restaurantStatus?.is_currently_open
            ? "Restaurant is Open"
            : "Restaurant is Closed"}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
