 // server.js
const path = require('path');

// Load .env with absolute path + override any pre-injected values
require('dotenv').config({
  path:     path.resolve(__dirname, '.env'),
  override: true,
});

const express          = require('express');
const cors             = require('cors');
const morgan           = require('morgan');
const fs               = require('fs');
const connectDB        = require('./config/db');
const modelRoutes      = require('./routes/modelRoutes');
const uploadRoutes     = require('./routes/uploadRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const errorHandler     = require('./middleware/errorHandler');

// ── Confirm env is loaded ─────────────────────────────
console.log('📁 Looking for .env at:', path.resolve(__dirname, '.env'));
console.log('✅ MONGO_URI:', process.env.MONGO_URI
  ? process.env.MONGO_URI.substring(0, 35) + '...'
  : '❌ NOT FOUND'
);

// ── Connect to MongoDB ────────────────────────────────
connectDB();

const app = express();

// ── Ensure uploads dir exists ─────────────────────────
const uploadDir = process.env.UPLOAD_PATH || './uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// ── Middleware ────────────────────────────────────────
app.use(cors({
origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Routes ────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Regulus API is running' });
});

app.use('/api/models',     modelRoutes);
app.use('/api/upload',     uploadRoutes);
app.use('/api/newsletter', newsletterRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

app.use(errorHandler);

// ── Start ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚗 Regulus running on http://localhost:${PORT}\n`);
});
