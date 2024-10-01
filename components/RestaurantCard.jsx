import { View, Text, Image, StyleSheet, Platform } from "react-native";
import { Colors } from "../constants/Colors";

export default function RestaurantCard({ restaurant }) {
  return (
    <View style={styles.elevatedCard}>
      <View style={styles.card}>
        <Image source={{ uri: restaurant.image_url }} style={styles.image} />
        <View style={styles.infoContainer}>
          <View style={styles.infoLeft}>
            <Text style={styles.name}>{restaurant.name}</Text>

            <Text style={styles.details}>
              {" "}
              <Image
                source={require("../assets/images/clock-icon.png")}
                style={{
                  width: 12,
                  height: 12,
                }}
                resizeMode="contain"
              />
              {restaurant.delivery_time_minutes} mins
            </Text>
          </View>
          <Text style={styles.rating}>
            <Image
              source={require("../assets/images/star-icon.png")}
              style={{
                width: 12,
                height: 12,
              }}
              resizeMode="contain"
            />{" "}
            {restaurant.rating}
          </Text>
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
  details: {
    color: "#50555C",
    marginTop: 4,
    paddingLeft: 4,
    fontFamily: "Inter_18pt-Regular",
    fontSize: 10,
    lineHeight: 12,
  },
});
