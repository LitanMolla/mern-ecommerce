require('node:dns').setServers(['1.1.1.1', '8.8.8.8'])
require('dotenv').config()
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const express = require('express')
const cors = require('cors')
const dbConnection = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const { userMiddleware, adminMiddleware } = require('./middlewares/roleMiddlewares')
const adminRoutes = require('./routes/adminRoutes')

const app = express()

// middlewares
app.use(express.json())
app.use(cors())
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userMiddleware, userRoutes)
app.use('/api/v1/admin', adminMiddleware, adminRoutes)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const PORT = process.env.PORT || 8000
dbConnection()

app.listen(PORT, () => { console.log(`Server is running on port: ${PORT}`) })