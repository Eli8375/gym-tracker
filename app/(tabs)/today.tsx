import { StyleSheet, Text, View } from "react-native";

export default function TodayScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Workout</Text>
      <Text>This will show your current workout.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 16
},
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12
},
});
