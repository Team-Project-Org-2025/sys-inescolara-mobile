import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { FormModal } from '../../../shared/components/FormModal';
import { ClientItem } from './ClientCard';
import { colors } from '../../../core/theme/colors';
import { radius, spacing } from '../../../core/theme/spacing';

interface ClientFormModalProps {
  visible: boolean;
  initialData: ClientItem | null;
  onClose: () => void;
  onSubmit: (data: Omit<ClientItem, 'id'>) => void;
}

const CEDULA_TYPES = ['V', 'E', 'J', 'G', 'P'];

export const ClientFormModal: React.FC<ClientFormModalProps> = ({
  visible,
  initialData,
  onClose,
  onSubmit,
}) => {
  const [tipoCedula, setTipoCedula] = useState('V');
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [contacto, setContacto] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (visible) {
      setTipoCedula(initialData?.tipo_cedula_cliente || 'V');
      setCedula(initialData?.cedula_cliente || '');
      setNombre(initialData?.nombre_cliente || '');
      setApellido(initialData?.apellido_cliente || '');
      setContacto(initialData?.contacto_cliente || '');
      setError('');
    }
  }, [visible, initialData]);

  const validateAndSubmit = () => {
    if (!nombre.trim()) {
      setError('El nombre del cliente es obligatorio.');
      return;
    }
    onSubmit({
      tipo_cedula_cliente: cedula.trim() ? tipoCedula : '',
      cedula_cliente: cedula.trim(),
      nombre_cliente: nombre.trim(),
      apellido_cliente: apellido.trim(),
      contacto_cliente: contacto.trim(),
    });
  };

  return (
    <FormModal
      visible={visible}
      title={initialData ? 'Editar Cliente' : 'Agregar Cliente'}
      saveText={initialData ? 'Actualizar' : 'Guardar'}
      onClose={onClose}
      onSave={validateAndSubmit}
    >
      {/* Tipo C.I. + Número */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Cédula de Identidad / RIF</Text>
        <View style={styles.ciRow}>
          <View style={styles.ciSelector}>
            {CEDULA_TYPES.map((tipo) => {
              const active = tipoCedula === tipo;
              return (
                <TouchableOpacity
                  key={tipo}
                  style={[styles.ciChip, active && styles.ciChipActive]}
                  onPress={() => setTipoCedula(tipo)}
                >
                  <Text style={[styles.ciChipText, active && styles.ciChipTextActive]}>{tipo}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={cedula}
            onChangeText={setCedula}
            placeholder="Ej: 12345678"
            placeholderTextColor={colors.textMuted}
            keyboardType="numeric"
            maxLength={10}
          />
        </View>
      </View>

      {/* Nombre y Apellido */}
      <View style={styles.row2}>
        <View style={[styles.formGroup, { flex: 1 }]}>
          <Text style={styles.label}>Nombre *</Text>
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            value={nombre}
            onChangeText={(t) => {
              setNombre(t);
              if (error) setError('');
            }}
            placeholder="Ej: Juan"
            placeholderTextColor={colors.textMuted}
            maxLength={50}
          />
        </View>
        <View style={[styles.formGroup, { flex: 1 }]}>
          <Text style={styles.label}>Apellido</Text>
          <TextInput
            style={styles.input}
            value={apellido}
            onChangeText={setApellido}
            placeholder="Ej: Pérez"
            placeholderTextColor={colors.textMuted}
            maxLength={50}
          />
        </View>
      </View>
      {error ? <Text style={[styles.errorText, { marginTop: -10, marginBottom: 12 }]}>{error}</Text> : null}

      {/* Contacto */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Contacto (Teléfono)</Text>
        <TextInput
          style={styles.input}
          value={contacto}
          onChangeText={setContacto}
          placeholder="Ej: 0412-1234567"
          placeholderTextColor={colors.textMuted}
          keyboardType="phone-pad"
          maxLength={12}
        />
        <Text style={styles.helperText}>Opcional</Text>
      </View>
    </FormModal>
  );
};

const styles = StyleSheet.create({
  formGroup: { marginBottom: spacing.lg },
  row2: { flexDirection: 'row', gap: spacing.sm },
  label: { fontSize: 14, fontWeight: '500', color: colors.textPrimary, marginBottom: spacing.sm },
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
  errorText: { color: colors.error, fontSize: 12 },
  helperText: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
  ciRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  ciSelector: { flexDirection: 'row', gap: 4 },
  ciChip: {
    width: 28,
    height: 38,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.gray300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgSecondary,
  },
  ciChipActive: { backgroundColor: colors.secondary, borderColor: colors.secondary },
  ciChipText: { fontSize: 12, fontWeight: '600', color: colors.textSecondary },
  ciChipTextActive: { color: colors.white },
});
