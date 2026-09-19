# E-Commerce Workshop Client (clean-room rebuild)

This client was written from scratch to reproduce the public workshop application's routes and API behavior without copying the original client source verbatim.

## Requirements
- Node.js 20+
- Workshop backend running on port 5001 (or change VITE_API_URL)
- Stripe publishable key for the payment page

## Start
```bash
npm install
cp .env.example .env
npm run dev
```

On Windows PowerShell:
```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

## Environment
```env
VITE_API_URL=http://localhost:5001/api
VITE_STRIPE_PK=pk_test_your_key_here
```

## Routes
- `/` Home
- `/shop` Product search/filter
- `/cart` Cart
- `/checkout` Address + server cart
- `/login`, `/register`
- `/user/payment`, `/user/history`
- `/admin`, `/admin/manage`, `/admin/category`, `/admin/product`, `/admin/orders`

## Important backend note
The workshop server's Stripe controller must contain a valid Stripe secret key before `/user/create-payment-intent` can work.
