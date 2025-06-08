import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, Alert, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';

export default function ResultScreen({ route }) { 
  const navigation = useNavigation();
  const photoUri = route.params?.photoUri;
  const { authToken } = useContext(AuthContext);
  const [tab, setTab] = useState('overview');

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  function renderRich(text) {
    const regex = /\*\*(.*?)\*\*/g;
    const out = [];
    let last = 0;
    let m;
    while ((m = regex.exec(text))) {
      if (m.index > last) {
        out.push(<Text key={last}>{text.slice(last, m.index)}</Text>);
      }
      out.push(
        <Text key={m.index} style={{fontWeight:'bold'}}>
          {m[1]}
        </Text>
      );
      last = regex.lastIndex;
    }
    if (last < text.length) out.push(<Text key={last}>{text.slice(last)}</Text>);
    return out;
  }


  useEffect(() => {
    const fetchResult = async () => {
      try {

        const formData = new FormData();
        formData.append('file', {
          uri: photoUri,
          name: 'photo.jpg',
          type: 'image/jpeg',
        });

        const response = await fetch('https://mycropvision.loca.lt/predict', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        });

        if (response.status === 404) {
          Alert.alert("Об'єкт не виявлено");
          navigation.popToTop(); 
          return;
        }
        if (!response.ok) {
          throw new Error('Помилка запиту');
        }

        const data = await response.json();
        console.log(data.confidence);
        setResult({
          cropName: data.crop_name,
          cropDescription: data.crop_description,
          diseaseName: data.disease_name,
          diseaseDescription: data.disease_description,
          careDescription: data.care_description,
          confidence: (data.confidence * 100).toFixed(1),
        });
      } catch (error) {
        navigation.popToTop();
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!result) return null;

  return (
    <ScrollView style={{ flex: 1, padding:16, backgroundColor: 'white' }}>
      {photoUri ? (
        <View style={{ shadowOffset:{width:0, height:5}, shadowOpacity:0.2, shadowColor:'#000', shadowRadius:5 }}>
          <Image 
            source={{ uri: photoUri }} 
            style={{ width: '100%', height: 200, marginBottom: 15, borderRadius: 15 }} 
            resizeMode="cover" 
          />
        </View>
       
      ) : (
        <Text style={{ textAlign: 'center', margin: 8 }}>[Фото рослини]</Text>
      )}
      <View style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
          {result.cropName}
        </Text>
        <Text style={{ backgroundColor: '#E3F1D7', paddingHorizontal:10, paddingVertical:5, borderRadius:15, alignSelf:'center', marginBottom:15, color:'#385025'}}>
          {result.confidence}% збіг
        </Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16, gap:5 }}>
        <TouchableOpacity style={{ backgroundColor: tab === 'overview' ? '#E3F1D7' : '#f1f5f9', flex:1, alignItems:'center', paddingVertical:12, borderRadius:15 }} onPress={() => setTab('overview')}>
          <Text style={{ color: tab === 'overview' ? '#385025' : 'black' }}>Огляд</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: tab === 'health' ? '#E3F1D7' : '#f1f5f9', flex:1, alignItems:'center', paddingVertical:12, borderRadius:15 }} onPress={() => setTab('health')}>
          <Text style={{ color: tab === 'health' ? '#385025' : 'black' }}>Стан</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: tab === 'care' ? '#E3F1D7' : '#f1f5f9', flex:1, alignItems:'center', paddingVertical:12, borderRadius:15 }} onPress={() => setTab('care')}>
          <Text style={{ color: tab === 'care' ? '#385025' : 'black' }}>Догляд</Text>
        </TouchableOpacity>
      </View>

      {tab === 'overview' && (
        <Text style={{ borderColor:'#e4e9f1', borderRadius:15, borderWidth:1, padding:10, textAlign:'justify', lineHeight:20, marginBottom:25 }}>{result.cropDescription}</Text>
      )}
      {tab === 'health' && (
        <View style={{ gap:10 }}>
          <Text style={{ borderColor:'red', borderRadius:15, borderWidth:1, padding:10, textAlign:'center', fontSize:16, fontWeight:600 }}>{result.diseaseName}</Text>
          <Text style={{ borderColor:'#e4e9f1', borderRadius:15, borderWidth:1, padding:10, textAlign:'justify', lineHeight:20, marginBottom:25}}>{result.diseaseDescription}</Text>
        </View>
      )}
      {tab === 'care' && (
        <Text style={{ borderColor:'#e4e9f1', borderRadius:15, borderWidth:1, padding:10, textAlign:'justify', lineHeight:20, marginBottom:25 }}>{renderRich(result.careDescription)}</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  container: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 16,
    fontWeight: '600',
  },
  text: {
    marginTop: 8,
    lineHeight: 20,
  },
});
