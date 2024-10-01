import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRestaurants, getFilter } from "../services/api"; // Importing getFilter
import RestaurantCard from "../components/RestaurantCard";
import FilterList from "../components/FilterList"; // Importing FilterList component
import { Colors } from "../constants/Colors";

export default function Index() {
  const router = useRouter();

  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); // State for filtered restaurants
  const [selectedFilters, setSelectedFilters] = useState([]); // Keep track of selected filters
  const [loading, setLoading] = useState(true);

  // Fetch all restaurants when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedRestaurants = await getRestaurants();
        setRestaurants(fetchedRestaurants);
        setFilteredRestaurants(fetchedRestaurants); // By default, show all restaurants
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Function to toggle filters
  const toggleFilter = async (filterId) => {
    let updatedFilters = [...selectedFilters];
    if (updatedFilters.includes(filterId)) {
      updatedFilters = updatedFilters.filter((id) => id !== filterId); // Remove filter if already selected
    } else {
      updatedFilters.push(filterId); // Add filter if not selected
    }
    setSelectedFilters(updatedFilters);

    // Fetch and apply filtered restaurants based on selected filters
    if (updatedFilters.length === 0) {
      // If no filters are selected, show all restaurants
      setFilteredRestaurants(restaurants);
    } else {
      // Fetch filtered restaurants by filter ID
      const filteredResults = restaurants.filter((restaurant) =>
        restaurant.filterIds.some((id) => updatedFilters.includes(id))
      );
      setFilteredRestaurants(filteredResults);
    }
  };

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
        <>
          {/* Render Filter List */}
          <FilterList
            filters={restaurants.flatMap((r) => r.filterIds)} // Extract filters from restaurants
            selectedFilters={selectedFilters}
            toggleFilter={toggleFilter} // Pass the toggle function
          />

          {/* Render Restaurant List */}
          <FlatList
            data={filteredRestaurants} // Display filtered restaurants or all by default
            keyExtractor={(item) => item.id}
            renderItem={renderRestaurant} // The object from the data array is passed automatically
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text>No restaurants available.</Text>}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
});
