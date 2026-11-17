import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FormModal } from '../../../shared/components/FormModal';
import { UserItem } from './UserCard';
import { colors } from '../../../core/theme/colors';
import { radius, spacing } from '../../../core/theme/spacing';
import { typography } from '../../../core/theme/typography';

const ROLES = [
  { id: 1, nombre: 'Administrador' },
  { id: 2, nombre: 'Operador Vivero' },
  { id: 3, nombre: 'Vendedor' },
];

const PERMISOS_MODULOS = ['Especies', 'Plantas', 'Proveedores', 'Clientes', 'Usuarios'];
const PERMISOS_ACCIONES = ['Ver', 'Crear', 'Editar', 'Eliminar'];

/* 1. MODAL AGREGAR / EDITAR USUARIO */
interface UserFormModalProps {
  visible: boolean;
  initialData: UserItem | null;
  onClose: () => void;
  onSubmit: (data: Omit<UserItem, 'id'>) => void;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
  visible,
  initialData,
  onClose,
  onSubmit,
}) => {
  const isSuper = initialData?.id === 1;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rolId, setRolId] = useState(2);
  const [nombreTrab, setNombreTrab] = useState('');
  const [apellidoTrab, setApellidoTrab] = useState('');
  const [cedulaTrab, setCedulaTrab] = useState('');
  const [telefonoTrab, setTelefonoTrab] = useState('');
  const [cargo, setCargo] = useState('');
  const [permisos, setPermisos] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (visible) {
      setUsername(initialData?.nombre_usuario || '');
      setEmail(initialData?.correo_electronico || '');
      setPassword('');
      setRolId(initialData?.rol_id || 2);
      setNombreTrab(initialData?.nombre_trabajador || '');
      setApellidoTrab(initialData?.apellido_trabajador || '');
      setCedulaTrab(initialData?.cedula_trabajador || '');
      setTelefonoTrab(initialData?.telefono_trabajador || '');
      setCargo(initialData?.cargo || '');
      setPermisos(initialData?.permisos || ['Especies:Ver', 'Plantas:Ver']);
      setError('');
    }
  }, [visible, initialData]);

  const togglePermiso = (key: string) => {
    setPermisos((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  const handleSave = () => {
    if (!username.trim()) {
      setError('El nombre de usuario es obligatorio.');
      return;
    }
    if (!initialData && !password.trim()) {
      setError('La contraseña es obligatoria para nuevos usuarios.');
      return;
    }

    const selectedRole = ROLES.find((r) => r.id === rolId);
    onSubmit({
      nombre_usuario: username.trim(),
      correo_electronico: email.trim(),
      rol_id: rolId,
      nombre_rol: selectedRole?.nombre || 'Operador',
      nombre_trabajador: nombreTrab.trim(),
      apellido_trabajador: apellidoTrab.trim(),
      cedula_trabajador: cedulaTrab.trim(),
      telefono_trabajador: telefonoTrab.trim(),
      cargo: cargo.trim(),
      avatar: initialData?.avatar,
      permisos: rolId === 1 ? [] : permisos,
    });
  };

  return (
    <FormModal
      visible={visible}
      title={initialData ? 'Editar Usuario' : 'Agregar Usuario'}
      saveText={initialData ? 'Actualizar' : 'Guardar'}
      onClose={onClose}
      onSave={handleSave}
    >
      {/* Cuenta */}
      <Text style={styles.sectionTitle}>DATOS DE ACCESO</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre de Usuario *</Text>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          value={username}
          onChangeText={(t) => {
            setUsername(t);
            if (error) setError('');
          }}
          placeholder="Ej: jperez"
          placeholderTextColor={colors.textMuted}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="usuario@inecolara.gob.ve"
          placeholderTextColor={colors.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>
          {initialData ? 'Nueva Contraseña (Opcional)' : 'Contraseña *'}
        </Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder={initialData ? 'Dejar en blanco para mantener' : '••••••••'}
          placeholderTextColor={colors.textMuted}
          secureTextEntry
        />
      </View>

      {error ? <Text style={[styles.errorText, { marginBottom: 12 }]}>{error}</Text> : null}

      {/* Selector de Rol */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Rol del Sistema</Text>
        <View style={styles.roleChips}>
          {ROLES.map((r) => {
            const active = rolId === r.id;
            return (
              <TouchableOpacity
                key={r.id}
                disabled={isSuper}
                style={[
                  styles.roleChip,
                  active && styles.roleChipActive,
                  isSuper && { opacity: 0.6 },
                ]}
                onPress={() => setRolId(r.id)}
              >
                <Text style={[styles.roleChipText, active && styles.roleChipTextActive]}>
                  {r.nombre}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {isSuper && (
          <Text style={styles.helperText}>El rol del superusuario no se puede modificar.</Text>
        )}
      </View>

      {/* Matriz de Permisos (visible solo si rolId !== 1, igual que togglePermisosChecklist) */}
      {rolId !== 1 && (
        <View style={styles.formGroup}>
          <Text style={styles.label}>Módulos y acciones permitidas</Text>
          <View style={styles.matrixBox}>
            {/* Cabecera Matriz */}
            <View style={styles.matrixHeader}>
              <Text style={[styles.matrixColHeader, { flex: 1.4, textAlign: 'left' }]}>
                Módulo
              </Text>
              {PERMISOS_ACCIONES.map((acc) => (
                <Text key={acc} style={styles.matrixColHeader}>
                  {acc}
                </Text>
              ))}
            </View>

            {/* Filas */}
            {PERMISOS_MODULOS.map((mod) => (
              <View key={mod} style={styles.matrixRow}>
                <Text style={styles.matrixModName}>{mod}</Text>
                {PERMISOS_ACCIONES.map((acc) => {
                  const key = `${mod}:${acc}`;
                  const checked = permisos.includes(key);
                  return (
                    <TouchableOpacity
                      key={acc}
                      style={styles.matrixCell}
                      onPress={() => togglePermiso(key)}
                    >
                      <Ionicons
                        name={checked ? 'checkbox' : 'square-outline'}
                        size={20}
                        color={checked ? colors.secondary : colors.gray400}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Datos del Trabajador vinculado */}
      <Text style={[styles.sectionTitle, { marginTop: spacing.sm }]}>DATOS DEL TRABAJADOR</Text>

      <View style={styles.row2}>
        <View style={[styles.formGroup, { flex: 1 }]}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={nombreTrab}
            onChangeText={setNombreTrab}
            placeholder="Nombre"
            placeholderTextColor={colors.textMuted}
          />
        </View>
        <View style={[styles.formGroup, { flex: 1 }]}>
          <Text style={styles.label}>Apellido</Text>
          <TextInput
            style={styles.input}
            value={apellidoTrab}
            onChangeText={setApellidoTrab}
            placeholder="Apellido"
            placeholderTextColor={colors.textMuted}
          />
        </View>
      </View>

      <View style={styles.row2}>
        <View style={[styles.formGroup, { flex: 1 }]}>
          <Text style={styles.label}>Cédula</Text>
          <TextInput
            style={styles.input}
            value={cedulaTrab}
            onChangeText={setCedulaTrab}
            placeholder="V-12345678"
            placeholderTextColor={colors.textMuted}
          />
        </View>
        <View style={[styles.formGroup, { flex: 1 }]}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            value={telefonoTrab}
            onChangeText={setTelefonoTrab}
            placeholder="0412-0000000"
            placeholderTextColor={colors.textMuted}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Cargo</Text>
        <TextInput
          style={styles.input}
          value={cargo}
          onChangeText={setCargo}
          placeholder="Ej: Técnico Agrónomo / Coordinador"
          placeholderTextColor={colors.textMuted}
        />
      </View>
    </FormModal>
  );
};

/* 2. MODAL CONFIRMACIÓN DE ELIMINACIÓN CON CONTRASEÑA (Swal.fire en usuarios.js) */
interface DeleteUserModalProps {
  user: UserItem | null;
  onClose: () => void;
  onConfirmDelete: (id: number) => void;
}

export const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  user,
  onClose,
  onConfirmDelete,
}) => {
  const [authPassword, setAuthPassword] = useState('');
  const [pwError, setPwError] = useState('');

  useEffect(() => {
    if (user) {
      setAuthPassword('');
      setPwError('');
    }
  }, [user]);

  if (!user) return null;

  const handleConfirm = () => {
    if (!authPassword.trim()) {
      setPwError('Debes ingresar tu contraseña para autorizar.');
      return;
    }
    onConfirmDelete(user.id);
    onClose();
  };

  return (
    <Modal visible={!!user} transparent statusBarTranslucent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.confirmCard}>
          <View style={styles.warningIconCircle}>
            <Ionicons name="warning-outline" size={32} color={colors.error} />
          </View>
          <Text style={[typography.h2, { textAlign: 'center' }]}>¿Eliminar usuario?</Text>
          <Text style={[typography.subtitle, { textAlign: 'center', marginTop: 6 }]}>
            ¿Deseas eliminar a <Text style={{ fontWeight: '700' }}>{user.nombre_usuario}</Text>? Esta acción no se puede deshacer.
          </Text>

          <View style={{ width: '100%', marginTop: spacing.lg }}>
            <Text style={styles.label}>Ingresa la contraseña de tu usuario:</Text>
            <TextInput
              style={[styles.input, pwError ? styles.inputError : null]}
              value={authPassword}
              onChangeText={(t) => {
                setAuthPassword(t);
                if (pwError) setPwError('');
              }}
              placeholder="Contraseña de autorización"
              placeholderTextColor={colors.textMuted}
              secureTextEntry
            />
            {pwError ? <Text style={styles.errorText}>{pwError}</Text> : null}
          </View>

          <View style={styles.confirmActions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={{ color: colors.textSecondary, fontWeight: '600' }}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dangerBtn} onPress={handleConfirm}>
              <Text style={{ color: colors.white, fontWeight: '600' }}>Sí, eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.secondaryDark,
    letterSpacing: 0.8,
    marginBottom: spacing.md,
  },
  formGroup: { marginBottom: spacing.md },
  row2: { flexDirection: 'row', gap: spacing.sm },
  label: { fontSize: 13, fontWeight: '500', color: colors.textPrimary, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 14,
    color: colors.textPrimary,
    backgroundColor: colors.white,
  },
  inputError: { borderColor: colors.error },
  errorText: { color: colors.error, fontSize: 12, marginTop: 4 },
  helperText: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
  roleChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  roleChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.gray300,
    backgroundColor: colors.bgSecondary,
  },
  roleChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  roleChipText: { fontSize: 12, fontWeight: '600', color: colors.textSecondary },
  roleChipTextActive: { color: colors.black },

  // Matriz de permisos
  matrixBox: {
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: radius.md,
    backgroundColor: colors.bgSecondary,
    overflow: 'hidden',
  },
  matrixHeader: {
    flexDirection: 'row',
    backgroundColor: colors.gray200,
    paddingVertical: 8,
    paddingHorizontal: spacing.sm,
  },
  matrixColHeader: {
    flex: 1,
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  matrixRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    backgroundColor: colors.white,
  },
  matrixModName: { flex: 1.4, fontSize: 12, fontWeight: '500', color: colors.textPrimary },
  matrixCell: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  // Confirm delete modal
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  confirmCard: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
  },
  warningIconCircle: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  confirmActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.gray300,
    alignItems: 'center',
  },
  dangerBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: radius.md,
    backgroundColor: colors.error,
    alignItems: 'center',
  },
});
