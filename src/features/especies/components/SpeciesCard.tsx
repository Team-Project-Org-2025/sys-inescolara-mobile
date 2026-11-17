import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActionButtons } from '../../../shared/components/ActionButtons';
import { colors } from '../../../core/theme/colors';
import { radius, spacing } from '../../../core/theme/spacing';
import { typography } from '../../../core/theme/typography';

export interface SpeciesItem {
  id: number;
  nombre_especie: string;
  descripcion: string;
}

interface SpeciesCardProps {
  item: SpeciesItem;
  onEdit: (item: SpeciesItem) => void;
  onDelete: (item: SpeciesItem) => void;
}

export const SpeciesCard: React.FC<SpeciesCardProps> = ({ item, onEdit, onDelete }) => (
  <View style={styles.card}>
    <View style={styles.info}>
      <Text style={typography.h3}>{item.nombre_especie}</Text>
      <Text style={[typography.subtitle, { marginTop: 4 }]} numberOfLines={2}>
        {item.descripcion || '—'}
      </Text>
    </View>
    <ActionButtons onEdit={() => onEdit(item)} onDelete={() => onDelete(item)} />
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.gray200,
    marginBottom: spacing.md,
  },
  info: { flex: 1, paddingRight: spacing.md },
});
