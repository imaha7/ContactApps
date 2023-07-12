
import React, { useEffect, useState } from 'react';
import { FlatList, View, Alert, ToastAndroid } from 'react-native';
import { ActivityIndicator, Avatar, List, Menu } from 'react-native-paper';
import { deleteContact, getContacts } from '../actions/contactAction';
import { RefreshControl } from 'react-native';

export default function MainPage({ navigation }: any) {
  const [contact, setContact] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [visible, setVisible] = useState([{ id: '', visible: false }]);

  async function getDataContacts() {
    try {
      setIsFetching(true);
      const response = await getContacts();
      if (response.length > 0) {
        let arr: any[] = [];
        response.map((item: any) => {
          arr.push({
            id: item.id,
            visible: false
          });
          setVisible(arr);
        });
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

  async function deleteDataContact(id: string) {
    setIsFetching(true);
    try {
      const response = await deleteContact(id);
      if (response !== '201' || response !== 200) {
        ToastAndroid.showWithGravity(
          response.toString(),
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else {
        ToastAndroid.showWithGravity(
          'Contact successfully deleted!',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
      setIsFetching(false);
      getDataContacts();
      console.log(response);
    } catch (error) {
      ToastAndroid.showWithGravity(
        'Contact failed deleted!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      getDataContacts();
      setIsFetching(false);
      console.log(error);
      return error;
    }
  }

  const getContent = () => {
    return isFetching ? <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator animating={true} size={48} color={'#E79E4F'} /></View> : (
      <FlatList
        data={contact}
        refreshControl={<RefreshControl refreshing={isFetching} progressBackgroundColor={'#E79E4F'} tintColor={'#A05344'} onRefresh={getDataContacts} />}
        renderItem={({ item, index }) => (
          <Menu
            key={item.id}
            visible={visible[index].visible}
            onDismiss={() => {
              let newArr = [...visible];
              newArr[index].visible = false;
              setVisible(newArr);
            }}
            anchor={
              <List.Item
                title={`${item.firstName} ${item.lastName}`}
                description={`${item.age} years old`}
                left={props => <Avatar.Image {...props} size={48} source={{ uri: item.photo }} />}
                onPress={() => navigation.navigate('DetailContact', { id: item.id })}
                onLongPress={() => {
                  let newArr = [...visible];
                  newArr[index].visible = true;
                  setVisible(newArr);
                }}
                titleStyle={{ fontWeight: 'bold', fontSize: 18, color: '#E79E4F' }}
                descriptionStyle={{ color: '#A05344' }}
                style={{ marginHorizontal: 10, marginVertical: 10, borderRadius: 20, borderWidth: 2, borderColor: '#734046', marginTop: index === 0 ? 24 : 10, marginBottom: index === visible.length - 1 ? 24 : 10 }}
              />
            }
            anchorPosition={'bottom'}
            contentStyle={{ backgroundColor: '#E79E4F', borderRadius: 10 }}
            style={{ marginTop: -32, borderRadius: 20 }}>
            <Menu.Item
              onPress={() => {
                let newArr = [...visible];
                newArr[index].visible = false;
                setVisible(newArr);
                Alert.alert('Delete Contact', 'Are you sure to delete this contact ?', [
                  {
                    text: 'No, wait',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Yes, delete it',
                    onPress: () => deleteDataContact(item.id)
                  },
                ]);
              }}
            title={`Delete ${item.firstName} ${item.lastName}`}
            titleStyle={{ color: '#321F28', fontWeight: 700 }}
            style={{ height: 32, marginRight: 0 }} />
          </Menu>
        )}
      />
    )
  }

  useEffect(() => {
    getDataContacts();
  }, []);

  return (
    <View style={{ height: '100%', backgroundColor: '#321F28' }}>
      {getContent()}
    </View>
  );
}
