import { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Alert, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HabitInput } from '../src/components/HabitInput';
import { HabitCard } from '../src/components/HabitCard';
import { EmptyState } from '../src/components/EmptyState';
import { Habit } from '../src/types/habit';

const STORAGE_KEY = '@mindful_habits';

export default function HomeScreen() {
    const router = useRouter();
    const [habits, setHabits] = useState<Habit[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // 1️⃣ Load from storage on mount
    useEffect(() => {
        const load = async () => {
            try {
                const stored = await AsyncStorage.getItem(STORAGE_KEY);
                if (stored) setHabits(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to load habits:', e);
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);

    // 2️⃣ Save to storage whenever habits change
    useEffect(() => {
        if (!isLoading) {
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(habits)).catch(console.error);
        }
    }, [habits, isLoading]);

    const addHabit = useCallback(() => {
        const trimmed = input.trim();
        if (!trimmed) return;

        const newHabit: Habit = {
            id: Date.now().toString(),
            title: trimmed,
            completed: false,
            createdAt: new Date().toISOString(),
        };

        setHabits(prev => [newHabit, ...prev]);
        setInput('');
    }, [input]);

    const toggleHabit = useCallback((id: string) => {
        setHabits(prev => prev.map(h => (h.id === id ? { ...h, completed: !h.completed } : h)));
    }, []);

    const deleteHabit = useCallback((id: string) => {
        Alert.alert('Remove habit', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => setHabits(prev => prev.filter(h => h.id !== id)) },
        ]);
    }, []);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <HabitInput value={input} onChangeText={setInput} onSubmit={addHabit} />
                </View>

                <FlatList
                    data={habits}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={!isLoading ? <EmptyState /> : null}
                    renderItem={({ item }) => (
                        <HabitCard item={item} onToggle={toggleHabit} onDelete={deleteHabit} />
                    )}
                />

                <View style={styles.moodBtnWrapper}>
                    <HabitInput
                        value="📊 Log Mood"
                        onChangeText={() => {}}
                        onSubmit={() => router.push('/mood')}
                    />
                    {/* Quick hack to reuse button style, we'll refine this in Phase 3 */}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    content: { flex: 1, padding: 16 },
    headerRow: { marginBottom: 10 },
    list: { paddingBottom: 20 },
    moodBtnWrapper: { marginTop: 20 },
});