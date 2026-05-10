import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Habit } from '../types/habit';

interface Props {
    item: Habit;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export function HabitCard({ item, onToggle, onDelete }: Props) {
    return (
        <View style={styles.card}>
            <Pressable onPress={() => onToggle(item.id)} style={styles.checkbox}>
                <Ionicons
                    name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
                    size={24}
                    color={item.completed ? '#10b981' : '#94a3b8'}
                />
            </Pressable>

            <Text style={[styles.title, item.completed && styles.completed]}>
                {item.title}
            </Text>

            <Pressable onPress={() => onDelete(item.id)} style={styles.deleteBtn}>
                <Ionicons name="trash-outline" size={20} color="#ef4444" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
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