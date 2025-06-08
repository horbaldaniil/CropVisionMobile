import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';

export default function HomeScreen({ navigation }) {
  // Функція для відкриття галереї та вибору одного фото
  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Доступ не надано', 'Потрібен доступ до галереї, щоб вибрати фото.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      const uri = result.assets ? result.assets[0].uri : result.uri;
      navigation.navigate('Result', { photoUri: uri });
    }
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 35, backgroundColor:'white' }}>

      <View style={{ paddingHorizontal:10, paddingVertical:12, borderRadius:10, backgroundColor:'#F2F9ED', marginTop:30  }}>
        <Ionicons style={{ alignSelf:'center', marginBottom:6 }} name='information-circle' size={30} color='#538135' />
        <Text style={{ textAlign: 'center', color:'#538135', fontSize:16, fontWeight:500 }}>Зробіть чітке фото культури або рослини для аналізу</Text>
      </View>

      <View style={{ backgroundColor:'#F3F4F6', width:'100%', height:'60%', marginTop:'20%', borderRadius:10, alignItems:'center', justifyContent:'center' }}>
        <Ionicons name="camera-outline" size={110} color="#9CA3AF" />
        <Text style={{ color:'#9CA3AF' }}>Зображення не вибрано</Text>
        <View style={{  gap:15, marginTop:20 }}>
          <Button 
            title="Камера" 
            icon={{
              name:'camera',
              color:'white',
              type:'font-awesome',
            }}
            buttonStyle={{ borderRadius:15, backgroundColor:'#538135', paddingHorizontal:20, paddingVertical:10 }}
            onPress={() => navigation.navigate('Camera')} 
          />

          <Button 
            title="Галерея" 
            icon={{
              name:'photo',
              color:'white',
              type:'font-awesome',
            }}
            buttonStyle={{ borderRadius:15, backgroundColor:'#538135', paddingHorizontal:20, paddingVertical:10 }}
            onPress={openGallery} 
          />

        </View>
      </View>
    </View>
  );
}
