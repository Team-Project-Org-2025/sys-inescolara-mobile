import React, { useState } from 'react';
import { FlatList, Alert, View, Text } from 'react-native';
import { ScreenLayout, NavItem } from '../../../shared/components/ScreenLayout';
import { SearchBar } from '../../../shared/components/SearchBar';
import { AppButton } from '../../../shared/components/AppButton';
import { SpeciesCard, SpeciesItem } from '../components/SpeciesCard';
import { SpeciesFormModal } from '../components/SpeciesFormModal';
import { spacing } from '../../../core/theme/spacing';
import { typography } from '../../../core/theme/typography';

const INITIAL_SPECIES: SpeciesItem[] = [
  { id: 1, nombre_especie: 'Rosal', descripcion: 'Arbusto perenne con flores de colores variados y tallos espinosos.' },
  { id: 2, nombre_especie: 'Araguaney', descripcion: 'Árbol emblemático de floración amarilla intensa en temporada seca.' },
  { id: 3, nombre_especie: 'Girasol', descripcion: 'Planta herbácea anual cultivada por su inflorescencia ornamental.' },
  { id: 4, nombre_especie: 'Cactus Saguaro', descripcion: 'Suculenta de bajo consumo hídrico adaptada al clima semiárido.' },
];

interface SpeciesScreenProps {
  navItems: NavItem[];
  activeRoute: string;
  onNavigate: (key: string) => void;
}

export const SpeciesScreen: React.FC<SpeciesScreenProps> = ({
  navItems,
  activeRoute,
  onNavigate,
}) => {
  const [species, setSpecies] = useState<SpeciesItem[]>(INITIAL_SPECIES);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<SpeciesItem | null>(null);

  const filtered = species.filter(
    (s) =>
      s.nombre_especie.toLowerCase().includes(search.toLowerCase()) ||
      s.descripcion.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (data: { nombre_especie: string; descripcion: string }) => {
    if (editingItem) {
      setSpecies((prev) => prev.map((s) => (s.id === editingItem.id ? { ...s, ...data } : s)));
    } else {
      setSpecies((prev) => [{ id: Date.now(), ...data }, ...prev]);
    }
    setModalVisible(false);
    setEditingItem(null);
  };

  const handleDelete = (item: SpeciesItem) => {
    Alert.alert('¿Eliminar especie?', `¿Deseas eliminar "${item.nombre_especie}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sí, eliminar',
        style: 'destructive',
        onPress: () => setSpecies((prev) => prev.filter((s) => s.id !== item.id)),
      },
    ]);
  };

  return (
    <ScreenLayout
      title="Gestión de Especies"
      subtitle="Catálogo de especies de plantas del vivero."
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
            setModalVisible(true);
          }}
        />
      }
    >
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar especie o descripción..."
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: spacing.xxl }}
        renderItem={({ item }) => (
          <SpeciesCard
            item={item}
            onEdit={(selected) => {
              setEditingItem(selected);
              setModalVisible(true);
            }}
            onDelete={handleDelete}
          />
        )}
        ListEmptyComponent={
          <View style={{ padding: spacing.xxl, alignItems: 'center' }}>
            <Text style={typography.caption}>No se encontraron especies.</Text>
          </View>
        }
      />

      <SpeciesFormModal
        visible={modalVisible}
        initialData={editingItem}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSave}
      />
    </ScreenLayout>
  );
};
