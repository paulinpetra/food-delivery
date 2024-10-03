# Food Delivery - Eidra Umain Code Test

## Overview

This project implements a food delivery application that fetches and displays a list of restaurants from a provided API.
Users can click on restaurant cards to view detailed information,
including their open or closed status.
The application features a filter system, allowing users to refine the restaurant list by selecting multiple tags,
all while adhering to the design specifications outlined in Figma.

## Approach

1. **Planning**: Identified necessary screens and components, outlining the main content for each.

2. **State Management**: Assessed the state management requirements for the application to ensure smooth data flow and UI updates.

3. **Navigation Structure**: Assessed the navigation needs to facilitate easy movement between screens.

4. **File Structure**: Established an organized file structure for maintainability and scalability.

5. **Layout Implementation**: Began with layout files, incorporating stacks for navigation.

6. **Header Development**: Created a header for consistent branding and navigation.

7. **API Testing**: Tested the provided API to ensure accurate data fetching and handling.

8. **Styling**: Styled restaurant cards according to the Figma design specifications.

9. **Filter Functionality**:

   - Implemented a filtered list by connecting filter IDs from the restaurant endpoint to their corresponding names in the filter ID endpoint.
   - Ensured the filters effectively alter the restaurant list based on user selections.
   - Integrated filtered results within the individual restaurant list view.

10. **Individual Restaurant Page**: Developed the individual restaurant page, incorporating both functionality and styling to ensure a seamless user experience.

11. **Final Styling Adjustments**: Reviewed and refined any remaining styling details from my backlog, ensuring consistency with the overall design.

12. **Decision on State Management**: Chose not to implement a global state management solution due to time constraints and because it was not specified in the test instructions.

13. **Code Cleanup**: Organized the codebase by separating components and adding comments for improved readability and maintainability.

## Challenges

1. **Connecting Filter Names and IDs**: One of the primary challenges was associating filter names with their corresponding filter IDs from two different API endpoints. This was a new experience for me, requiring thorough research and careful examination of the API documentation.

2. **Styling the Header Component**: I encountered difficulties with the styling of the header component, as it did not behave as expected. I addressed this by iteratively testing different styles and adjustments until the design matched the specifications.

3. **Time Constraints**: I had some time constraints due to my full-time studies at this time but it did reinforce my time management skills and ability to prioritize tasks effectively. While I successfully implemented the core functionality of the application, I wished I had more time to enhance the overall quality of the code.

## Tools and Technologies

- **React Native**
- **Expo**
- **Expo Router**
- **State Management**: Utilized React hooks (`useState`, `useEffect`) for managing local state and side effects within components.
- **Styling**: Applied styles using React Native's `StyleSheet`.

## Future Improvements

1. **Global State Management**: Plan to implement a global state management solution (such as Redux or Context API) to streamline data handling across components. This will enhance data consistency and improve the overall architecture of the application.

2. **Component Modularity**: Aim to break down components into smaller, more reusable pieces. This will promote separation of concerns, making the codebase easier to maintain and scale. By creating smaller components, the application will also benefit from improved readability and reusability across different parts of the app.

3. Use TypeScript and Native Wind

## Positive Reflection

This project was an enjoyable experience for me, marking my first time completing a coding test for a company. It was exciting to dive into a React Native project, especially since I could dedicate time away from my studies, which are currently focused on other areas of development. Mobile app development is my main area of interest, and this project has reinforced my enthusiasm for pursuing a career in this field in the future.
