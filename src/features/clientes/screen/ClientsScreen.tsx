import React, { useState } from 'react';
import { FlatList, Alert, View, Text } from 'react-native';
import { ScreenLayout, NavItem } from '../../../shared/components/ScreenLayout';
import { SearchBar } from '../../../shared/components/SearchBar';
import { AppButton } from '../../../shared/components/AppButton';
import { ClientCard, ClientItem } from '../components/ClientCard';
import { ClientFormModal } from '../components/ClientFormModal';
import { spacing } from '../../../core/theme/spacing';
import { typography } from '../../../core/theme/typography';

const INITIAL_CLIENTS: ClientItem[] = [
  { id: 1, tipo_cedula_cliente: 'V', cedula_cliente: '18456789', nombre_cliente: 'Juan', apellido_cliente: 'Pérez', contacto_cliente: '0412-1234567' },
  { id: 2, tipo_cedula_cliente: 'V', cedula_cliente: '22987654', nombre_cliente: 'Ana', apellido_cliente: 'Rodríguez', contacto_cliente: '0414-9876543' },
  { id: 3, tipo_cedula_cliente: 'J', cedula_cliente: '40112233-9', nombre_cliente: 'Paisajismo Barquisimeto', apellido_cliente: '', contacto_cliente: '0251-2548899' },
];

interface ClientsScreenProps {
  navItems: NavItem[];
  activeRoute: string;
  onNavigate: (key: string) => void;
}

export const ClientsScreen: React.FC<ClientsScreenProps> = ({ navItems, activeRoute, onNavigate }) => {
  const [clients, setClients] = useState<ClientItem[]>(INITIAL_CLIENTS);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<ClientItem | null>(null);

  const filtered = clients.filter(
    (c) =>
      c.nombre_cliente.toLowerCase().includes(search.toLowerCase()) ||
      c.apellido_cliente.toLowerCase().includes(search.toLowerCase()) ||
      c.cedula_cliente.includes(search)
  );

  const handleSave = (data: Omit<ClientItem, 'id'>) => {
    if (editingItem) {
      setClients((prev) => prev.map((c) => (c.id === editingItem.id ? { ...c, ...data } : c)));
    } else {
      setClients((prev) => [{ id: Date.now(), ...data }, ...prev]);
    }
    setModalVisible(false);
    setEditingItem(null);
  };

  const handleDelete = (item: ClientItem) => {
    const fullName = `${item.nombre_cliente} ${item.apellido_cliente || ''}`.trim();
    Alert.alert('¿Eliminar cliente?', `¿Deseas eliminar a "${fullName}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sí, eliminar',
        style: 'destructive',
        onPress: () => setClients((prev) => prev.filter((c) => c.id !== item.id)),
      },
    ]);
  };

  return (
    <ScreenLayout
      title="Gestión de Clientes"
      subtitle="Registro y control de clientes del vivero."
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
      <SearchBar value={search} onChangeText={setSearch} placeholder="Buscar por nombre, apellido o C.I..." />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: spacing.xxl }}
        renderItem={({ item }) => (
          <ClientCard
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
            <Text style={typography.caption}>No se encontraron clientes.</Text>
          </View>
        }
      />

      <ClientFormModal
        visible={modalVisible}
        initialData={editingItem}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSave}
      />
    </ScreenLayout>
  );
};
