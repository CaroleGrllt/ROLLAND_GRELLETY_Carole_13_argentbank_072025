const express = require('express')
const dotEnv = require('dotenv')
// ❌ plus besoin de: const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
const swaggerDocs = yaml.load('./swagger.yaml')

//ACTUELLEMENT EN DB (switch lignes 9-10 pour local/db)
dotEnv.config()
const dbConnection = require('./database/connection')

const app = express()
const PORT = process.env.PORT || 3001

// Connect to the database
dbConnection()

// ================= CORS (placer AVANT les autres middlewares & routes) =================
const allowedOrigins = ['http://localhost:5173', 'https://carolegrllt.github.io']

app.use((req, res, next) => {
  const origin = req.headers.origin
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin) // <- envoie l’origine exacte
    res.header('Vary', 'Origin')
  }
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')

  if (req.method === 'OPTIONS') return res.sendStatus(204) // préflight OK
  next()
})
// ======================================================================

// Request payload middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handle custom routes
app.use('/api/v1/user', require('./routes/userRoutes'))

// API Documentation
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

app.get('/', (req, res) => {
  res.send('Hello from my Express server v2!')
})

app.get('/healthz', (_req, res) => res.send('ok'))

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`)
})
