# Building a Next.js Template: shadcn/ui, Zustand, and Zod

*How to combine shadcn/ui, Zustand, and Zod in a Next.js app—and where each tool fits in a layered architecture.*

---

In the [previous post](https://medium.com/@your-handle/domains-features-core-nextjs), we introduced the Domains + Features + Core architecture for Next.js. This post focuses on the **tech stack**: the specific tools we use to implement that architecture and how they work together.

We'll use the [next-starter-kit](https://github.com/sandylib/next-starter-kit) as our reference—a template with a shopping cart demo, contact form, and product listing. No backend required.

---

## The Stack at a Glance

| Tool | Role | Where It Lives |
|------|------|----------------|
| **shadcn/ui** | Accessible, copy-paste components | `components/ui/`, used by features |
| **Zustand** | Client state (cart, UI state) | `features/*/stores/` |
| **Zod** | Schema validation, type inference | `features/*/schemas/`, domain types |
| **react-hook-form** | Form state and submission | Feature components |
| **next-themes** | Dark/light mode | Core layout |

---

## shadcn/ui: Components You Own

[shadcn/ui](https://ui.shadcn.com/) isn't a component library you install from npm—you add components to your repo. They live in `src/components/ui/` and you can edit them. No black box.

Why shadcn for this template?

- **Tailwind-native** — Uses utility classes. Fits our Tailwind v4 setup.
- **Accessible** — Built on Radix UI primitives. Keyboard nav, ARIA, focus management.
- **Customizable** — It's your code. Change colors, spacing, behavior.
- **No lock-in** — No `@shadcn/react` package. Just components in your project.

Example: the cart uses `Sheet` for the slide-out panel, `Badge` for the item count, `Button` and `Card` throughout. All live in `components/ui/` and follow your design tokens.

```typescript
// From CartSheet.tsx
<Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>{t('title')}</SheetTitle>
      ...
    </SheetHeader>
    {items.map((item) => (
      <CartItemRow key={item.productId} item={item} ... />
    ))}
    <CartSummary ... />
  </SheetContent>
</Sheet>
```

**Where it fits:** Features import from `@/components/ui`. The UI layer is shared infrastructure—features don't implement their own buttons or dialogs.

---

## Zustand: Client State Without Boilerplate

For client-only state (cart items, sidebar open/closed, theme), we use [Zustand](https://zustand-demo.pmnd.rs/). It's minimal: create a store, use it in components. No providers, no context drilling.

The cart store:

```typescript
// features/cart/stores/cartStore.ts
export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (newItem) =>
    set((state) => {
      const existing = state.items.find((i) => i.productId === newItem.productId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === newItem.productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { ...newItem, quantity: 1 }] };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.productId !== productId),
    })),

  getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  getTotalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  // ...
}));
```

Usage in components:

```typescript
const totalItems = useCartStore((s) => s.getTotalItems());
const addItem = useCartStore((s) => s.addItem);
```

**Where it fits:** In the Features layer. Cart state is UI state—it doesn't belong in domains. Domains define types (`CartItem`); the store holds the runtime state and actions.

---

## Zod: Validation and Types in One Place

[Zod](https://zod.dev/) gives you schemas that double as validators and TypeScript types. Define once, use for runtime validation and type inference.

Contact form schema:

```typescript
// features/contact/schemas/contact-form.schema.ts
export const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required').min(2, 'Must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name is required').min(2, 'Must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(1, 'Message is required').min(10, 'Message must be at least 10 characters'),
  subscribe: z.boolean(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
```

With `@hookform/resolvers`, we wire Zod to react-hook-form:

```typescript
const form = useForm<ContactFormValues>({
  resolver: zodResolver(contactFormSchema),
  defaultValues: { firstName: '', lastName: '', ... },
});

// FormField components get type-safe control and validation
<FormField control={form.control} name="email" ... />
```

**Where it fits:** Feature schemas for forms; domain types for API contracts. Zod keeps validation and types in sync—no manual `interface` that drifts from runtime checks.

---

## How They Work Together

1. **Display (products)** — Domain API returns data → Feature hook (`useProducts`) fetches it → Components render with shadcn `Card`, `Badge`, `Button`.
2. **Collect (cart)** — User clicks "Add to Cart" → Feature calls `useCartStore.getState().addItem(product)` → Zustand updates → Cart sheet re-renders.
3. **Collect (form)** — User submits contact form → Zod validates via `zodResolver` → react-hook-form calls `onSubmit` with typed data → Toast confirms.

The architecture separates *what* (domains) from *how* (features). The tech stack implements the *how*: shadcn for UI, Zustand for client state, Zod for validation.

---

## Practical Takeaways

- **shadcn/ui** — Add only the components you need. Keep them in `components/ui/` and customize as you go.
- **Zustand** — Use for client-only state. Keep stores in features. Domain types define the shape; the store holds the data.
- **Zod** — Use for forms and API boundaries. `z.infer<>` gives you types; `zodResolver` connects to react-hook-form.

---

## Try the Template

The full template is on GitHub:

```bash
git clone https://github.com/sandylib/next-starter-kit
cd next-starter-kit
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Browse products, add to cart, submit the contact form. Everything runs with mock data—no API server needed.

---

*Previous post:* [Domains + Features + Core: A Layered Architecture for Next.js](https://medium.com/@your-handle/domains-features-core-nextjs)  
*Template:* [next-starter-kit on GitHub](https://github.com/sandylib/next-starter-kit)
