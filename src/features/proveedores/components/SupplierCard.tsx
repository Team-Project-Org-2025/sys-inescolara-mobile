import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButtons } from '../../../shared/components/ActionButtons';
import { colors } from '../../../core/theme/colors';
import { radius, spacing } from '../../../core/theme/spacing';
import { typography } from '../../../core/theme/typography';

export interface SupplierItem {
  id: number;
  nombre_proveedor: string;
  rif_proveedor: string;
  contacto_vendedor: string;
  telefono_proveedor: string;
}

interface SupplierCardProps {
  item: SupplierItem;
  onEdit: (item: SupplierItem) => void;
  onDelete: (item: SupplierItem) => void;
}

export const SupplierCard: React.FC<SupplierCardProps> = ({ item, onEdit, onDelete }) => (
  <View style={styles.card}>
    <View style={styles.info}>
      <View style={styles.headerRow}>
        <Text style={[typography.h3, { flexShrink: 1 }]} numberOfLines={1}>
          {item.nombre_proveedor}
        </Text>
        {item.rif_proveedor ? (
          <View style={styles.rifBadge}>
            <Text style={styles.rifText}>{item.rif_proveedor}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.metaRow}>
        <Ionicons name="person-outline" size={14} color={colors.textSecondary} />
        <Text style={typography.subtitle}>
          {item.contacto_vendedor || 'Sin contacto asignado'}
        </Text>
      </View>

      <View style={styles.metaRow}>
        <Ionicons name="call-outline" size={14} color={colors.textSecondary} />
        <Text style={typography.subtitle}>
          {item.telefono_proveedor || 'Sin teléfono'}
        </Text>
      </View>
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
  info: {
    flex: 1,
    paddingRight: spacing.md,
    gap: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: 2,
  },
  rifBadge: {
    backgroundColor: 'rgba(46, 125, 50, 0.12)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  rifText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.secondaryDark,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
