import React from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

export default function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return <View></View>;
}
const styles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get('window').height,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
