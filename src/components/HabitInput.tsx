import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    value: string;
    onChangeText: (text: string) => void;
    onSubmit: () => void;
}

export function HabitInput({ value, onChangeText, onSubmit }: Props) {
    const isValid = value.trim().length > 0;

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="e.g., Read 10 pages"
                value={value}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
                returnKeyType="done"
                clearButtonMode="while-editing"
            />
            <Pressable
                style={[styles.button, !isValid && styles.buttonDisabled]}
                onPress={onSubmit}
                disabled={!isValid}
            >
                <Ionicons name="add" size={24} color="white" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flexDirection: 'row', gap: 10, marginBottom: 20 },
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
    button: {
        backgroundColor: '#3b82f6',
        borderRadius: 12,
        width: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisabled: { opacity: 0.5 },
});