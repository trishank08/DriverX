import jwt from 'jsonwebtoken'

export function requireAuth(req, res, next) {
  const token = req.cookies.drivex_token || req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ message: 'Please log in first.' })
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'drivex_local_secret')
    next()
  } catch {
    return res.status(401).json({ message: 'Your session has expired. Please log in again.' })
  }
}
