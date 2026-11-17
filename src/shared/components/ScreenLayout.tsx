import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../core/theme/colors';
import { radius, spacing } from '../../core/theme/spacing';
import { typography } from '../../core/theme/typography';

export interface NavItem {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface ScreenLayoutProps {
  title: string;
  subtitle?: string;
  headerRight?: React.ReactNode;
  navItems: NavItem[];
  activeRoute: string;
  onNavigate: (key: string) => void;
  children: React.ReactNode;
}

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44;

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  title,
  subtitle,
  headerRight,
  navItems,
  activeRoute,
  onNavigate,
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelectRoute = (key: string) => {
    onNavigate(key);
    setSidebarOpen(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.secondaryDark} translucent />

      {/* Top Navbar respetando la altura de la barra de notificaciones */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <TouchableOpacity onPress={() => setSidebarOpen(true)} style={styles.menuBtn}>
            <Ionicons name="menu" size={26} color={colors.white} />
          </TouchableOpacity>
          <Image
            source={require('../../../assets/logo_de_inecolara-sin-fondo.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.brandTitle}>INECOLARA</Text>
            <Text style={styles.brandSubtitle}>Vivero Institucional</Text>
          </View>
        </View>
      </View>

      {/* Cabecera de la Vista */}
      <View style={styles.pageHeader}>
        <View style={styles.pageHeaderText}>
          <Text style={typography.h1}>{title}</Text>
          {subtitle && <Text style={[typography.subtitle, { marginTop: 2 }]}>{subtitle}</Text>}
        </View>
        {headerRight && <View>{headerRight}</View>}
      </View>

      {/* Contenido de la Vista */}
      <View style={styles.content}>{children}</View>

      {/* Sidebar Móvil cubriendo toda la pantalla (incluyendo status bar) */}
      <Modal
        visible={sidebarOpen}
        transparent
        statusBarTranslucent
        animationType="fade"
        onRequestClose={() => setSidebarOpen(false)}
      >
        <View style={styles.drawerOverlay}>
          <View style={styles.sidebar}>
            <View style={styles.sidebarHeader}>
              <Image
                source={require('../../../assets/logo.png')}
                style={styles.sidebarLogo}
                resizeMode="contain"
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.sidebarTitle}>INECOLARA</Text>
                <Text style={styles.sidebarRole}>Panel de Gestión</Text>
              </View>
              <TouchableOpacity onPress={() => setSidebarOpen(false)}>
                <Ionicons name="close" size={24} color={colors.gray400} />
              </TouchableOpacity>
            </View>

            <View style={styles.navList}>
              <Text style={styles.navSectionLabel}>MÓDULOS DEL PROTOTIPO</Text>
              {navItems.map((item) => {
                const isActive = item.key === activeRoute;
                return (
                  <TouchableOpacity
                    key={item.key}
                    style={[styles.navItem, isActive && styles.navItemActive]}
                    onPress={() => handleSelectRoute(item.key)}
                  >
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={isActive ? colors.black : colors.gray300}
                    />
                    <Text style={[styles.navItemText, isActive && styles.navItemTextActive]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <Pressable style={styles.backdrop} onPress={() => setSidebarOpen(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgSecondary },
  topBar: {
    backgroundColor: colors.secondaryDark,
    paddingTop: STATUS_BAR_HEIGHT + spacing.sm,
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
  },
  topBarLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  menuBtn: { padding: 4 },
  headerLogo: { width: 38, height: 38 },
  brandTitle: { color: colors.white, fontWeight: '700', fontSize: 15, letterSpacing: 0.5 },
  brandSubtitle: { color: colors.primaryLight, fontSize: 11 },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  pageHeaderText: { flex: 1 },
  content: { flex: 1, paddingHorizontal: spacing.lg },

  // Drawer / Sidebar Styles
  drawerOverlay: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.55)' },
  sidebar: {
    width: 270,
    backgroundColor: colors.bgSidebar,
    height: '100%',
    paddingTop: STATUS_BAR_HEIGHT + spacing.lg,
  },
  backdrop: { flex: 1 },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray700,
  },
  sidebarLogo: { width: 44, height: 44, borderRadius: radius.md },
  sidebarTitle: { color: colors.white, fontWeight: '700', fontSize: 16 },
  sidebarRole: { color: colors.gray400, fontSize: 12 },
  navList: { padding: spacing.md, gap: spacing.xs },
  navSectionLabel: {
    color: colors.gray500,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
  },
  navItemActive: { backgroundColor: colors.primary },
  navItemText: { color: colors.gray200, fontSize: 14, fontWeight: '500' },
  navItemTextActive: { color: colors.black, fontWeight: '700' },
});
