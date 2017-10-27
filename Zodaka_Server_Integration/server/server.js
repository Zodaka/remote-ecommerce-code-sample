import dotenv from 'dotenv'
dotenv.config()

import '@babel/polyfill'

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import merchantAPI from './routes'
import notFound from './notFound'
import errorHandler from './errorHandler'

const server = express()
const port = 8080

server.use(bodyParser.json())
server.use(cors())
server.use('/', merchantAPI)
server.use('*', notFound)
server.use(errorHandler)

server.listen(port, () => console.log(`Merchant's REMOTE-E-COMMERCE demo server running on port: ${port}`))