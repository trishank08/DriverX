import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { randomUUID } from 'node:crypto'
import { cars } from './data/cars.js'
import { requireAuth } from './middleware/auth.js'

const app = express()
const PORT = process.env.PORT || 5001
const users = []
const favourites = new Map()

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())

function makeToken(user) {
  return jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET || 'drivex_local_secret', { expiresIn: '7d' })
}
function sendToken(res, user) {
  const token = makeToken(user)
  res.cookie('drivex_token', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 })
  return res.json({ message: 'Welcome to DriveX!', user: { id: user.id, name: user.name, email: user.email } })
}

app.get('/api/health', (_, res) => res.json({ status: 'ok', service: 'DriveX API' }))

app.get('/api/cars', (req, res) => {
  const { q = '', type, brand, maxPrice } = req.query
  const term = q.toLowerCase()
  const results = cars.filter(car => `${car.brand} ${car.model} ${car.type}`.toLowerCase().includes(term) && (!type || car.type === type) && (!brand || car.brand === brand) && (!maxPrice || car.price <= Number(maxPrice)))
  res.json({ count: results.length, cars: results })
})

app.get('/api/cars/:id', (req, res) => {
  const car = cars.find(item => item.id === req.params.id)
  if (!car) return res.status(404).json({ message: 'Car not found.' })
  res.json({ car })
})

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required.' })
  if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters.' })
  if (users.some(user => user.email === email.toLowerCase())) return res.status(409).json({ message: 'An account with this email already exists.' })
  const user = { id: randomUUID(), name: name.trim(), email: email.toLowerCase(), password: await bcrypt.hash(password, 10) }
  users.push(user)
  sendToken(res.status(201), user)
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  const user = users.find(item => item.email === email?.toLowerCase())
  if (!user || !(await bcrypt.compare(password || '', user.password))) return res.status(401).json({ message: 'Invalid email or password.' })
  sendToken(res, user)
})

app.post('/api/auth/logout', (_, res) => {
  res.clearCookie('drivex_token')
  res.json({ message: 'Logged out successfully.' })
})

app.get('/api/auth/me', requireAuth, (req, res) => res.json({ user: req.user }))

app.get('/api/favourites', requireAuth, (req, res) => res.json({ favourites: [...(favourites.get(req.user.id) || [])] }))
app.put('/api/favourites/:carId', requireAuth, (req, res) => {
  if (!cars.some(car => car.id === req.params.carId)) return res.status(404).json({ message: 'Car not found.' })
  const saved = new Set(favourites.get(req.user.id) || [])
  saved.has(req.params.carId) ? saved.delete(req.params.carId) : saved.add(req.params.carId)
  favourites.set(req.user.id, saved)
  res.json({ favourites: [...saved] })
})

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body
  if (!name || !email || !message) return res.status(400).json({ message: 'Name, email and message are required.' })
  if (process.env.MAIL_HOST && process.env.MAIL_USER && process.env.MAIL_PASS) {
    const transporter = nodemailer.createTransport({ host: process.env.MAIL_HOST, port: Number(process.env.MAIL_PORT || 587), secure: false, auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS } })
    await transporter.sendMail({ from: process.env.MAIL_USER, to: process.env.MAIL_TO || process.env.MAIL_USER, replyTo: email, subject: `DriveX enquiry from ${name}`, text: message })
  } else {
    console.log('New DriveX contact message:', { name, email, message })
  }
  res.status(201).json({ message: 'Thanks! Your request has been received.' })
})

app.use((err, _req, res, _next) => { console.error(err); res.status(500).json({ message: 'Something went wrong. Please try again.' }) })
app.listen(PORT, () => console.log(`DriveX API running at http://localhost:${PORT}`))
