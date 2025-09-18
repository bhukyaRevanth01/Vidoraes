import  jwt  from 'jsonwebtoken'
import dotenv  from "dotenv"
dotenv.config();

function tokenWare(req,res,next){

const myString = req.headers.authorization;


const myTokenPart = myString?.split(' ')[1]

const tokes = myTokenPart.replace(/"/g, "")

console.log("checkingggg ",tokes)
   jwt.verify(tokes,process.env.REACT_APP_my_Secret_key,(error,decode)=>{
 if(decode){
    req.body = decode
    next()
 }else{
    console.log(`error at : ${error}`)

 }
   })
}
function Adminware(req,res,next){
const myString = req.headers.authorization;

const myTokenPart = myString?.split(' ')[1]
const tokes = myTokenPart.replace(/"/g, "")

   jwt.verify(tokes,process.env.REACT_APP_my_Secret_key,(error,decode)=>{
 if(decode){
    req.body = decode
    console.log('checking' ,req.body)
    next()
 }else{
    console.log(`error at : ${error}`)

 }})
}
function Userware(req,res,next){
const myString = req.headers.authorization;

const myTokenPart = myString?.split(' ')[1]
const tokes = myTokenPart.replace(/"/g, "")

   jwt.verify(tokes,process.env.REACT_APP_my_Secret_key,(error,decode)=>{
 if(decode){
    req.body = decode
    console.log('checking' ,req.body)
    next()
 }else{
    console.log(`error at : ${error}`)

 }
   })

}

function  controlVideoprvtPub(req,res,next){
const myString = req.headers.authorization;

const myTokenPart = myString?.split(' ')[1]
const tokes = myTokenPart.replace(/"/g, "")

   jwt.verify(tokes,process.env.REACT_APP_my_Secret_key,(error,decode)=>{
 if(decode){
    req.body = decode
    console.log('pub&pvt' ,req.body)
    next()
 }else{
    console.log(`error at : ${error}`)

 }
   })

}

export{
    tokenWare,
    Adminware,
    Userware,
    controlVideoprvtPub
 }