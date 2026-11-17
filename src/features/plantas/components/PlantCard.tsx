import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButtons } from '../../../shared/components/ActionButtons';
import { colors } from '../../../core/theme/colors';
import { radius, spacing } from '../../../core/theme/spacing';
import { typography } from '../../../core/theme/typography';

export interface PlantItem {
  id: number;
  nombre_comun: string;
  nombre_tecnico: string;
  especie_nombre: string;
  imagen?: string;
  stock_lotes: number;
  cantidad_total: number;
}

interface PlantCardProps {
  item: PlantItem;
  onView: (item: PlantItem) => void;
  onEdit: (item: PlantItem) => void;
  onDelete: (item: PlantItem) => void;
  onPreviewImage: (uri: string) => void;
}

export const PlantCard: React.FC<PlantCardProps> = ({
  item,
  onView,
  onEdit,
  onDelete,
  onPreviewImage,
}) => (
  <View style={styles.card}>
    {/* Miniatura o Placeholder */}
    {item.imagen ? (
      <TouchableOpacity onPress={() => onPreviewImage(item.imagen!)} activeOpacity={0.85}>
        <Image source={{ uri: item.imagen }} style={styles.thumb} />
      </TouchableOpacity>
    ) : (
      <View style={styles.thumbPlaceholder}>
        <Ionicons name="leaf" size={24} color={colors.gray400} />
      </View>
    )}

    {/* Datos principales */}
    <View style={styles.info}>
      <Text style={typography.h3} numberOfLines={1}>
        {item.nombre_comun}
      </Text>
      <Text style={styles.scientificName} numberOfLines={1}>
        {item.nombre_tecnico || 'Sin nombre técnico'}
      </Text>
      {item.especie_nombre ? (
        <View style={styles.speciesBadge}>
          <Text style={styles.speciesText}>{item.especie_nombre}</Text>
        </View>
      ) : null}
    </View>

    {/* Botones: Ver detalle, Editar, Eliminar */}
    <ActionButtons
      onView={() => onView(item)}
      onEdit={() => onEdit(item)}
      onDelete={() => onDelete(item)}
    />
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.gray200,
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  thumb: {
    width: 62,
    height: 62,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  thumbPlaceholder: {
    width: 62,
    height: 62,
    borderRadius: radius.md,
    backgroundColor: colors.gray100,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.gray300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1, gap: 2 },
  scientificName: { fontSize: 12, fontStyle: 'italic', color: colors.textSecondary },
  speciesBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(46, 125, 50, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
    marginTop: 2,
  },
  speciesText: { fontSize: 10, fontWeight: '600', color: colors.secondaryDark },
});
