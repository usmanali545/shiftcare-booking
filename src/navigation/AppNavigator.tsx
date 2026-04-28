// src/navigation/AppNavigator.tsx

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DoctorsListScreen from "../screens/DoctorsListScreen";
import DoctorDetailScreen from "../screens/DoctorDetailScreen";
import BookingConfirmationScreen from "../screens/BookingConfirmationScreen";
import MyBookingsScreen from "../screens/MyBookingsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Doctors" component={DoctorsListScreen} />
        <Stack.Screen name="DoctorDetail" component={DoctorDetailScreen} />
        <Stack.Screen name="ConfirmBooking" component={BookingConfirmationScreen} />
        <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
