import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import { Skeleton } from '@rneui/themed';
import { getDetailContact } from '../../actions/contactAction';

export default function DetailContactPage({ navigation, route }: any) {
  const [contact, setContact] = useState<any>();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  async function getDataDetailContact() {
    try {
      setIsFetching(true);
      const response = await getDetailContact(route.params.id);
      if (response) {
        setContact(response);
        setIsFetching(false);
      } else {
        setIsFetching(false);
      }
    } catch (error) {
      setIsFetching(false);
      return error;
    }
  }

  useEffect(() => {
    getDataDetailContact();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isFetching} progressBackgroundColor={'#E79E4F'} tintColor={'#A05344'} onRefresh={getDataDetailContact} />
      }
      style={{ height: '100%', backgroundColor: '#321F28' }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ marginTop: 32 }}>
          {isFetching ? <Skeleton animation="wave" circle width={164} height={164} style={{ borderRadius: 100 }} /> : <Avatar.Image size={164} source={{ uri: contact ? contact.photo : 'https://api.api-ninjas.com/v1/randomimage?category=nature' }} />}
        </View>
        {isFetching ?
          <Skeleton animation="wave" width={264} height={100} style={{ borderRadius: 20, marginTop: 24 }} /> :
          <View style={{ paddingVertical: 16, paddingHorizontal: 32, marginTop: 24, backgroundColor: '#E79E4F', borderRadius: 20 }}>
            <View style={{ position: 'absolute', top: '-30%', right: '-7%', alignSelf: 'flex-end' }}>
              <IconButton
                icon="pencil"
                // iconColor={MD3Colors.error50}
                size={18}
                onPress={() => navigation.replace('EditContact', { id: contact ? contact.id : '' })}
                containerColor={'#734046'}
                iconColor={'#E79E4F'}
              />
            </View>
            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: '600', color: '#321F28', marginBottom: 8 }}>{contact ? contact.firstName + ' ' + contact.lastName : ''}</Text>
              <Text style={{ backgroundColor: '#321F28', borderRadius: 7, fontWeight: '600', fontSize: 16, paddingHorizontal: 8, paddingVertical: 4, color: '#E79E4F' }}>{contact ? contact.age + ' Years Old' : ''}</Text>
            </View>
          </View>}
      </View>
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
