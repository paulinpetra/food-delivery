import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { getRestaurants } from "../services/api";
import RestaurantCard from "../components/RestaurantCard";
import FilterList from "../components/FilterList";
import { Colors } from "../constants/Colors";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  const router = useRouter();
  //local state management for now - maybe change later
  const [restaurants, setRestaurants] = useState([]); //State for restaurant list
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); // State for filtered restaurants list
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
      //check if any of the filter IDs associated with the current restaurant match the criteria defined inside the callback function.
      // check if the current id (from the filterIds array) exists within the updatedFilters array.
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
      onPress={() =>
        router.push({
          pathname: `/${item.id}`,
          params: {
            image_url: item.image_url,
            name: item.name,
            filterIds: Array.isArray(item.filterIds) ? item.filterIds : [], // Ensure filterIds are always an array
          },
        })
      }
    >
      <RestaurantCard restaurant={item} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="Colors.background" />
      <View style={styles.innerContainer}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            {/* Render Filter List */}
            <FilterList
              filters={restaurants.flatMap((r) => r.filterIds)} // Extract filter ids from restaurants
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.background,
    //marginTop: "8%",
  },
  innerContainer: {
    width: "90%",
  },
});
