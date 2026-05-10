import { Text, StyleSheet } from 'react-native';

export function EmptyState() {
    return (
        <Text style={styles.text}>No habits yet. Start small 🌱</Text>
    );
}

const styles = StyleSheet.create({
    text: { textAlign: 'center', marginTop: 60, color: '#94a3b8', fontSize: 16 },
});