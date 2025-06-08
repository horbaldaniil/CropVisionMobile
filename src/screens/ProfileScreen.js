import React, { useContext } from 'react';
import { View, Text, Alert } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import authStyles from '../styles/authStyles';
import { Divider, Button  } from '@rneui/themed';

export default function ProfileScreen() {
  const { userInfo, logout, deleteAccount } = useContext(AuthContext);

  const confirmDelete = () => {
    Alert.alert(
      "Видалити акаунт",
      "Ви точно хочете видалити акаунт? Ця дія не зворотня.",
      [
        { text: "Скасувати", style: "cancel" },
        {
          text: "Видалити",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAccount();
            } catch (err) {
              Alert.alert('Помилка', err.message || 'Не вдалося видалити акаунт');
            }
          }
        }
      ]
    );
  };

  return (
    <View style={{ flex: 1, paddingTop:30, paddingHorizontal:30, backgroundColor:'white' }}>
      <View style={{ backgroundColor:'lightgrey', borderRadius:15, padding:20, alignItems:'center' }}>
        <Ionicons name='person' size='100' color='white' />
      </View>

      <View style={authStyles.dividerContainer}>
        <Divider orientation="horizontal" color="#e9eef3" width={1} style={{ flex: 1 }} />
        <Text style={authStyles.orText}>Інформація</Text>
        <Divider orientation="horizontal" color="#e9eef3" width={1} style={{ flex: 1 }} />
      </View>
      
      <View style={{ borderWidth:1, borderRadius:15, borderColor:'#e9eef3', padding:15,  flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={{ fontSize:18, fontWeight:'bold'}}>Повне ім'я</Text>
        <Text style={{ fontSize:16, fontWeight:200}}>{userInfo ? userInfo.name : ''}</Text>
      </View>

      <View style={{ borderWidth:1, borderRadius:15, borderColor:'#e9eef3', padding:15, marginTop:15, flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={{ fontSize:18, fontWeight:'bold'}}>Пошта</Text>
        <Text style={{ fontSize:16, fontWeight:200}}>{userInfo ? userInfo.email : ''}</Text>
      </View>

      <View style={authStyles.dividerContainer}>
        <Divider orientation="horizontal" color="#e9eef3" width={1} style={{ flex: 1 }} />
        <Text style={authStyles.orText}>Налаштування</Text>
        <Divider orientation="horizontal" color="#e9eef3" width={1} style={{ flex: 1 }} />
      </View>

      <Button buttonStyle={{ borderRadius:15, padding:15, marginTop:15 }} color="error" title="Видалити аккаунт" onPress={confirmDelete} />
      <Button buttonStyle={{ borderRadius:15, padding:15, marginTop:15 }} color="error" title="Вийти" onPress={logout} />
    </View>
  );
}