# Domains + Features + Core: A Layered Architecture for Next.js

*How to structure a Next.js frontend so your application core stays independent of UI and data sources—inspired by Hexagonal Architecture.*

---

If you've ever watched business logic creep into your React components, or struggled to test code that's tangled with API calls and UI state, you're not alone. The solution isn't another framework—it's a clear separation of concerns.

This post introduces **Domains + Features + Core**, a layered architecture for Next.js that keeps your application testable, swappable, and easy to reason about. I'll walk through a real template: [next-starter-kit](https://github.com/sandylib/next-starter-kit), which includes a shopping cart demo you can run locally with zero backend.

---

## The Problem: Entangled Layers

Alistair Cockburn's [Hexagonal (Ports & Adapters) Architecture](https://alistair.cockburn.us/hexagonal-architecture) describes a core insight:

> *"Create your application to work without either a UI or a database so you can run automated regression-tests against the application, work when the database becomes unavailable, and link applications together without any user involvement."*

The key is **inside-outside asymmetry**: the application core should not depend on external details. Whether data comes from a REST API, a mock, or a GraphQL endpoint, the core logic stays the same.

On the frontend, we face a similar problem. React components often mix:

- Data fetching
- Business logic
- UI rendering
- Form state

When everything lives in `page.tsx` or scattered across components, testing is hard, reuse is limited, and swapping a mock API for a real one means touching dozens of files.

---

## The Solution: Three Layers

**Domains + Features + Core** applies the same principle to a Next.js app:

| Layer | Purpose | Can Import From |
|-------|---------|-----------------|
| **domains/** | Pure data: API functions, types, mappers. No React. | `core/` only |
| **features/** | React components, hooks, stores. Consume domains. | `domains/`, `core/`, `features/layout` |
| **core/** | Shared infrastructure: config, formatters, i18n. | Nothing above it |
| **app/** | Composition root. Routes and layouts. | `features/`, `core/` only |

The rule: **dependencies point inward**. Domains don't know about React. Features don't import from other features (except shared layout). The app composes features—it doesn't contain business logic.

---

## Layer 1: Domains (Pure Data)

Domains hold API calls, types, and data transformation. **No React.** No `useState`, no `useEffect`, no JSX.

Example from the products domain:

```
src/domains/products/
├── api/
│   └── products.api.ts      # fetchAll, fetchById
├── types/
│   └── products.types.ts    # Product interface
├── data/
│   └── products.data.ts    # Mock product array
└── index.ts                 # Public exports
```

The API layer exposes async functions. In the template, they return mock data with a simulated delay. In production, you swap in real HTTP calls—the rest of the app doesn't change.

```typescript
// domains/products/api/products.api.ts
export async function fetchAll(): Promise<Product[]> {
  await delay(SIMULATED_DELAY_MS);
  return [...MOCK_PRODUCTS];
}

// In production, swap for:
// return httpClient.get<Product[]>('/products');
```

The domain's `index.ts` is the **port**—the public contract. Features call `productsApi.fetchAll()`, not internal files.

---

## Layer 2: Features (UI)

Features contain React components, hooks, and stores. They **consume** domains via hooks—never by importing domain internals directly.

Example: `useProducts` wraps the domain API:

```typescript
// features/products/hooks/useProducts.ts
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    productsApi.fetchAll().then((data) => {
      setProducts(data);
      setIsLoading(false);
    });
  }, []);

  return { products, isLoading };
}
```

The page uses the feature hook, not the domain:

```typescript
// app/[locale]/(main)/products/page.tsx
const { products, isLoading } = useProducts();
```

Features can import from `domains/` and `core/`, but **not from other features** (except `layout` and `shared`). That keeps features independent and reusable.

---

## Layer 3: Core (Infrastructure)

Core holds shared infrastructure: config, formatters, i18n, HTTP client (when you add one). It never imports from domains or features.

```typescript
// core/constants/index.ts
export const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatPrice(price: number): string {
  return CURRENCY_FORMATTER.format(price);
}
```

---

## Import Flow Diagram

```
app/       → features/, core/              (never domains/ directly)
features/  → domains/, core/, features/layout
domains/   → core/ only
core/      → nothing above it
```

The app is the composition root. It wires features together. It does not contain business logic or call domain APIs directly—it uses feature hooks.

---

## Why This Works

1. **Testability** — Domains are pure functions. Test `productsApi.fetchAll()` without React or a browser.
2. **Swappability** — Replace mock data with real HTTP by changing one file in the domain. Features stay unchanged.
3. **Clarity** — Need product types? Look in `domains/products`. Need the product grid? Look in `features/products`.
4. **Alignment with Hexagonal Architecture** — Domains are the "inside"; features and core are adapters. The same principle, adapted for frontend.

---

## Try It Yourself

The [next-starter-kit](https://github.com/sandylib/next-starter-kit) repo includes:

- A products page with a responsive grid
- A shopping cart (client-side, no backend)
- A contact form with validation
- Full Domains + Features + Core structure

Clone it, run `npm install && npm run dev`, and explore. No API server needed—everything runs with mock data.

```bash
git clone https://github.com/sandylib/next-starter-kit
cd next-starter-kit
npm install
npm run dev
```

---

## Next Steps

In the next post, we'll dive into the **tech stack**: shadcn/ui for components, Zustand for client state, and Zod for validation. We'll see how these tools fit into the architecture and how to use them together effectively.

---

*References:*
- [Hexagonal Architecture (Ports & Adapters) — Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture)
- [next-starter-kit — GitHub](https://github.com/sandylib/next-starter-kit)
