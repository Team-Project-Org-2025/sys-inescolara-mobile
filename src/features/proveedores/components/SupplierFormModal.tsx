import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { FormModal } from '../../../shared/components/FormModal';
import { SupplierItem } from './SupplierCard';
import { colors } from '../../../core/theme/colors';
import { radius, spacing } from '../../../core/theme/spacing';

interface SupplierFormModalProps {
  visible: boolean;
  initialData: SupplierItem | null;
  onClose: () => void;
  onSubmit: (data: Omit<SupplierItem, 'id'>) => void;
}

const RIF_TYPES = ['J', 'G', 'V', 'E', 'P'];

export const SupplierFormModal: React.FC<SupplierFormModalProps> = ({
  visible,
  initialData,
  onClose,
  onSubmit,
}) => {
  const [nombre, setNombre] = useState('');
  const [rifTipo, setRifTipo] = useState('J');
  const [rifNumero, setRifNumero] = useState('');
  const [contacto, setContacto] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (visible) {
      setNombre(initialData?.nombre_proveedor || '');
      setContacto(initialData?.contacto_vendedor || '');
      setTelefono(initialData?.telefono_proveedor || '');
      setError('');

      const rifFull = initialData?.rif_proveedor || '';
      const parts = rifFull.split('-');
      if (parts.length > 1 && RIF_TYPES.includes(parts[0])) {
        setRifTipo(parts[0]);
        setRifNumero(parts.slice(1).join('-'));
      } else {
        setRifTipo('J');
        setRifNumero(rifFull);
      }
    }
  }, [visible, initialData]);

  const validateAndSubmit = () => {
    const trimmedName = nombre.trim();
    if (!trimmedName) {
      setError('El nombre del proveedor es obligatorio.');
      return;
    }

    const trimmedRifNum = rifNumero.trim();
    const combinedRif = rifTipo && trimmedRifNum ? `${rifTipo}-${trimmedRifNum}` : '';

    onSubmit({
      nombre_proveedor: trimmedName,
      rif_proveedor: combinedRif,
      contacto_vendedor: contacto.trim(),
      telefono_proveedor: telefono.trim(),
    });
  };

  return (
    <FormModal
      visible={visible}
      title={initialData ? 'Editar Proveedor' : 'Agregar Proveedor'}
      saveText={initialData ? 'Actualizar' : 'Guardar'}
      onClose={onClose}
      onSave={validateAndSubmit}
    >
      {/* Nombre del Proveedor */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre del Proveedor *</Text>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          value={nombre}
          onChangeText={(text) => {
            setNombre(text);
            if (error) setError('');
          }}
          placeholder="Ej: Viveros del Valle C.A."
          placeholderTextColor={colors.textMuted}
          maxLength={50}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      {/* RIF (Selector de tipo + Número) */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>RIF (Opcional)</Text>
        <View style={styles.rifRow}>
          <View style={styles.rifSelector}>
            {RIF_TYPES.map((tipo) => {
              const active = rifTipo === tipo;
              return (
                <TouchableOpacity
                  key={tipo}
                  style={[styles.rifChip, active && styles.rifChipActive]}
                  onPress={() => setRifTipo(tipo)}
                >
                  <Text style={[styles.rifChipText, active && styles.rifChipTextActive]}>
                    {tipo}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TextInput
            style={[styles.input, { flex: 1, fontFamily: 'monospace' }]}
            value={rifNumero}
            onChangeText={setRifNumero}
            placeholder="12345678-9"
            placeholderTextColor={colors.textMuted}
            maxLength={10}
          />
        </View>
      </View>

      {/* Contacto Vendedor */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre del Contacto (Vendedor)</Text>
        <TextInput
          style={styles.input}
          value={contacto}
          onChangeText={setContacto}
          placeholder="Ej: María García"
          placeholderTextColor={colors.textMuted}
          maxLength={50}
        />
        <Text style={styles.helperText}>Opcional</Text>
      </View>

      {/* Teléfono */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          value={telefono}
          onChangeText={setTelefono}
          placeholder="Ej: 0412-7654321"
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
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
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
  rifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  rifSelector: {
    flexDirection: 'row',
    gap: 4,
  },
  rifChip: {
    width: 30,
    height: 38,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.gray300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgSecondary,
  },
  rifChipActive: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  rifChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  rifChipTextActive: {
    color: colors.white,
  },
});
