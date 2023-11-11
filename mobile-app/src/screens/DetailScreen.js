import { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, ActivityIndicator } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Caption,
} from "react-native-paper";
import { gql, useQuery } from '@apollo/client'
import PerkBenefits from "../components/PerkBenefits";


const GET_JOB_BY_ID = gql`
query GetUsers($getJobId: Int!) {
  getJob(id: $getJobId) {
      title
      jobType
      description
      Skills {
        id
        name
        level
      }
      Company {
        id
        name
        companyLogo
        description
        email
        location
      }
      User {
        _id
        email
        username
        role
      }
    }
  }
`

export default function HomeScreen({ route }) {
    const { id } = route.params

    const {data, loading, error} = useQuery(GET_JOB_BY_ID, {
      variables: {
        getJobId: id
      }
    })

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

    const job = data.getJob

  return (
    <ScrollView>
    <View style={styles.container}>
    {job ? (
         <Card style={{ width: "95%", paddingVertical: '5%', marginVertical: '3%' }}>
         <View style={{ padding: 3 }}>
           <Card.Cover
             source={{
               uri: job?.Company?.companyLogo,
             }}
           />
         </View>
 
         <View>
           <Card.Content>
             <View
               style={{
                 flexDirection: "row",
                 justifyContent: "space-between",
                 width: "full",
               }}
             >
               <View>
                 <Title style={styles.boldText}>{job?.title}</Title>
               </View>
             </View>
             <Paragraph>{job?.Company?.name}</Paragraph>
             <Paragraph>{job?.Company?.location}</Paragraph>
             <Paragraph>Rp.7.000.000</Paragraph>
             <Paragraph>{job?.jobType}</Paragraph>
           </Card.Content>
         </View>
 
         <View style={{ flexDirection: "row" }}>
           <Card.Actions style={{ flexDirection: "column", alignItems: 'flex-start' }}>
             <Caption>Posted 3 days ago, ends in the month.</Caption>
             <Caption>
                Last seen 3 hours ago by {job?.User?.username}.
             </Caption>
           </Card.Actions>
         </View>
 
         <View
           style={{
             borderBottomColor: "black",
             borderBottomWidth: StyleSheet.hairlineWidth,
           }}
         />
 
         <View>
           <Card.Content>
             <View
               style={{
                 flexDirection: "row",
                 justifyContent: "space-between",
                 width: "full",
               }}
             >
               <View>
                 <Title style={styles.boldText}>Job Description</Title>
               </View>
             </View>
             <Paragraph style={styles.boldText}>For Direct Hiring</Paragraph>
             <Text style={styles.listItem}>• {job?.description} </Text>
 
             <Paragraph style={styles.boldText}>Qualifications</Paragraph>
             
             {job.Skills.map((job) => {
                return <Text key={job?.id} style={styles.listItem}>• {job?.name}</Text>
             })}
           </Card.Content>
         </View>
 
         <View
           style={{
             borderBottomColor: "black",
             borderBottomWidth: StyleSheet.hairlineWidth,
           }}
         />
 
         <View>
           <Card.Content>
             <View
               style={{
                 flexDirection: "row",
                 justifyContent: "space-between",
                 width: "full",
               }}
             >
               <View>
                 <Title style={styles.boldText}>Perks and Benefits</Title>
               </View>
             </View>
 
             {/* Perk Benefits */}
          <View>
            {/* <Text>HALOO</Text> */}
            <PerkBenefits />
          </View>

           </Card.Content>
         </View>
 
         <View
           style={{
             borderBottomColor: "black",
             borderBottomWidth: StyleSheet.hairlineWidth,
           }}
         />
 
         <View>
           <Card.Content>
             <View
               style={{
                 flexDirection: "row",
                 justifyContent: "space-between",
                 width: "full",
               }}
             >
               <View>
                 <Title style={styles.boldText}>Job Summary</Title>
               </View>
             </View>
             <Caption>Job Level</Caption>
             <Paragraph style={styles.boldText}>{job?.Skills[0]?.level}</Paragraph>
 
             <Caption>Industry</Caption>
             <Paragraph style={styles.boldText}>{job?.Company?.description}</Paragraph>
 
             <Caption>Job Category</Caption>
             <Paragraph style={styles.boldText}>{job?.Company?.name}</Paragraph>
 
             <Caption>Vacancy</Caption>
             <Paragraph style={styles.boldText}>99</Paragraph>
 
             <Caption>Education</Caption>
             <Paragraph style={styles.boldText}>
               Graduate from high school
             </Paragraph>
 
             <Caption>Website</Caption>
             <Paragraph style={styles.boldText}>{job?.Company?.email}</Paragraph>
 
             <Caption>Recruiter response to application</Caption>
             <Paragraph style={styles.boldText}>100% of all time</Paragraph>
 
             <Caption>Recruiter last seen</Caption>
             <Paragraph style={styles.boldText}>2 hours ago</Paragraph>
 
             <Caption>Office Address</Caption>
             <Paragraph style={styles.boldText}>{job?.Company?.location}</Paragraph>
           </Card.Content>
         </View>
       </Card>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
        </View>
      )}
     
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
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
  boldText: {
    fontWeight: "bold", // Set fontWeight to 'bold' to make text bold
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5, // Adjust the spacing between list items
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
