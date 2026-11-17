import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FormModal } from '../../../shared/components/FormModal';
import { Species, SpeciesFormData } from '../types/species.types';
import { colors } from '../../../core/theme/colors';
import { radius, spacing } from '../../../core/theme/spacing';

interface SpeciesFormModalProps {
  visible: boolean;
  initialData: Species | null;
  onClose: () => void;
  onSubmit: (data: SpeciesFormData) => void;
}

export const SpeciesFormModal: React.FC<SpeciesFormModalProps> = ({
  visible,
  initialData,
  onClose,
  onSubmit,
}) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (visible) {
      setNombre(initialData?.nombre_especie || '');
      setDescripcion(initialData?.descripcion || '');
      setError('');
    }
  }, [visible, initialData]);

  const validateAndSubmit = () => {
    const trimmedName = nombre.trim();
    if (!trimmedName) {
      setError('El nombre de la especie es obligatorio.');
      return;
    }
    if (trimmedName.length < 2) {
      setError('Debe tener al menos 2 caracteres.');
      return;
    }
    onSubmit({
      nombre_especie: trimmedName,
      descripcion: descripcion.trim(),
    });
  };

  return (
    <FormModal
      visible={visible}
      title={initialData ? 'Editar Especie' : 'Agregar Especie'}
      saveText={initialData ? 'Actualizar' : 'Guardar'}
      onClose={onClose}
      onSave={validateAndSubmit}
    >
      {/* Campo Nombre */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre de la Especie *</Text>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          value={nombre}
          onChangeText={(text) => {
            setNombre(text);
            if (error) setError('');
          }}
          placeholder="Ej: Rosal, Girasol, Cactus"
          placeholderTextColor={colors.textMuted}
          maxLength={50}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      {/* Campo Descripción */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={descripcion}
          onChangeText={setDescripcion}
          placeholder="Ej: Arbusto perenne con flores de colores variados"
          placeholderTextColor={colors.textMuted}
          multiline
          numberOfLines={3}
          maxLength={500}
          textAlignVertical="top"
        />
        <Text style={styles.helperText}>Opcional ({descripcion.length}/500)</Text>
      </View>
    </FormModal>
  );
};

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: spacing.lg,
  },
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
  inputError: {
    borderColor: colors.error,
  },
  textArea: {
    minHeight: 80,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },
  helperText: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
});
