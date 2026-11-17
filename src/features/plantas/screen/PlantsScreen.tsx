import React, { useState } from 'react';
import { FlatList, Alert, View, Text } from 'react-native';
import { ScreenLayout, NavItem } from '../../../shared/components/ScreenLayout';
import { SearchBar } from '../../../shared/components/SearchBar';
import { AppButton } from '../../../shared/components/AppButton';
import { PlantCard, PlantItem } from '../components/PlantCard';
import {
  PlantFormModal,
  PlantDetailModal,
  ImageLightboxModal,
} from '../components/PlantModals';
import { spacing } from '../../../core/theme/spacing';
import { typography } from '../../../core/theme/typography';

const INITIAL_PLANTS: PlantItem[] = [
  {
    id: 1,
    nombre_comun: 'Rosa Roja',
    nombre_tecnico: 'Rosa gallica',
    especie_nombre: 'Rosal',
    imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80',
    stock_lotes: 4,
    cantidad_total: 240,
  },
  {
    id: 2,
    nombre_comun: 'Echeveria Elegans',
    nombre_tecnico: 'Echeveria elegans',
    especie_nombre: 'Cactus Saguaro',
    imagen: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&q=80',
    stock_lotes: 6,
    cantidad_total: 410,
  },
  {
    id: 3,
    nombre_comun: 'Girasol Enano',
    nombre_tecnico: 'Helianthus annuus',
    especie_nombre: 'Girasol',
    stock_lotes: 2,
    cantidad_total: 85,
  },
];

interface PlantsScreenProps {
  navItems: NavItem[];
  activeRoute: string;
  onNavigate: (key: string) => void;
}

export const PlantsScreen: React.FC<PlantsScreenProps> = ({
  navItems,
  activeRoute,
  onNavigate,
}) => {
  const [plants, setPlants] = useState<PlantItem[]>(INITIAL_PLANTS);
  const [search, setSearch] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<PlantItem | null>(null);
  const [viewingItem, setViewingItem] = useState<PlantItem | null>(null);
  const [lightboxUri, setLightboxUri] = useState<string | null>(null);

  const filtered = plants.filter(
    (p) =>
      p.nombre_comun.toLowerCase().includes(search.toLowerCase()) ||
      p.nombre_tecnico.toLowerCase().includes(search.toLowerCase()) ||
      p.especie_nombre.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (data: Omit<PlantItem, 'id'>) => {
    if (editingItem) {
      setPlants((prev) => prev.map((p) => (p.id === editingItem.id ? { ...p, ...data } : p)));
    } else {
      setPlants((prev) => [{ id: Date.now(), ...data }, ...prev]);
    }
    setFormVisible(false);
    setEditingItem(null);
  };

  const handleDelete = (item: PlantItem) => {
    Alert.alert('¿Eliminar planta?', `¿Deseas eliminar "${item.nombre_comun}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sí, eliminar',
        style: 'destructive',
        onPress: () => setPlants((prev) => prev.filter((p) => p.id !== item.id)),
      },
    ]);
  };

  return (
    <ScreenLayout
      title="Catálogo de Plantas"
      subtitle="Registro individual de plantas del vivero."
      navItems={navItems}
      activeRoute={activeRoute}
      onNavigate={onNavigate}
      headerRight={
        <AppButton
          title="Nueva"
          icon="add"
          size="sm"
          onPress={() => {
            setEditingItem(null);
            setFormVisible(true);
          }}
        />
      }
    >
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar por nombre común, técnico o especie..."
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: spacing.xxl }}
        renderItem={({ item }) => (
          <PlantCard
            item={item}
            onView={(selected) => setViewingItem(selected)}
            onEdit={(selected) => {
              setEditingItem(selected);
              setFormVisible(true);
            }}
            onDelete={handleDelete}
            onPreviewImage={(uri) => setLightboxUri(uri)}
          />
        )}
        ListEmptyComponent={
          <View style={{ padding: spacing.xxl, alignItems: 'center' }}>
            <Text style={typography.caption}>No se encontraron plantas.</Text>
          </View>
        }
      />

      <PlantFormModal
        visible={formVisible}
        initialData={editingItem}
        onClose={() => setFormVisible(false)}
        onSubmit={handleSave}
      />

      <PlantDetailModal plant={viewingItem} onClose={() => setViewingItem(null)} />

      <ImageLightboxModal uri={lightboxUri} onClose={() => setLightboxUri(null)} />
    </ScreenLayout>
  );
};
