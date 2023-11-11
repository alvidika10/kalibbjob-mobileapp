import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Banner() {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}>Kalibjobb</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#1e90ff",
    padding: 10, 
    borderTopWidth: 2, 
    borderTopColor: "#1e90ff", 
  },
  bannerText: {
    color: "white", 
    fontSize: 16, 
    fontWeight: "bold", 
  },
});
