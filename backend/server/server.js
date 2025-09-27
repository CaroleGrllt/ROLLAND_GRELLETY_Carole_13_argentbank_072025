const express = require('express')
const dotEnv = require('dotenv')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
const swaggerDocs = yaml.load('./swagger.yaml')
// SWITCH LIGNES 8 ET 9 POUR SE CONNECTER LOCALEMENT OU DB DISTANTE
//ACTUELLEMENT EN DB
dotEnv.config()
const dbConnection = require('./database/connection')

const app = express()
const PORT = process.env.PORT || 3001

// Connect to the database
dbConnection()

// Handle CORS issues
app.use(cors({
  origin: [
    'https://CaroleGrllt.github.io',
    'https://CaroleGrllt.github.io/ROLLAND_GRELLETY_Carole_13_argentbank_072025/'
  ],
  credentials: true
}))

// Request payload middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handle custom routes
app.use('/api/v1/user', require('./routes/userRoutes'))

// API Documentation
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

app.get('/', (req, res, next) => {
  res.send('Hello from my Express server v2!')
})

app.get('/healthz', (_req, res) => res.send('ok'))

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`)
})
