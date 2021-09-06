import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import SvgComponent from '../components/svgExample';
import { ScrollView, RefreshControl, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import LineChartComponent from '../components/chartKit';

import Example from '../components/reactHookForm';
import * as ScreenOrientation from 'expo-screen-orientation';
import Navigation from '../navigation';
const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
  );
}
export default function TabOneScreen() {
  const [value, onChangeText] = React.useState('Useless Placeholder');
  const [refreshing, setRefreshing] = React.useState(false);
  /* Navigation.setOptions({ headerShown: false }); */
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  /* changeScreenOrientation(); */
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <LineChartComponent></LineChartComponent>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c3644',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  test: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#2c3644',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
