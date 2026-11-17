import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButtons } from '../../../shared/components/ActionButtons';
import { colors } from '../../../core/theme/colors';
import { radius, spacing } from '../../../core/theme/spacing';
import { typography } from '../../../core/theme/typography';

export interface ClientItem {
  id: number;
  tipo_cedula_cliente: string;
  cedula_cliente: string;
  nombre_cliente: string;
  apellido_cliente: string;
  contacto_cliente: string;
}

interface ClientCardProps {
  item: ClientItem;
  onEdit: (item: ClientItem) => void;
  onDelete: (item: ClientItem) => void;
}

export const ClientCard: React.FC<ClientCardProps> = ({ item, onEdit, onDelete }) => {
  const fullName = `${item.nombre_cliente} ${item.apellido_cliente || ''}`.trim();
  const cedula =
    item.tipo_cedula_cliente && item.cedula_cliente
      ? `${item.tipo_cedula_cliente}-${item.cedula_cliente}`
      : item.cedula_cliente || '';

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <View style={styles.headerRow}>
          <Text style={[typography.h3, { flexShrink: 1 }]} numberOfLines={1}>
            {fullName}
          </Text>
          {cedula ? (
            <View style={styles.ciBadge}>
              <Text style={styles.ciText}>{cedula}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.metaRow}>
          <Ionicons name="call-outline" size={14} color={colors.textSecondary} />
          <Text style={typography.subtitle}>
            {item.contacto_cliente || 'Sin teléfono registrado'}
          </Text>
        </View>
      </View>

      <ActionButtons onEdit={() => onEdit(item)} onDelete={() => onDelete(item)} />
    </View>
  );
};

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
  info: { flex: 1, paddingRight: spacing.md, gap: 4 },
  headerRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: spacing.sm },
  ciBadge: {
    backgroundColor: 'rgba(229, 168, 53, 0.16)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  ciText: { fontSize: 11, fontWeight: '700', color: colors.primaryDark },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});
