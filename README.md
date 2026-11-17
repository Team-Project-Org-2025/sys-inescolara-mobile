<div align="center">
  <img src="./assets/logo_de_inecolara-sin-fondo.png" alt="Logo INECOLARA" width="140" />

  <h1>🌱 SYS-INECOLARA Mobile</h1>
  <p><strong>Prototipo de Vistas Móviles CRUD para el Vivero del Instituto de Ecosocialismo del Estado Lara</strong></p>

  <p>
    <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
    <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/License-MIT-2e7d32?style=for-the-badge" alt="License MIT" />
  </p>
</div>

---

## 📋 Descripción del Proyecto

**SYS-INECOLARA Mobile** es la adaptación móvil y prototipo funcional de interfaz de usuario (UI/UX) de los módulos principales de gestión del sistema web **INECOLARA** (originalmente desarrollado en PHP/Bootstrap/DataTables).

El proyecto traduce tablas de escritorio, formularios modales y flujos administrativos complejos a una experiencia móvil nativa, fluida y responsiva utilizando **React Native + Expo**, respetando fielmente la paleta de colores institucional (`#e5a835` dorado institucional y `#2e7d32` verde ecosocialista) y su sistema de diseño.

---

## ✨ Módulos Implementados (5 Vistas CRUD)

La aplicación cuenta con un menú lateral desplegable (**Sidebar Drawer**) que permite navegar entre los 5 módulos principales con operaciones de búsqueda, creación, edición, visualización y eliminación en memoria:

| Módulo | Funcionalidades Principales | Adaptación Móvil Destacada |
| :--- | :--- | :--- |
| **1. Usuarios** | Gestión de cuentas, roles (`Admin`, `Operador`, `Vendedor`), datos del trabajador y permisos. | Matriz interactiva de permisos (`Módulo × Acción`) dinámica según el rol y modal de confirmación con contraseña de autorización. |
| **2. Proveedores** | Registro de empresas y vendedores, RIF venezolano (`J`, `G`, `V`, `E`, `P`) y teléfonos. | Selector rápido de tipo de RIF por chips + tarjetas con badges identificativos. |
| **3. Clientes** | Control de clientes naturales y jurídicos con Cédula/RIF, nombres y contacto. | Búsqueda instantánea por nombre, apellido o documento de identidad. |
| **4. Plantas** | Catálogo individual de plantas con nombre común, científico, especie e imagen. | Miniaturas fotográficas, modal de **Detalle de Stock/Lotes** y visor **Lightbox** a pantalla completa. |
| **5. Especies** | Administración de grupos familiares y especies botánicas del vivero. | Listado limpio con validación de formularios y contadores de caracteres. |

---

## 🏗️ Arquitectura del Proyecto

El código está organizado bajo una arquitectura **Feature-Driven Design (orientada a características)**, separando el núcleo visual y los componentes reutilizables de la lógica específica de cada pantalla:

```text
sys-inescolara-mobile/
├── assets/                          # Recursos gráficos e identidad visual INECOLARA
│   ├── logo.png
│   └── logo_de_inecolara-sin-fondo.png
├── src/
│   ├── core/                        # Sistema de diseño global (Design Tokens)
│   │   └── theme/
│   │       ├── colors.ts            # Paleta institucional y semántica
│   │       ├── spacing.ts           # Escala de espaciados y bordes redondeados
│   │       └── typography.ts        # Jerarquía tipográfica estándar
│   ├── shared/                      # Componentes UI desacoplados y reutilizables
│   │   └── components/
│   │       ├── ActionButtons.tsx    # Botones estandarizados (Ver, Editar, Eliminar)
│   │       ├── AppButton.tsx        # Botón multi-variante (primary, secondary, danger, etc.)
│   │       ├── FormModal.tsx        # Modal responsivo con soporte para teclado móvil
│   │       ├── ScreenLayout.tsx     # Cabecera institucional + Sidebar Drawer móvil
│   │       └── SearchBar.tsx        # Barra de filtrado en tiempo real
│   └── features/                    # Módulos independientes
│       ├── usuarios/
│       ├── proveedores/
│       ├── clientes/
│       ├── plantas/
│       └── especies/
└── App.tsx                          # Enrutador principal de vistas del prototipo

```

---

## 🚀 Instalación y Ejecución Local

### Prerrequisitos

* **Node.js** (v18 o superior)
* **npm** o **yarn**
* Aplicación **Expo Go** instalada en tu dispositivo Android / iOS (o un emulador configurado)

### Pasos para iniciar

1. **Clonar el repositorio:**
```bash
git clone https://github.com/Team-Project-Org-2025/sys-inescolara-mobile.git
cd sys-inescolara-mobile
```


2. **Instalar dependencias:**
```bash
npm install

```


3. **Iniciar el servidor de desarrollo de Expo:**
```bash
npx expo start

```


4. **Visualizar el prototipo:**
* **En teléfono físico:** Escanea el código QR generado en la terminal usando **Expo Go** (asegúrate de estar en la misma red Wi-Fi).
* **En navegador web:** Presiona la tecla `w` en la terminal para abrirlo en `http://localhost:8081` y activa la vista móvil desde las herramientas de desarrollador (`F12`).



---

## 👥 Equipo y Licencia

Desarrollado por **Team-Project-Org-2026** para el **Instituto de Ecosocialismo del Estado Lara (INECOLARA)**.

Este proyecto se distribuye bajo la licencia **MIT** — consulta el archivo [`LICENSE`](https://www.google.com/search?q=./LICENSE) para más detalles.
