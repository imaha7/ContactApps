import 'react-native-gesture-handler';
import * as React from 'react';
import MainPage from './pages';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton, Provider } from 'react-native-paper';
import DetailContactPage from './pages/DetailContact';
import AddContactPage from './pages/Contact/Add';
import EditContactPage from './pages/Contact/Edit';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={({ navigation, route }) => ({
            headerStyle: { backgroundColor: '#734046' },
            headerTitleStyle: { color: '#E79E4F' },
            headerLeft: () => (
              route.name !== 'Home' ?
                <IconButton
                  icon="arrow-left"
                  iconColor={'#E79E4F'}
                  size={24}
                  onPress={() => navigation.goBack()}
                /> : null
            ),
          })}>
            <Stack.Screen name="Home" component={MainPage} options={({ navigation, route }) => ({
              title: 'Contact App',
              headerRight: () => (
                <IconButton
                  icon="plus"
                  iconColor={'#E79E4F'}
                  size={24}
                  onPress={() => navigation.navigate('AddContact')}
                />
              ),
            })} />
            <Stack.Screen name="AddContact" component={AddContactPage} options={{
              title: 'Add Contact'
            }} />
            <Stack.Screen name="EditContact" component={EditContactPage} options={{
              title: 'Edit Contact'
            }} />
            <Stack.Screen name="DetailContact" component={DetailContactPage} options={{
              title: 'Detail Contact'
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
