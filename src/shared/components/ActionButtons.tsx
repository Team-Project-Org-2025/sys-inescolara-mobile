import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../core/theme/colors';
import { radius, spacing } from '../../core/theme/spacing';

interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onView, onEdit, onDelete }) => (
  <View style={styles.container}>
    {onView && (
      <TouchableOpacity style={[styles.btn, styles.viewBtn]} onPress={onView} activeOpacity={0.7}>
        <Ionicons name="eye-outline" size={16} color={colors.info} />
      </TouchableOpacity>
    )}
    {onEdit && (
      <TouchableOpacity style={[styles.btn, styles.editBtn]} onPress={onEdit} activeOpacity={0.7}>
        <Ionicons name="pencil" size={16} color={colors.primaryDark} />
      </TouchableOpacity>
    )}
    {onDelete && (
      <TouchableOpacity style={[styles.btn, styles.deleteBtn]} onPress={onDelete} activeOpacity={0.7}>
        <Ionicons name="trash-outline" size={16} color={colors.error} />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: 6 },
  btn: {
    width: 34,
    height: 34,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  viewBtn: {
    borderColor: colors.info,
    backgroundColor: 'rgba(14, 165, 233, 0.1)',
  },
  editBtn: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(229, 168, 53, 0.12)',
  },
  deleteBtn: {
    borderColor: colors.error,
    backgroundColor: 'rgba(220, 38, 38, 0.08)',
  },
});
