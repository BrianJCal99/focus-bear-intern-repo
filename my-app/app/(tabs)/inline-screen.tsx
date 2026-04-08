import { Text, TouchableOpacity, View } from 'react-native';

function ProfileCard() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
      }}>
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: '#48bb78',
        }}
      />
      <View>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#1a202c' }}>John Smith</Text>
        <Text style={{ fontSize: 13, color: '#718096', marginTop: 2 }}>Mobile UI Designer</Text>
      </View>
    </View>
  );
}

function ActionButton() {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#48bb78',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
      }}>
      <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '600' }}>Follow</Text>
    </TouchableOpacity>
  );
}

export default function InlineScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f4f8',
        gap: 16,
        padding: 24,
      }}>
      <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8, color: '#1a202c' }}>
        Inline Styles
      </Text>
      <ProfileCard />
      <ActionButton />
    </View>
  );
}
