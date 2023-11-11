import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Paragraph, StyleSheet, Text } from "react-native";

export default function PerkBenefits() {
  return (
    <View >

      <View style={{ flexDirection: "row" }}>
        <Ionicons
          style={{ paddingHorizontal: 10 }}
          name="md-body-outline"
          size={24}
          color="black"
        />
        <Text style={styles.boldText}>Paid Sick Leave</Text> 
      </View>

      <View style={{ flexDirection: "row" }}>
        <Ionicons
          style={{ paddingHorizontal: 10 }}
          name="ios-heart-circle-outline"
          size={24}
          color="black"
        />
        <Text style={styles.boldText}>Paid Sick Leave</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Ionicons
          style={{ paddingHorizontal: 10 }}
          name="star-outline"
          size={24}
          color="black"
        />
        <Text style={styles.boldText}>Performance Bonus</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Ionicons
          style={{ paddingHorizontal: 10 }}
          name="people-circle"
          size={24}
          color="black"
        />
        <Text style={styles.boldText}>Family Leave</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Ionicons
          style={{ paddingHorizontal: 10 }}
          name="airplane-outline"
          size={24}
          color="black"
        />
        <Text style={styles.boldText}>Paid Holiday</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    }
});
  