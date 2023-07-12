import React, { useState, useEffect } from 'react';
import { Text, ToastAndroid, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, TextInput } from 'react-native-paper';
import { addContact } from '../../../actions/contactAction';

export default function AddContactPage({ navigation, route }: any) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number | any>(null);
  const [photoUrl, setPhotoUrl] = useState<string>("");

  async function addDataContact() {
    setIsFetching(true);
    try {
      const response = await addContact(firstName, lastName, parseInt(age), photoUrl);
      if (!response.includes('error')) {
        setIsFetching(false);
        ToastAndroid.showWithGravity(
          'Contact successfully added!',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        console.log(response);
        return response && navigation.replace('Home');
      } else {
        setIsFetching(false);
        ToastAndroid.showWithGravity(
          response,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        console.log(response);
      }
    } catch (error) {
      setIsFetching(false);
      console.log(error);
      return error;
    }
  }

  return (
    <View style={{ flexDirection: 'column', height: '100%', backgroundColor: '#321F28' }}>
      <ScrollView style={{ flexGrow: 11 }}>
        <View style={{ marginHorizontal: 10, marginVertical: 24 }}>
          <View style={{ marginHorizontal: 10, paddingBottom: 16, marginBottom: 24, borderBottomWidth: 1, borderColor: '#A05344' }}>
            <Text style={{ fontSize: 18, fontWeight: '500', color: '#E79E4F', marginBottom: 8 }}>Please fill the identity form completely below</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 16, marginHorizontal: 8 }}>
            <TextInput
              mode={'outlined'}
              value={firstName}
              onChangeText={firstName => setFirstName(firstName)}
              outlineStyle={{ borderRadius: 15, borderColor: '#A05344', color: '#A05344' }}
              style={{ flex: 1, backgroundColor: '#321F28', marginRight: 16 }}
              contentStyle={{ cursor: '#E79E4F' }}
              cursorColor={'#734046'}
              textColor={'#E79E4F'}
              selectionColor={'#734046'}
              placeholder={'First Name'}
              placeholderTextColor={'#A05344'}
              activeOutlineColor={'#E79E4F'}
              outlineColor={'#A05344'}
            />
            <TextInput
              mode={'outlined'}
              value={lastName}
              onChangeText={lastName => setLastName(lastName)}
              outlineStyle={{ borderRadius: 15, borderColor: '#A05344', color: '#A05344' }}
              style={{ flex: 1, backgroundColor: '#321F28' }}
              contentStyle={{ cursor: '#E79E4F' }}
              cursorColor={'#734046'}
              textColor={'#E79E4F'}
              selectionColor={'#734046'}
              placeholder={'Last Name'}
              placeholderTextColor={'#A05344'}
              activeOutlineColor={'#E79E4F'}
              outlineColor={'#A05344'}
            />
          </View>
          <TextInput
            keyboardType={'numeric'}
            mode={'outlined'}
            value={age}
            onChangeText={age => setAge(age)}
            outlineStyle={{ borderRadius: 15, borderColor: '#A05344', color: '#A05344' }}
            style={{ backgroundColor: '#321F28', marginBottom: 16, marginHorizontal: 8 }}
            contentStyle={{ cursor: '#E79E4F' }}
            cursorColor={'#734046'}
            textColor={'#E79E4F'}
            selectionColor={'#734046'}
            placeholder={'Type age here...'}
            placeholderTextColor={'#A05344'}
            activeOutlineColor={'#E79E4F'}
            outlineColor={'#A05344'}
          />
          <TextInput
            mode={'outlined'}
            value={photoUrl}
            onChangeText={url => setPhotoUrl(url)}
            outlineStyle={{ borderRadius: 15, borderColor: '#A05344', color: '#A05344' }}
            style={{ backgroundColor: '#321F28', marginBottom: 16, marginHorizontal: 8 }}
            contentStyle={{ cursor: '#E79E4F' }}
            cursorColor={'#734046'}
            textColor={'#E79E4F'}
            selectionColor={'#734046'}
            placeholder={'Insert url photo here...'}
            placeholderTextColor={'#A05344'}
            activeOutlineColor={'#E79E4F'}
            outlineColor={'#A05344'}
          />
        </View>
      </ScrollView>
      <View style={{ flexShrink: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', backgroundColor: '#734046', elevation: 5, borderTopRightRadius: 20, borderTopLeftRadius: 20, width: '100%', height: 64 }}>
        <Button mode="contained" disabled={!firstName || !lastName || !age || !photoUrl} loading={isFetching} buttonColor={'#E79E4F'} labelStyle={{ fontSize: 18, color: '#321F28' }} style={{ width: '90%' }} onPress={() => addDataContact()}>
          Add New Contact
        </Button>
      </View>
    </View>
  );
}
