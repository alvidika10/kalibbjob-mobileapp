import {
  Card,
  Title,
  IconButton,
  Paragraph,
  Caption,
} from "react-native-paper";
import { View, Button} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CardList({ job }) {
  console.log(job, '<<<<<<<<< card List')
  const navigation = useNavigation();

  return (
    <View style={{paddingHorizontal: 10}}>
      <Card style={{ width: "100%", marginVertical: "3%" }}>
        <View style={{ padding: 20 }}>
          <Card.Cover
            source={{
              uri: job.Company.companyLogo,
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
                <Title>{job.title}</Title>
              </View>
              <View>
                <IconButton
                  icon="heart"
                  color="#FF5733"
                  onPress={() => console.log("Love icon pressed")}
                />
              </View>
            </View>
            <Paragraph>{job.Company.name}</Paragraph>
            <Paragraph>{job.Company.location}</Paragraph>
            <Paragraph>Rp.7.000.000</Paragraph>
          </Card.Content>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "full",
          }}
        >
          {/* <IconButton
            icon="currency-usd"
            color="#228B22"
            onPress={() => console.log("Money icon pressed")}
          /> */}
          <Card.Actions>
            {/* Additional content at the bottom */}
            {/* <Caption>Posted 3 days ago by {job.User.username}.</Caption> */}
          </Card.Actions>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Button
            title="To Detail"
            onPress={() => navigation.navigate("Detail", { id: job.id })}
          />
        </View>
      </Card>
    </View>
  );
}
