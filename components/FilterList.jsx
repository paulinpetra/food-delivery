import React, { useEffect, useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
} from "react-native";
import { getFilter } from "../services/api";
import { Colors } from "../constants/Colors";

export default function FilterList({ filters, selectedFilters, toggleFilter }) {
  const [filterDetails, setFilterDetails] = useState({}); // Store filter details (name, image) by id

  useEffect(() => {
    // Fetch details for all filters when the component mounts
    const fetchFilterData = async () => {
      const details = {};
      for (const filterId of filters) {
        const filter = await getFilter(filterId);
        if (filter) {
          details[filterId] = filter; // Store filter details by id
        }
      }
      setFilterDetails(details); // Update the state with fetched filter details
    };

    fetchFilterData();
  }, [filters]);

  // Render each filter button with image and name
  const renderFilter = ({ item }) => {
    const filter = filterDetails[item]; // Get the filter details by id

    if (!filter) {
      return null; // If filter details haven't loaded yet, return nothing
    }

    return (
      <TouchableOpacity
        style={[
          styles.filterButton,
          selectedFilters.includes(item) && styles.selectedFilter, // Highlight selected filters
        ]}
        onPress={() => toggleFilter(item)} // Call the toggle function when clicked
      >
        {/* Display the filter image */}
        <Image source={{ uri: filter.image_url }} style={styles.filterImage} />
        {/* Display the filter name */}
        <Text style={styles.filterText}>{filter.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.filterContainer}>
      <FlatList
        data={filters} // Use the filter IDs
        horizontal
        keyExtractor={(item, index) => `${item}-${index}`} // Ensure unique key by appending index
        renderItem={renderFilter}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  //container for the entire filter list
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  filterButton: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 24,
    marginRight: 10,
  },
  selectedFilter: {
    backgroundColor: "#E2A364", // Change the color for selected filters
  },
  filterText: {
    color: Colors.darkText,
    paddingLeft: 8, // Space between image and text
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Poppins-Regular",
  },
  filterImage: {
    width: 48,
    height: 48,
    borderRadius: 24, // Circular image
  },
});
