# E-commerce Workshop Server

Backend API สำหรับ client workshop

## 1. เตรียม MySQL

สร้างฐานข้อมูล:

```sql
CREATE DATABASE roitai_ecom;
```

ค่าเริ่มต้นใน `.env`:

```env
DATABASE_URL="mysql://root:1234@localhost:3306/roitai_ecom"
```

แก้ user/password/database ให้ตรงกับ MySQL ของเครื่อง

## 2. ติดตั้ง package

```bash
npm install
```

## 3. สร้างตารางด้วย Prisma

```bash
npx prisma generate
npx prisma db push
```

## 4. รัน server

```bash
npm run dev
```

Server:

```text
http://localhost:5001
```

ทดสอบ:

```text
GET http://localhost:5001/api/health
```

## 5. สร้าง Admin

สมัคร user ผ่าน `/api/register` ก่อน จากนั้นเปิด Prisma Studio:

```bash
npx prisma studio
```

แก้ `role` ของ user เป็น:

```text
admin
```

## Environment

- `SECRET` JWT secret
- `DATABASE_URL` MySQL connection string
- `CLOUDINARY_*` ใช้สำหรับ upload รูป
- `STRIPE_SECRET_KEY` Stripe secret key
- `CLIENT_URL` URL ของ Vite client

## API หลัก

- `POST /api/register`
- `POST /api/login`
- `POST /api/current-user`
- `POST /api/current-admin`
- `GET /api/category`
- `POST /api/category`
- `DELETE /api/category/:id`
- `GET /api/products/:count`
- `GET /api/product/:id`
- `POST /api/product`
- `PUT /api/product/:id`
- `DELETE /api/product/:id`
- `POST /api/search/filters`
- `POST /api/productby`
- `POST /api/images`
- `POST /api/removeimages`
- `POST /api/user/cart`
- `GET /api/user/cart`
- `DELETE /api/user/cart`
- `POST /api/user/address`
- `POST /api/user/create-payment-intent`
- `POST /api/user/order`
- `GET /api/user/order`
- `GET /api/admin/orders`
- `PUT /api/admin/order-status`
- `GET /api/users`
- `POST /api/change-status`
- `POST /api/change-role`
