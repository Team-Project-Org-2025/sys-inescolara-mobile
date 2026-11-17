import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButtons } from '../../../shared/components/ActionButtons';
import { colors } from '../../../core/theme/colors';
import { radius, spacing } from '../../../core/theme/spacing';
import { typography } from '../../../core/theme/typography';

export interface UserItem {
  id: number;
  nombre_usuario: string;
  correo_electronico: string;
  rol_id: number;
  nombre_rol: string;
  nombre_trabajador: string;
  apellido_trabajador: string;
  cedula_trabajador: string;
  telefono_trabajador: string;
  cargo: string;
  avatar?: string;
  permisos: string[]; // formato "modulo:accion" ej: "plantas:ver"
}

interface UserCardProps {
  item: UserItem;
  onEdit: (item: UserItem) => void;
  onDelete: (item: UserItem) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ item, onEdit, onDelete }) => {
  const isSuper = item.id === 1 || item.rol_id === 1;
  const workerFullName = `${item.nombre_trabajador} ${item.apellido_trabajador}`.trim();

  return (
    <View style={styles.card}>
      {/* Avatar */}
      {item.avatar ? (
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatarFallback, isSuper && styles.avatarFallbackSuper]}>
          <Text style={[styles.avatarInitial, isSuper && { color: colors.black }]}>
            {item.nombre_usuario.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}

      {/* Información del usuario y trabajador */}
      <View style={styles.info}>
        <View style={styles.headerRow}>
          <Text style={typography.h3} numberOfLines={1}>
            {item.nombre_usuario}
          </Text>
          <View style={[styles.roleBadge, isSuper ? styles.roleSuper : styles.roleNormal]}>
            <Text style={[styles.roleText, isSuper ? styles.roleTextSuper : styles.roleTextNormal]}>
              {item.nombre_rol}
            </Text>
          </View>
        </View>

        {item.correo_electronico ? (
          <View style={styles.metaRow}>
            <Ionicons name="mail-outline" size={13} color={colors.textSecondary} />
            <Text style={typography.subtitle} numberOfLines={1}>
              {item.correo_electronico}
            </Text>
          </View>
        ) : null}

        {workerFullName ? (
          <View style={styles.metaRow}>
            <Ionicons name="id-card-outline" size={13} color={colors.textSecondary} />
            <Text style={typography.subtitle} numberOfLines={1}>
              {workerFullName} {item.cargo ? `• ${item.cargo}` : ''}
            </Text>
          </View>
        ) : null}
      </View>

      {/* El superusuario (id === 1) no se puede eliminar */}
      <ActionButtons
        onEdit={() => onEdit(item)}
        onDelete={item.id !== 1 ? () => onDelete(item) : undefined}
      />
    </View>
  );
};

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
  avatar: {
    width: 46,
    height: 46,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  avatarFallback: {
    width: 46,
    height: 46,
    borderRadius: radius.full,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarFallbackSuper: {
    backgroundColor: colors.primary,
  },
  avatarInitial: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  info: { flex: 1, gap: 3 },
  headerRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6 },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  roleSuper: { backgroundColor: 'rgba(229, 168, 53, 0.2)' },
  roleNormal: { backgroundColor: 'rgba(46, 125, 50, 0.12)' },
  roleText: { fontSize: 10, fontWeight: '700' },
  roleTextSuper: { color: colors.primaryDark },
  roleTextNormal: { color: colors.secondaryDark },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
});
