import * as React from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { TextInput, Button, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Constants from 'expo-constants';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      almunki: '',
      liisunki: '',
      tutuki: '',
    },
  });
  var day = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var date = day + '/' + month;
  const onSubmit = (data) => {
    console.log(data.almunki);
    data.labels = date;
    postData('http://192.168.31.130:3000/piggieapp/post', {
      data,
    }).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
    reset({
      almunki: '',
      liisunki: '',
      tutuki: '',
    });
  };

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };
  console.log('errors', errors);
  return (
    /*  <View style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      > */
    <View style={styles.container}>
      <Text style={styles.label}>Almunki</Text>
      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value },
        }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            keyboardType='numeric'
            placeholder='g'
          />
        )}
        name='almunki'
        rules={{ required: true }}
      />
      <Text style={styles.label}>Liisunki</Text>
      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value },
        }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            keyboardType='numeric'
            placeholder='g'
          />
        )}
        name='liisunki'
        rules={{ required: true }}
      />
      <Text style={styles.label}>Tutuki</Text>
      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value },
        }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            keyboardType='numeric'
            placeholder='g'
          />
        )}
        name='tutuki'
        rules={{ required: true }}
      />

      <View style={styles.button}>
        <Button
          style={styles.buttonInner}
          color
          title='Submit'
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <View style={styles.button}>
        <Button
          style={styles.buttonInner}
          color
          title='Reset'
          onPress={() => {
            reset({
              almunki: '',
              liisunki: '',
              tutuki: '',
            });
          }}
        />
      </View>
    </View>
    /*      </ScrollView>
    </View> */
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get('window').height,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#0e101c',
  },
  scrollViewContainer: {},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  test: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#0e101c',
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});
async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  return response.json();
}
