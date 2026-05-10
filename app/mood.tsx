import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const MOODS = ['😔', '😕', '😐', '🙂', '😊'];

export default function MoodScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>How are you feeling today?</Text>
            <View style={styles.grid}>
                {MOODS.map((mood) => (
                    <Pressable
                        key={mood}
                        style={styles.moodBtn}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.emoji}>{mood}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc', padding: 20, justifyContent: 'center' },
    title: { fontSize: 22, fontWeight: '600', textAlign: 'center', marginBottom: 30, color: '#1e293b' },
    grid: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 },
    moodBtn: {
        width: 60,
        height: 60,
        backgroundColor: 'white',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    emoji: { fontSize: 28 },
});