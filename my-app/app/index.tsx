import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import {
  changeLanguage,
  SUPPORTED_LANGUAGES,
  type LanguageCode,
} from '@/lib/i18n';

export default function HomeScreen() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as LanguageCode;

  const handleSelectLanguage = async (code: LanguageCode) => {
    await changeLanguage(code);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{t('greeting')}</Text>

      <Text style={styles.currentLanguage}>
        {t('currentLanguage', { lang: currentLang.toUpperCase() })}
      </Text>

      <Text style={styles.sectionTitle}>{t('selectLanguage')}</Text>

      <View style={styles.buttonRow}>
        {SUPPORTED_LANGUAGES.map(({ code, label }) => {
          const isActive = currentLang === code;
          return (
            <TouchableOpacity
              key={code}
              style={[styles.langButton, isActive && styles.langButtonActive]}
              onPress={() => handleSelectLanguage(code)}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Text
                style={[styles.langButtonText, isActive && styles.langButtonTextActive]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  currentLanguage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  langButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#ccc',
  },
  langButtonActive: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  langButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  langButtonTextActive: {
    color: '#fff',
  },
});
