# Skill Zone - Ultra Premium E-Commerce Learning Platform

A full-stack portfolio project built with Node.js, React, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or cloud)

### Local Development

1. **Install dependencies:**
```bash
npm install
cd server && npm install
cd ../client && npm install
```

2. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and settings
```

3. **Seed the database:**
```bash
cd server && npm run seed
```

4. **Start development servers:**
```bash
# From root directory
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Admin: http://localhost:5173/admin

### Default Admin Credentials
- Email: `admin@skillzone.com`
- Password: `admin123`

---

## 📁 Project Structure

```
skill-zone/
├── client/                 # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── admin/         # Admin panel components
│   │   ├── components/    # Shared components
│   │   ├── pages/         # Page components
│   │   └── styles/        # CSS files
│   └── package.json
├── server/                 # Express backend
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seeder.js
│   └── server.js
├── .env                    # Environment variables
├── ecosystem.config.js     # PM2 config for Plesk
└── package.json
```

---

## 🌐 Plesk Deployment Guide

### Step 1: Prepare the Server

1. Log into Plesk panel
2. Ensure Node.js extension is enabled
3. Create a new domain or subdomain

### Step 2: Upload Files

1. Upload all project files to your domain's root
2. Exclude `node_modules` folders

### Step 3: Configure Node.js

1. Go to **Node.js** settings in Plesk
2. Set Document Root: `/client/dist`
3. Set Application Root: `/`
4. Set Application Startup File: `server/server.js`
5. Click **Enable Node.js**

### Step 4: Set Environment Variables

In Plesk Node.js settings, add:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-production-secret-key
JWT_EXPIRE=30d
CLIENT_URL=https://yourdomain.com
ADMIN_EMAIL=admin@skillzone.com
ADMIN_PASSWORD=your-secure-password
```

### Step 5: Build & Install

Via SSH or Plesk Terminal:
```bash
cd /var/www/vhosts/yourdomain.com/httpdocs

# Install dependencies
npm install --prefix server --production
npm install --prefix client
npm run build --prefix client

# Seed database (first time only)
cd server && node seeder.js
```

### Step 6: Restart Application

Click **Restart App** in Plesk Node.js panel

---

## 📚 Course Categories

| Category | Description |
|----------|-------------|
| Amazon Wholesale | VA training for wholesale model |
| Private Label | Build your own brand on Amazon |
| AI & ML | Python, TensorFlow, practical projects |
| Web Development | Full-stack modern development |
| eBay | Selling strategies on eBay |
| Etsy | Handmade & digital products |
| Walmart | Walmart Marketplace selling |

---

## 🔧 API Endpoints

### Public Routes
- `GET /api/courses` - List all courses
- `GET /api/courses/:slug` - Get single course
- `GET /api/courses/categories` - Get category counts
- `POST /api/auth/login` - Admin login

### Admin Routes (Protected)
- `GET /api/admin/courses` - List all courses
- `POST /api/admin/courses` - Create course
- `PUT /api/admin/courses/:id` - Update course
- `PUT /api/admin/courses/:id/price` - Update price
- `DELETE /api/admin/courses/:id` - Delete course
- `GET /api/admin/stats` - Dashboard stats

---

## 🎨 Design Features

- **Light Mode Premium UI**
- Glassmorphism effects
- Smooth animations
- Responsive design
- Premium typography (Inter + Plus Jakarta Sans)
- Custom gradient accents

---

## 📄 License

MIT License - Feel free to use for your portfolio!
