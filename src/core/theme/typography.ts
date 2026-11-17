import { TextStyle } from 'react-native';
import { colors } from './colors';

export const typography: Record<string, TextStyle> = {
  h1: { fontSize: 22, fontWeight: '700', color: colors.textPrimary },
  h2: { fontSize: 18, fontWeight: '600', color: colors.textPrimary },
  h3: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  subtitle: { fontSize: 13, fontWeight: '400', color: colors.textSecondary },
  body: { fontSize: 14, fontWeight: '400', color: colors.textPrimary },
  caption: { fontSize: 12, fontWeight: '500', color: colors.textMuted },
  button: { fontSize: 14, fontWeight: '600' },
};
