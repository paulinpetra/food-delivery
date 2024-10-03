//Fetching the data with axios

import axios from "axios";

// Base URL for the API
const API_BASE_URL = "https://food-delivery.umain.io/api/v1";

// Function to fetch all restaurants
export const getRestaurants = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/restaurants`);
    return response.data.restaurants;
  } catch (error) {
    console.error("Error fetching restaurants", error);
  }
};

// Function to fetch filtered restaurants by ID
export const getFilter = async (filterId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/filter/${filterId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching filters", error);
  }
};

// Function to fetch the open status of a restaurant
export const getOpenStatus = async (restaurantId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/open/${restaurantId}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching open status for restaurant ${restaurantId}`,
      error
    );
    throw error;
  }
};
