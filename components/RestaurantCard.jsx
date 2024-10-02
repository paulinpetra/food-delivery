import { useEffect, useState } from "react";

import { View, Text, Image, StyleSheet, Platform } from "react-native";
import { Colors } from "../constants/Colors";
import { getFilter } from "../services/api";

export default function RestaurantCard({ restaurant }) {
  const [filterNames, setFilterNames] = useState([]); // State to store filter names from the api filter endpoint

  useEffect(() => {
    const fetchFilters = async () => {
      const names = []; //array to store the filter names
      for (const filterId of restaurant.filterIds) {
        const filter = await getFilter(filterId); // call getFilter with the restaurants filter id
        if (filter) {
          names.push(filter.name); // Store the filter name
        }
      }
      setFilterNames(names); // Update state with fetched filter names
    };

    fetchFilters(); // Call fetch on component mount
  }, [restaurant.filterIds]); // Run this effect when the filterIds change, for example when the list is refreshed

  return (
    <View style={styles.elevatedCard}>
      <View style={styles.card}>
        <Image source={{ uri: restaurant.image_url }} style={styles.image} />
        <View style={styles.infoContainer}>
          <View style={styles.infoLeft}>
            <Text style={styles.name}>{restaurant.name}</Text>

            {/* Display Filter Names */}
            <Text style={styles.filters}>
              {filterNames.join(", ")} {/* Join filter names with commas */}
            </Text>

            <View style={styles.details}>
              <Image
                source={require("../assets/images/clock-icon.png")}
                style={{
                  width: 12,
                  height: 12,
                  marginRight: 4,
                }}
                resizeMode="contain"
              />
              <Text style={styles.detailsText}>
                {restaurant.delivery_time_minutes} mins
              </Text>
            </View>
          </View>
          <View style={styles.rating}>
            <Image
              source={require("../assets/images/star-icon.png")}
              style={{
                width: 12,
                height: 12,
                marginRight: 4,
              }}
              resizeMode="contain"
            />
            <Text style={styles.ratingText}>{restaurant.rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Outer container for the shadow and border radius - this is needed for both the overflow clipping and the shadow to work
  elevatedCard: {
    marginVertical: 12,
    backgroundColor: "#ffffff",
    //shadow for iOS
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4, // Shadow for Android
      },
    }),
  },
  // Inner container for the overflow clipping to work
  card: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden", // Ensures image doesn't overflow outside the rounded corners
  },
  image: {
    width: 343,
    height: 132,
    resizeMode: "cover",
  },
  infoContainer: {
    paddingHorizontal: 8,
    paddingBottom: 8,
    paddingTop: 8,

    flexDirection: "row",
    justifyContent: "space-between", // Push rating to the right
  },
  infoLeft: {
    flex: 1, // Take available space on the left
    flexDirection: "column", // Align name and details in a column
  },

  name: {
    fontSize: 18,
    fontFamily: "Helvetica",
    color: Colors.darkText,
  },
  filters: {
    color: Colors.subtitle,
    paddingVertical: 2,
    fontFamily: "Helvetica",
    fontSize: 12,
    fontWeight: "bold",
    lineHeight: 16,
  },

  details: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsText: {
    fontFamily: "Inter_18pt-Regular",
    color: "#50555C",
    fontSize: 10,
    lineHeight: 12,
  },
  rating: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  ratingText: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "bold",
  },
});
