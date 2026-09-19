# Workshop build order

Use this as a study/checklist for rebuilding the client yourself.

1. Create Vite React project and install Tailwind.
2. Add React Router and create public, user and admin layouts.
3. Create API modules for auth, category, product, user, admin and Stripe.
4. Add Zustand store with persisted login token and cart.
5. Build the main navigation and public routes.
6. Build Login/Register and role-based navigation.
7. Build Shop + search by text/category/price.
8. Build Cart + quantity/remove/total.
9. Build Checkout that sends `{ cart }` to `/user/cart` and saves address.
10. Build Stripe Payment page using `/user/create-payment-intent`.
11. Build order history from `/user/order`.
12. Build Admin sidebar/layout.
13. Build Category CRUD.
14. Build Product create/edit/delete + image upload.
15. Build User management (role/enabled).
16. Build Order management and status updates.

## Run

```bash
npm install
```

Create `.env` from `.env.example`, then:

```bash
npm run dev
```

Backend expected by default: `http://localhost:5001/api`.
