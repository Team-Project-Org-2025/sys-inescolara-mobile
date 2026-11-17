import React, { useState } from 'react';
import { UsersScreen } from './src/features/usuarios/screen/UsersScreen';
import { SuppliersScreen } from './src/features/proveedores/screen/SuppliersScreen';
import { ClientsScreen } from './src/features/clientes/screen/ClientsScreen';
import { PlantsScreen } from './src/features/plantas/screen/PlantsScreen';
import { SpeciesScreen } from './src/features/especies/screen/SpeciesScreen';
import { NavItem } from './src/shared/components/ScreenLayout';

const NAV_ITEMS: NavItem[] = [
  { key: 'usuarios', label: 'Usuarios', icon: 'shield-checkmark-outline' },
  { key: 'proveedores', label: 'Proveedores', icon: 'business-outline' },
  { key: 'clientes', label: 'Clientes', icon: 'people-outline' },
  { key: 'plantas', label: 'Plantas', icon: 'flower-outline' },
  { key: 'especies', label: 'Especies', icon: 'leaf-outline' },
];

export default function App() {
  const [activeRoute, setActiveRoute] = useState('usuarios');

  return (
    <>
      {activeRoute === 'usuarios' && (
        <UsersScreen navItems={NAV_ITEMS} activeRoute={activeRoute} onNavigate={setActiveRoute} />
      )}
      {activeRoute === 'proveedores' && (
        <SuppliersScreen navItems={NAV_ITEMS} activeRoute={activeRoute} onNavigate={setActiveRoute} />
      )}
      {activeRoute === 'clientes' && (
        <ClientsScreen navItems={NAV_ITEMS} activeRoute={activeRoute} onNavigate={setActiveRoute} />
      )}
      {activeRoute === 'plantas' && (
        <PlantsScreen navItems={NAV_ITEMS} activeRoute={activeRoute} onNavigate={setActiveRoute} />
      )}
      {activeRoute === 'especies' && (
        <SpeciesScreen navItems={NAV_ITEMS} activeRoute={activeRoute} onNavigate={setActiveRoute} />
      )}
    </>
  );
}
