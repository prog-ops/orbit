# 🛰️ Orbit — React Store

> A modern online store application built with React + TypeScript that is lightweight, fast, and fully client-side.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.x-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![Zustand](https://img.shields.io/badge/Zustand-5.x-433E38?logo=react&logoColor=white)](https://zustand-demo.pmnd.rs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture & Project Structure](#-architecture--project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [NPM Scripts](#-npm-scripts)
- [State Management](#-state-management)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 About the Project

**Orbit** is a frontend online store application designed as a modern starter kit for building e-commerce interfaces. This project emphasizes:

- **Performance**: built with Vite and React 19, making hot reload and production builds very fast.
- **Type Safety**: all code is written in TypeScript to minimize runtime errors.
- **Modular Architecture**: clear separation between `features`, `services`, `hooks`, and `store`.
- **Zero Backend**: all product data is mock (dummy), making it easy to replace with a real API later.

This project is suitable as:
- A learning reference for modern React architecture.
- A starter template for small to medium-scale e-commerce applications.
- A playground for experimenting with the TanStack Query + Zustand combination.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🛍️ **Product Catalog** | Displays a list of products from a mock service with prices in NT$ (New Taiwan Dollar). |
| 🛒 **Shopping Cart** | Add, decrease, and remove items from the cart using a Zustand store. |
| 🔔 **Toast Notifications** | Visual feedback when a user adds a product to the cart. |
| ⚡ **Smart Data Fetching** | Uses TanStack Query for caching, refetching, and stale-while-revalidate. |
| 🎨 **Modern Icons** | Uses Lucide React for lightweight SVG-based icons. |
| 📱 **Responsive** | Layout adapts for desktop, tablet, and mobile. |
| 🧩 **Type-Safe** | All entities (`Product`, `CartItem`, `ToastMessage`) are defined as TypeScript types. |

---

## 🛠️ Tech Stack

### Core
- **[React 19](https://react.dev)** — Component-based UI library.
- **[TypeScript](https://www.typescriptlang.org)** — JavaScript superset with static typing.
- **[Vite](https://vitejs.dev)** — Next-generation, extremely fast build tool.

### Data & State Management
- **[TanStack Query v5](https://tanstack.com/query)** — Server state management (fetching, caching, synchronization).
- **[Zustand](https://zustand-demo.pmnd.rs)** — Lightweight client state management for the shopping cart.

### UI & Utilities
- **[Lucide React](https://lucide.dev)** — Consistent and easily customizable SVG icons.

---

## 🏗️ Architecture & Project Structure

This project applies a **feature-based architecture**, where each feature domain is grouped in its own folder.

```
orbit/
├── public/                     # Static assets (favicon, public images)
├── src/
│   ├── features/               # Feature modules (domain-driven)
│   │   ├── products/           # Everything related to products
│   │   │   ├── services/       # productService.ts — product data source (mock)
│   │   │   ├── hooks/          # useProducts.ts — TanStack Query hook
│   │   │   └── components/     # Product-specific UI components
│   │   └── cart/               # Everything related to the cart
│   │       ├── store/          # cartStore.ts — Zustand store
│   │       └── components/     # Cart UI components
│   ├── shared/                 # Cross-feature components & utilities
│   │   ├── components/         # Button, Card, Toast, etc.
│   │   └── utils/              # Helper functions (price formatting, etc.)
│   ├── types/                  # Global type definitions (Product, CartItem, etc.)
│   ├── App.tsx                 # Application root component
│   └── main.tsx                # React entry point
├── .env.example                # Example environment variables (no sensitive values)
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Data Flow

```
┌────────────────────┐
│  productService.ts │  ← Mock data (can be replaced with REST/GraphQL)
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│   useProducts.ts   │  ← TanStack Query (caching, refetch)
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐      ┌──────────────────┐
│ Product Components │─────▶│   cartStore.ts   │  ← Zustand (cart state)
└────────────────────┘      └────────┬─────────┘
                                     │
                                     ▼
                            ┌──────────────────┐
                            │ Cart Components  │
                            └──────────────────┘
```

**Separation principles:**
- **TanStack Query** manages server state (data from outside the application).
- **Zustand** manages client state (UI state specific to the user session).

---

## 📋 Prerequisites

Make sure your device has the following installed:

- **Node.js** version `18.x` or newer → [Download](https://nodejs.org)
- **npm** `9.x+` (usually included with Node.js) or **pnpm** / **yarn** (optional)
- **Git** → [Download](https://git-scm.com)

Verify the installation:

```bash
node -v   # example: v20.11.0
npm -v    # example: 10.2.4
```

---

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/prog-ops/orbit.git
   cd orbit
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   or if using pnpm:

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Copy the example file:

   ```bash
   cp .env.example .env
   ```

   > **Note:** This project does not require any credentials because all data is mock. The `.env` file is only provided as a place for future configuration (e.g., `VITE_API_BASE_URL` when the backend is ready).

---

## ▶️ Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 📜 NPM Scripts

| Script | Function |
|---|---|
| `npm run dev` | Starts the development server with HMR. |
| `npm run build` | Runs type-checking and production build to `dist/`. |
| `npm run preview` | Runs a local preview of the production build. |
| `npm run lint` | Runs ESLint to check code quality. |

---

## 🧠 State Management

This project separates state into two categories:

### 1. Server State — TanStack Query

Used for data that comes from external sources (API/mock service).

```tsx
// src/features/products/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/productService';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
```

**Advantages:**
- Automatic caching.
- Background refetch when the window regains focus.
- Consistent handling of `loading`, `error`, and `success` states.

### 2. Client State — Zustand

Used for state that is only relevant during the user session, such as cart contents.

```tsx
// src/features/cart/store/cartStore.ts
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: [],
  addItem: (product) => set((state) => ({ items: [...state.items, product] })),
  removeItem: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
  clearCart: () => set({ items: [] }),
}));
```

**Advantages:**
- Minimalist API without excessive boilerplate.
- No `Provider` required at the application root.
- Very lightweight (~1KB).

---

## 🤝 Contributing

Contributions are always welcome! Follow these steps:

1. Fork this repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit changes with a descriptive message (follow [Conventional Commits](https://www.conventionalcommits.org/)):
   ```bash
   git commit -m "feat: add product category filter"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request and explain your changes in detail.

### Code Style Guidelines
- Use **TypeScript** for all new files (`.ts` / `.tsx`).
- Follow the configured ESLint rules.
- Name components with **PascalCase**, hooks with the **use** prefix, and utilities with **camelCase**.
- Include JSDoc comments for complex functions.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

<p align="center">
  <sub>© 2025 prog-ops · Orbit React Store</sub>
</p>
