import express from 'express'
import  {mymongodbConnection} from './connection/connect.js'
import dotenv  from 'dotenv'
import cors  from 'cors'
import {route} from './router/routers.js'
import {Server} from 'socket.io'
import http from 'http'
import {socketStore} from './router/socketRouter.js'
import path  from 'path'
 mymongodbConnection('mongodb+srv://admin:admin@first.axg22.mongodb.net/?retryWrites=true&w=majority&appName=first')
dotenv.config()
const app = express()


app.use(express.json())

app.use(cors({
    origin:path,
  method:[],
  Credential:true
}))

app.use(route)

const server = http.createServer(app)

const io = new Server(server,{cors:{
  origin:path,
  method:[],
  Credential:true
 }})

socketStore(io)



server.listen(process.env.serverNo,()=>{
    console.log('we working on socket')
})

