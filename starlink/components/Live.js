import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Button, Image } from 'react-native';
import { WebView } from 'react-native-webview';



class Live extends React.Component {
  Navigation = (Route) => {
    const { navigation } = this.props;
    console.log('salut')
    navigation.push(Route)
  }
  render() {
    return (
      <View style={{ height: '100%'}}>
      <View style={{zIndex:0,
    position: "absolute",
    width: "100%",
    height:"100%"}}>
           <WebView
    style={{height:"20%", zIndex: 0}}
    javaScriptEnabled={true}
    source={{uri: 'https://www.youtube.com/embed/iBmUjyHla3U?rel=0&autoplay=0&showinfo=0&controls=0'}}
/>
<WebView
 style={{height:"20%", zIndex: 0}}    javaScriptEnabled={true}
    source={{uri: 'https://www.youtube.com/embed/DDU-rZs-Ic4?rel=0&autoplay=0&showinfo=0&controls=0'}}
/>
<WebView
 style={{height:"20%", zIndex: 0}}    javaScriptEnabled={true}
    source={{uri: 'https://www.youtube.com/embed/86YLFOog4GM?rel=0&autoplay=0&showinfo=0&controls=0'}}
/>
</View>

      </View>
    )
  }
}
const styles = StyleSheet.create({
 
  
 })
export default Live