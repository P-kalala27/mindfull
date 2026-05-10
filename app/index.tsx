import {useState}   from "react";
import {Habit} from "../src/types/habit";
import {Alert, View, StyleSheet, TextInput, Pressable, FlatList, Text} from "react-native";
import {Ionicons} from "@expo/vector-icons";




export default function HomeScreen() {
    const [habit, setHabit] = useState<Habit[]>([]);
    const [input, setInput] = useState("");

    const addHabit = () => {
        const trimmed = input.trim();
        if(!trimmed) return;

        const newHabit : Habit = {
            id: Date.now().toString(),
            title: trimmed,
            completed: false,
            createdAt: new Date().toISOString(),
        }

        setHabit(prev => [newHabit, ...prev]);
        setInput("");
    }

    const toggleHabit = (id: string) => {
        setHabit(prev => prev.map(h => (h.id === id ? {...h, completed: !h.completed}: h)
        )
        )
    }

    const deleteHabit = (id: string) => {
        Alert.alert('Remove habit', 'Are you sure?', [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Delete', style: 'destructive', onPress: () => setHabit(prev => prev.filter(h => h.id
                !== id))}
        ]);
    }

    return(
        <View style={styles.container}>
            <View style={styles.inputRow}>
                <TextInput
                style={styles.input}
                placeholder='e.g., read 10 pages'
                value={input}
                onChangeText={setInput}
                onSubmitEditing={addHabit}
                returnKeyType="done"
                clearButtonMode="while-editing"
                />
                <Pressable style={styles.addButton} onPress={addHabit} disabled={!input.trim()}>
                    <Ionicons name="add" size={24} color="#fff" />
                </Pressable>
            </View>
            <FlatList
                data={habit}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No habits yet. Start small 🌱</Text>
                }
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Pressable onPress={() => toggleHabit(item.id)} style={styles.checkbox}>
                            <Ionicons
                                name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
                                size={24}
                                color={item.completed ? '#10b981' : '#94a3b8'}
                            />
                        </Pressable>

                        <Text style={[styles.title, item.completed && styles.completed]}>
                            {item.title}
                        </Text>

                        <Pressable onPress={() => deleteHabit(item.id)} style={styles.deleteBtn}>
                            <Ionicons name="trash-outline" size={20} color="#ef4444" />
                        </Pressable>
                    </View>
                )}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
    inputRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
    input: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#3b82f6',
        borderRadius: 12,
        width: 48,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
    },
    list: { paddingBottom: 40 },
    emptyText: { textAlign: 'center', marginTop: 60, color: '#94a3b8', fontSize: 16 },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 14,
        borderRadius: 12,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    checkbox: { marginRight: 12 },
    title: { flex: 1, fontSize: 16, fontWeight: '500', color: '#1e293b' },
    completed: { textDecorationLine: 'line-through', color: '#94a3b8' },
    deleteBtn: { padding: 6 },
});