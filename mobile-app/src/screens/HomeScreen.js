import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator, Button, ScrollView, FlatList } from "react-native";
import CardList from "../components/CardList";
import {
  Card,
  Title,
  IconButton,
  Paragraph,
  Caption,
} from "react-native-paper";
import { gql, useQuery } from '@apollo/client'
import Banner from "../components/Banner";

const GET_JOBS = gql`
  query GetJobs {
    getJobs {
      id
      mongo_id
      title
      jobType
      description
      Company {
        name
        companyLogo
        location
      }
    }
  }
`

export default function HomeScreen({ navigation }) {
  const {data, loading, error} = useQuery(GET_JOBS)

  if (loading) {
    return <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#3498db" />
    </View>
  }

  if (error) {
    return <View>
      <Text style={{ color: 'red' }}>An error occurred: Error in page !!</Text>
    </View>
  }

  const job = data.getJobs

  return (
      <View style={styles.container}>

    
      <FlatList
        ListHeaderComponent={Banner}
        data={job}
        renderItem={({ item }) => {
          return <CardList job={item}/>
        }}
        keyExtractor={(item) => item.id} 
      />

      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    alignItems: "center", // Center the title horizontally
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end", // Align icons to the right
    marginRight: 16, // Adjust margin as needed
  },
});
