//Home screen with restaurant list and filtered list

import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import { Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRestaurants } from "../services/api";
import RestaurantCard from "../components/RestaurantCard";

export default function Index() {
  const router = useRouter();

  // Local state management for now
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch restaurants when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedRestaurants = await getRestaurants();
        setRestaurants(fetchedRestaurants);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Render each restaurant item
  const renderRestaurant = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => router.push(`/restaurant/${item.id}`)} // Navigate to the restaurant detail screen
    >
      <RestaurantCard restaurant={item} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={restaurants} // Display fetched restaurants
          keyExtractor={(item) => item.id}
          renderItem={renderRestaurant} //the object from the data array is passed automatically
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text>No restaurants available.</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
