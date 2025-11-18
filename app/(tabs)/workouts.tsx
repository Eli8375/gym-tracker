import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { searchExercises } from "../../constants/api";

export default function WorkoutsScreen() {
  const [name, setName] = useState("");
  const [muscle, setMuscle] = useState("chest");
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exercises, setExercises] = useState<any[]>([]);

  async function handleSearch() {
    setLoading(true);
    setError(null);
    try {
      const data = await searchExercises({
        name: name.trim() || undefined,
        muscle: muscle.trim() || undefined,
        difficulty: difficulty.trim() || undefined,
      });
      setExercises(data);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleSearch(); // initial load
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Exercises</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder='Name (e.g. "press")'
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        value={muscle}
        onChangeText={setMuscle}
        placeholder="Muscle (e.g. chest, biceps, quads)"
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        value={difficulty}
        onChangeText={setDifficulty}
        placeholder='Difficulty (beginner / intermediate / advanced)'
        style={styles.input}
        autoCapitalize="none"
      />

      <Button title="Search" onPress={handleSearch} />

      {loading && <ActivityIndicator style={{ marginTop: 16 }} />}

      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        style={{ marginTop: 16 }}
        data={exercises}
        keyExtractor={(item) => item.name + item.muscle}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.meta}>
              Type: {item.type} | Muscle: {item.muscle} | Equipment: {item.equipment} | Difficulty:{" "}
              {item.difficulty}
            </Text>
            <Text style={styles.instructions}>{item.instructions}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
  },
  error: { color: "red", marginTop: 8 },
  card: {
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
  },
  exerciseName: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  meta: { fontSize: 12, color: "#555", marginBottom: 4 },
  instructions: { fontSize: 12, color: "#333" },
});
