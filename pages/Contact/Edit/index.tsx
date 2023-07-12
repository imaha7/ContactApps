import React, { useState, useEffect } from 'react';
import { Text, ToastAndroid, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, TextInput } from 'react-native-paper';
import { getDetailContact, updateContact } from '../../../actions/contactAction';

export default function EditContactPage({ navigation, route }: any) {
  const [contact, setContact] = useState<any>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [age, setAge] = React.useState<number | any>(null);
  const [photoUrl, setPhotoUrl] = React.useState<string>("");

  async function getDataDetailContact() {
    try {
      setIsFetching(true);
      const response = await getDetailContact(route.params.id);
      if (response) {
        setFirstName(response.firstName);
        setLastName(response.lastName);
        setAge(response.age);
        setPhotoUrl(response.photo);
        setIsFetching(false);
      } else {
        setIsFetching(false);
      }
    } catch (error) {
      setIsFetching(false);
      return error;
    }
  }

  async function updateDataContact(id: string) {
    setIsFetching(true);
    try {
      const response = await updateContact(id, firstName, lastName, parseInt(age), photoUrl);
      if (!response.includes('error')) {
        ToastAndroid.showWithGravity(
          'Contact successfully updated!',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        setIsFetching(false);
        console.log(response);
        return response && navigation.replace('DetailContact', { id: id });
      } else {
        ToastAndroid.showWithGravity(
          response.toString(),
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

  useEffect(() => {
    getDataDetailContact();
  }, []);

  return (
    <View style={{ flexDirection: 'column', height: '100%', backgroundColor: '#321F28' }}>
      <ScrollView style={{ flexGrow: 11 }}>
        <View style={{ marginHorizontal: 10, marginVertical: 24 }}>
          <View style={{ marginHorizontal: 10, paddingBottom: 16, marginBottom: 24, borderBottomWidth: 1, borderColor: '#A05344' }}>
            <Text style={{ fontSize: 18, fontWeight: '500', color: '#E79E4F', marginBottom: 8 }}>Please change the identity correctly below</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 16, marginHorizontal: 8 }}>
            <TextInput
              mode={'outlined'}
              value={firstName}
              disabled={isFetching}
              onChangeText={firstName => setFirstName(firstName)}
              outlineStyle={{ borderRadius: 15, borderColor: '#A05344', color: '#A05344' }}
              style={{ flex: 1, backgroundColor: '#321F28', marginRight: 16 }}
              contentStyle={{ cursor: '#E79E4F' }}
              cursorColor={'#734046'}
              textColor={'#E79E4F'}
              selectionColor={'#734046'}
              placeholder={isFetching ? 'Loading...' : "First Name"}
              placeholderTextColor={'#A05344'}
              activeOutlineColor={'#E79E4F'}
              outlineColor={'#A05344'}
            />
            <TextInput
              mode={'outlined'}
              value={lastName}
              disabled={isFetching}
              onChangeText={lastName => setLastName(lastName)}
              outlineStyle={{ borderRadius: 15, borderColor: '#A05344', color: '#A05344' }}
              style={{ flex: 1, backgroundColor: '#321F28' }}
              contentStyle={{ cursor: '#E79E4F' }}
              cursorColor={'#734046'}
              textColor={'#E79E4F'}
              selectionColor={'#734046'}
              placeholder={isFetching ? 'Loading...' : "Last Name"}
              placeholderTextColor={'#A05344'}
              activeOutlineColor={'#E79E4F'}
              outlineColor={'#A05344'}
            />
          </View>
          <TextInput
            keyboardType={'numeric'}
            mode={'outlined'}
            value={age ? age.toString() : age}
            disabled={isFetching}
            onChangeText={age => setAge(age)}
            outlineStyle={{ borderRadius: 15, borderColor: '#A05344', color: '#A05344' }}
            style={{ backgroundColor: '#321F28', marginBottom: 16, marginHorizontal: 8 }}
            contentStyle={{ cursor: '#E79E4F' }}
            cursorColor={'#734046'}
            textColor={'#E79E4F'}
            selectionColor={'#734046'}
            placeholder={isFetching ? 'Loading...' : "Type age here..."}
            placeholderTextColor={'#A05344'}
            activeOutlineColor={'#E79E4F'}
            outlineColor={'#A05344'}
          />
          <TextInput
            mode={'outlined'}
            value={photoUrl}
            disabled={isFetching}
            onChangeText={url => setPhotoUrl(url)}
            outlineStyle={{ borderRadius: 15, borderColor: '#A05344', color: '#A05344' }}
            style={{ backgroundColor: '#321F28', marginBottom: 16, marginHorizontal: 8 }}
            contentStyle={{ cursor: '#E79E4F' }}
            cursorColor={'#734046'}
            textColor={'#E79E4F'}
            selectionColor={'#734046'}
            placeholder={isFetching ? 'Loading...' : "Insert url photo here..."}
            placeholderTextColor={'#A05344'}
            activeOutlineColor={'#E79E4F'}
            outlineColor={'#A05344'}
          />
        </View>
      </ScrollView>
      <View style={{ flexShrink: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', backgroundColor: '#734046', elevation: 5, borderTopRightRadius: 20, borderTopLeftRadius: 20, width: '100%', height: 64 }}>
        <Button mode="contained" loading={isFetching} buttonColor={'#E79E4F'} disabled={isFetching || (!firstName || !lastName || !age || !photoUrl)} labelStyle={{ fontSize: 18, color: '#321F28' }} style={{ width: '90%' }} onPress={() => updateDataContact(route.params.id)}>
          Confirm and Save
        </Button>
      </View>
    </View>
  );
}
