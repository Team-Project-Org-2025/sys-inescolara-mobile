import React, { useState } from 'react';
import { FlatList, Alert, View, Text } from 'react-native';
import { ScreenLayout, NavItem } from '../../../shared/components/ScreenLayout';
import { SearchBar } from '../../../shared/components/SearchBar';
import { AppButton } from '../../../shared/components/AppButton';
import { SupplierCard, SupplierItem } from '../components/SupplierCard';
import { SupplierFormModal } from '../components/SupplierFormModal';
import { spacing } from '../../../core/theme/spacing';
import { typography } from '../../../core/theme/typography';

const INITIAL_SUPPLIERS: SupplierItem[] = [
  {
    id: 1,
    nombre_proveedor: 'Viveros del Valle C.A.',
    rif_proveedor: 'J-30482910-4',
    contacto_vendedor: 'María García',
    telefono_proveedor: '0412-7654321',
  },
  {
    id: 2,
    nombre_proveedor: 'Agroinsumos Lara S.R.L.',
    rif_proveedor: 'J-40192837-1',
    contacto_vendedor: 'Carlos Mendoza',
    telefono_proveedor: '0414-5551234',
  },
  {
    id: 3,
    nombre_proveedor: 'Semillas y Sustratos El Tocuyo',
    rif_proveedor: 'V-14982310-0',
    contacto_vendedor: 'José Pérez',
    telefono_proveedor: '0424-8889900',
  },
];

interface SuppliersScreenProps {
  navItems: NavItem[];
  activeRoute: string;
  onNavigate: (key: string) => void;
}

export const SuppliersScreen: React.FC<SuppliersScreenProps> = ({
  navItems,
  activeRoute,
  onNavigate,
}) => {
  const [suppliers, setSuppliers] = useState<SupplierItem[]>(INITIAL_SUPPLIERS);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<SupplierItem | null>(null);

  const filtered = suppliers.filter(
    (s) =>
      s.nombre_proveedor.toLowerCase().includes(search.toLowerCase()) ||
      s.rif_proveedor.toLowerCase().includes(search.toLowerCase()) ||
      s.contacto_vendedor.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (data: Omit<SupplierItem, 'id'>) => {
    if (editingItem) {
      setSuppliers((prev) => prev.map((s) => (s.id === editingItem.id ? { ...s, ...data } : s)));
    } else {
      setSuppliers((prev) => [{ id: Date.now(), ...data }, ...prev]);
    }
    setModalVisible(false);
    setEditingItem(null);
  };

  const handleDelete = (item: SupplierItem) => {
    Alert.alert('¿Eliminar proveedor?', `¿Deseas eliminar "${item.nombre_proveedor}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sí, eliminar',
        style: 'destructive',
        onPress: () => setSuppliers((prev) => prev.filter((s) => s.id !== item.id)),
      },
    ]);
  };

  return (
    <ScreenLayout
      title="Gestión de Proveedores"
      subtitle="Registro y control de proveedores del vivero."
      navItems={navItems}
      activeRoute={activeRoute}
      onNavigate={onNavigate}
      headerRight={
        <AppButton
          title="Nuevo"
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
        placeholder="Buscar por nombre, RIF o contacto..."
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: spacing.xxl }}
        renderItem={({ item }) => (
          <SupplierCard
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
            <Text style={typography.caption}>No se encontraron proveedores.</Text>
          </View>
        }
      />

      <SupplierFormModal
        visible={modalVisible}
        initialData={editingItem}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSave}
      />
    </ScreenLayout>
  );
};
