# Buscar Cep e Imobiliarias NODE-RED

### Prerequisites

- Node.js (v18+)
- Node-RED
- PostgreSQL (optional, for saving CEP data)

### 1. Node-RED Setup

Install Node-RED globally:
```bash
npm install -g node-red
```

Install PostgreSQL module (optional):
```bash
cd ~/.node-red
npm install node-red-contrib-postgresql
```

Start Node-RED:
```bash
node-red
```

Access Node-RED at: `http://localhost:1880`

1. Open Node-RED editor (`http://localhost:1880`)
2. Click the hamburger menu (☰) → **Import**
3. Select the `flows.json` file from this repository
4. Click **Import**
5. Click **Deploy** (red button)

### 2. Configure PostgreSQL (Optional)

If you want to save CEP searches:

1. Create the database table:
```sql
CREATE TABLE ceps_buscados (
    id SERIAL PRIMARY KEY,
    cep VARCHAR(8) NOT NULL,
    street VARCHAR(255),
    neighborhood VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(2),
    latitude VARCHAR(50),
    longitude VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

2. Double-click any PostgreSQL node in Node-RED
3. Configure your database connection
4. Click **Done** and **Deploy**

### 3. Frontend Setup


Navigate to the frontend directory:
```bash
cd .\buscador-nodered\
```


Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Access the app at: `http://localhost:5173`