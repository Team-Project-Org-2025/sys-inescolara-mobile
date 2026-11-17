import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FormModal } from '../../../shared/components/FormModal';
import { PlantItem } from './PlantCard';
import { colors } from '../../../core/theme/colors';
import { radius, spacing } from '../../../core/theme/spacing';
import { typography } from '../../../core/theme/typography';

const SPECIES_OPTIONS = ['Sin especie', 'Rosal', 'Araguaney', 'Girasol', 'Cactus Saguaro'];

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80',
  'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&q=80',
  'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&q=80',
];

/* 1. MODAL AGREGAR / EDITAR */
interface PlantFormModalProps {
  visible: boolean;
  initialData: PlantItem | null;
  onClose: () => void;
  onSubmit: (data: Omit<PlantItem, 'id'>) => void;
}

export const PlantFormModal: React.FC<PlantFormModalProps> = ({
  visible,
  initialData,
  onClose,
  onSubmit,
}) => {
  const [nombreComun, setNombreComun] = useState('');
  const [nombreTecnico, setNombreTecnico] = useState('');
  const [especie, setEspecie] = useState('Sin especie');
  const [imagen, setImagen] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (visible) {
      setNombreComun(initialData?.nombre_comun || '');
      setNombreTecnico(initialData?.nombre_tecnico || '');
      setEspecie(initialData?.especie_nombre || 'Sin especie');
      setImagen(initialData?.imagen || '');
      setError('');
    }
  }, [visible, initialData]);

  const handleSave = () => {
    if (!nombreComun.trim()) {
      setError('El nombre común es obligatorio.');
      return;
    }
    onSubmit({
      nombre_comun: nombreComun.trim(),
      nombre_tecnico: nombreTecnico.trim(),
      especie_nombre: especie === 'Sin especie' ? '' : especie,
      imagen: imagen || undefined,
      stock_lotes: initialData?.stock_lotes ?? 3,
      cantidad_total: initialData?.cantidad_total ?? 120,
    });
  };

  return (
    <FormModal
      visible={visible}
      title={initialData ? 'Editar Planta' : 'Agregar Planta'}
      saveText={initialData ? 'Actualizar' : 'Guardar'}
      onClose={onClose}
      onSave={handleSave}
    >
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre Común *</Text>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          value={nombreComun}
          onChangeText={(t) => {
            setNombreComun(t);
            if (error) setError('');
          }}
          placeholder="Ej: Rosa, Cactus, Suculenta"
          placeholderTextColor={colors.textMuted}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre Técnico (Científico)</Text>
        <TextInput
          style={[styles.input, { fontStyle: 'italic' }]}
          value={nombreTecnico}
          onChangeText={setNombreTecnico}
          placeholder="Ej: Rosa gallica"
          placeholderTextColor={colors.textMuted}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Especie / Grupo Familiar</Text>
        <View style={styles.chipWrap}>
          {SPECIES_OPTIONS.map((sp) => {
            const active = especie === sp;
            return (
              <TouchableOpacity
                key={sp}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setEspecie(sp)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{sp}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Selector visual de foto para prototipo */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Imagen de Muestra (Prototipo)</Text>
        <View style={styles.photoSelectorRow}>
          {SAMPLE_PHOTOS.map((uri, idx) => {
            const selected = imagen === uri;
            return (
              <TouchableOpacity
                key={idx}
                onPress={() => setImagen(selected ? '' : uri)}
                style={[styles.samplePhotoWrap, selected && styles.samplePhotoSelected]}
              >
                <Image source={{ uri }} style={styles.samplePhoto} />
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={styles.helperText}>Toca una imagen para asignarla o desmarcarla.</Text>
      </View>
    </FormModal>
  );
};

/* 2. MODAL DETALLE DE PLANTA */
interface PlantDetailModalProps {
  plant: PlantItem | null;
  onClose: () => void;
}

export const PlantDetailModal: React.FC<PlantDetailModalProps> = ({ plant, onClose }) => {
  if (!plant) return null;

  return (
    <Modal visible={!!plant} transparent statusBarTranslucent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.detailCard}>
          <View style={styles.detailHeader}>
            <Text style={typography.h2}>Detalle de Planta</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.detailBody}>
            {plant.imagen ? (
              <Image source={{ uri: plant.imagen }} style={styles.detailImage} />
            ) : (
              <View style={styles.detailImagePlaceholder}>
                <Ionicons name="leaf-outline" size={40} color={colors.gray400} />
              </View>
            )}

            <View style={styles.detailGrid}>
              <View style={styles.detailField}>
                <Text style={styles.detailLabel}>NOMBRE COMÚN</Text>
                <Text style={styles.detailValue}>{plant.nombre_comun}</Text>
              </View>
              <View style={styles.detailField}>
                <Text style={styles.detailLabel}>NOMBRE TÉCNICO</Text>
                <Text style={[styles.detailValue, { fontStyle: 'italic' }]}>
                  {plant.nombre_tecnico || '—'}
                </Text>
              </View>
              <View style={styles.detailField}>
                <Text style={styles.detailLabel}>ESPECIE / GRUPO</Text>
                <Text style={styles.detailValue}>{plant.especie_nombre || 'Sin especie'}</Text>
              </View>
              <View style={styles.detailRow2}>
                <View style={styles.statBox}>
                  <Text style={styles.detailLabel}>STOCK EN LOTES</Text>
                  <Text style={styles.statNumber}>{plant.stock_lotes}</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.detailLabel}>CANTIDAD TOTAL</Text>
                  <Text style={[styles.statNumber, { color: colors.secondary }]}>
                    {plant.cantidad_total}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

/* 3. MODAL LIGHTBOX */
export const ImageLightboxModal: React.FC<{ uri: string | null; onClose: () => void }> = ({
  uri,
  onClose,
}) => (
  <Modal visible={!!uri} transparent statusBarTranslucent animationType="fade" onRequestClose={onClose}>
    <Pressable style={styles.lightboxOverlay} onPress={onClose}>
      <TouchableOpacity style={styles.lightboxClose} onPress={onClose}>
        <Ionicons name="close-circle" size={34} color={colors.white} />
      </TouchableOpacity>
      {uri && <Image source={{ uri }} style={styles.lightboxImg} resizeMode="contain" />}
    </Pressable>
  </Modal>
);

const styles = StyleSheet.create({
  formGroup: { marginBottom: spacing.lg },
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
  errorText: { color: colors.error, fontSize: 12, marginTop: 4 },
  helperText: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.gray300,
    backgroundColor: colors.bgSecondary,
  },
  chipActive: { backgroundColor: colors.secondary, borderColor: colors.secondary },
  chipText: { fontSize: 12, color: colors.textSecondary, fontWeight: '500' },
  chipTextActive: { color: colors.white, fontWeight: '600' },
  photoSelectorRow: { flexDirection: 'row', gap: spacing.md },
  samplePhotoWrap: {
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  samplePhotoSelected: { borderColor: colors.primary },
  samplePhoto: { width: 64, height: 64 },

  // Detail Modal
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  detailCard: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    overflow: 'hidden',
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  detailBody: { padding: spacing.lg, alignItems: 'center' },
  detailImage: { width: 120, height: 120, borderRadius: radius.lg, marginBottom: spacing.lg },
  detailImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: radius.lg,
    backgroundColor: colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  detailGrid: { width: '100%', gap: spacing.md },
  detailField: {
    backgroundColor: colors.bgSecondary,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  detailLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 0.6 },
  detailValue: { fontSize: 16, fontWeight: '600', color: colors.textPrimary, marginTop: 2 },
  detailRow2: { flexDirection: 'row', gap: spacing.md },
  statBox: {
    flex: 1,
    backgroundColor: colors.bgSecondary,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  statNumber: { fontSize: 22, fontWeight: '700', color: colors.primaryDark, marginTop: 4 },

  // Lightbox
  lightboxOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.88)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  lightboxClose: { position: 'absolute', top: 44, right: 20, zIndex: 10 },
  lightboxImg: { width: '100%', height: '70%' },
});
