import React, { useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ScreenLayout, NavItem } from '../../../shared/components/ScreenLayout';
import { SearchBar } from '../../../shared/components/SearchBar';
import { AppButton } from '../../../shared/components/AppButton';
import { UserCard, UserItem } from '../components/UserCard';
import { UserFormModal, DeleteUserModal } from '../components/UserModals';
import { spacing } from '../../../core/theme/spacing';
import { typography } from '../../../core/theme/typography';

const INITIAL_USERS: UserItem[] = [
  {
    id: 1,
    nombre_usuario: 'admin',
    correo_electronico: 'admin@inecolara.gob.ve',
    rol_id: 1,
    nombre_rol: 'Administrador',
    nombre_trabajador: 'Carlos',
    apellido_trabajador: 'Silva',
    cedula_trabajador: 'V-14523890',
    telefono_trabajador: '0412-5550101',
    cargo: 'Director de Vivero',
    permisos: [],
  },
  {
    id: 2,
    nombre_usuario: 'mrodriguez',
    correo_electronico: 'm.rodriguez@inecolara.gob.ve',
    rol_id: 2,
    nombre_rol: 'Operador Vivero',
    nombre_trabajador: 'Mariana',
    apellido_trabajador: 'Rodríguez',
    cedula_trabajador: 'V-20984123',
    telefono_trabajador: '0414-3219876',
    cargo: 'Técnico Agrónomo',
    permisos: ['Especies:Ver', 'Especies:Crear', 'Plantas:Ver', 'Plantas:Crear', 'Plantas:Editar'],
  },
  {
    id: 3,
    nombre_usuario: 'lparra',
    correo_electronico: 'luis.parra@inecolara.gob.ve',
    rol_id: 3,
    nombre_rol: 'Vendedor',
    nombre_trabajador: 'Luis',
    apellido_trabajador: 'Parra',
    cedula_trabajador: 'V-19456123',
    telefono_trabajador: '0424-7778899',
    cargo: 'Atención al Público',
    permisos: ['Clientes:Ver', 'Clientes:Crear', 'Plantas:Ver'],
  },
];

interface UsersScreenProps {
  navItems: NavItem[];
  activeRoute: string;
  onNavigate: (key: string) => void;
}

export const UsersScreen: React.FC<UsersScreenProps> = ({
  navItems,
  activeRoute,
  onNavigate,
}) => {
  const [users, setUsers] = useState<UserItem[]>(INITIAL_USERS);
  const [search, setSearch] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<UserItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<UserItem | null>(null);

  const filtered = users.filter(
    (u) =>
      u.nombre_usuario.toLowerCase().includes(search.toLowerCase()) ||
      u.nombre_trabajador.toLowerCase().includes(search.toLowerCase()) ||
      u.apellido_trabajador.toLowerCase().includes(search.toLowerCase()) ||
      u.nombre_rol.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (data: Omit<UserItem, 'id'>) => {
    if (editingItem) {
      setUsers((prev) => prev.map((u) => (u.id === editingItem.id ? { ...u, ...data } : u)));
    } else {
      setUsers((prev) => [{ id: Date.now(), ...data }, ...prev]);
    }
    setFormVisible(false);
    setEditingItem(null);
  };

  return (
    <ScreenLayout
      title="Gestión de Usuarios"
      subtitle="Módulo para administrar los usuarios del sistema."
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
            setFormVisible(true);
          }}
        />
      }
    >
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar usuario, trabajador o rol..."
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: spacing.xxl }}
        renderItem={({ item }) => (
          <UserCard
            item={item}
            onEdit={(selected) => {
              setEditingItem(selected);
              setFormVisible(true);
            }}
            onDelete={(selected) => setDeletingItem(selected)}
          />
        )}
        ListEmptyComponent={
          <View style={{ padding: spacing.xxl, alignItems: 'center' }}>
            <Text style={typography.caption}>No se encontraron usuarios.</Text>
          </View>
        }
      />

      <UserFormModal
        visible={formVisible}
        initialData={editingItem}
        onClose={() => setFormVisible(false)}
        onSubmit={handleSave}
      />

      <DeleteUserModal
        user={deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirmDelete={(id) => setUsers((prev) => prev.filter((u) => u.id !== id))}
      />
    </ScreenLayout>
  );
};
