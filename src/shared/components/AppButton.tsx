import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../core/theme/colors';
import { radius, spacing } from '../../core/theme/spacing';
import { typography } from '../../core/theme/typography';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  style,
}) => {
  const variantStyles: Record<ButtonVariant, { container: ViewStyle; text: TextStyle; iconColor: string }> = {
    primary: {
      container: { backgroundColor: colors.primary, borderColor: colors.primary },
      text: { color: colors.white },
      iconColor: colors.white,
    },
    secondary: {
      container: { backgroundColor: colors.secondary, borderColor: colors.secondary },
      text: { color: colors.white },
      iconColor: colors.white,
    },
    outline: {
      container: { backgroundColor: 'transparent', borderColor: colors.gray300 },
      text: { color: colors.textPrimary },
      iconColor: colors.textPrimary,
    },
    ghost: {
      container: { backgroundColor: 'transparent', borderColor: 'transparent' },
      text: { color: colors.textSecondary },
      iconColor: colors.textSecondary,
    },
    danger: {
      container: { backgroundColor: colors.error, borderColor: colors.error },
      text: { color: colors.white },
      iconColor: colors.white,
    },
  };

  const sizeStyles: Record<ButtonSize, { container: ViewStyle; text: TextStyle; iconSize: number }> = {
    sm: { container: { paddingVertical: 6, paddingHorizontal: spacing.md }, text: { fontSize: 12 }, iconSize: 15 },
    md: { container: { paddingVertical: 10, paddingHorizontal: spacing.lg }, text: { fontSize: 14 }, iconSize: 18 },
    lg: { container: { paddingVertical: 14, paddingHorizontal: spacing.xl }, text: { fontSize: 16 }, iconSize: 20 },
  };

  const currentVariant = variantStyles[variant];
  const currentSize = sizeStyles[size];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.base, currentVariant.container, currentSize.container, style]}
    >
      {icon && <Ionicons name={icon} size={currentSize.iconSize} color={currentVariant.iconColor} />}
      <Text style={[typography.button, currentVariant.text, currentSize.text]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    borderWidth: 1,
    gap: 6,
  },
});
