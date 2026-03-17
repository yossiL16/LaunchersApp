import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectMongo } from './utils/connectDB.js';
import { validationOfBody } from './utils/middleware.js';
import { createToken, tokenVerify } from './utils/jwt.js';

const app = express();
app.use(express.json());
app.use(cors());


const port = process.env.PORT

const db = await connectMongo({
    uri : process.env.URI,
    name : process.env.DB_NAME
})


app.get('/api/launchers', tokenVerify, async (req,res) => {
    try{
        const launchers = await db.collection('Launcher').find().toArray();
        if(launchers.length === 0) return res.status(200).json({launchers: []})
        return res.status(200).json({launchers})
    } catch(e){
        res.status(500).json({message: "The server is not responding, please try later.",
                error: e.message
        })
    }
});


app.get('/api/launchers/:id', tokenVerify, async (req,res) => {
    const {id} = req.params;
    try {
        const launcher = await db.collection('Launcher').find({id : Number(id)}).toArray()
        
        if(launcher.length === 0) return res.status(400).json({error: "The ID was not found"})
        return res.status(200).json({launcher: launcher[0]})
    } catch(e){
        res.status(500).json({error: e.message, message: "The server is not responding, please try later."})
    }
})

let count = 0
app.post('/api/launchers', tokenVerify, validationOfBody,async (req,res) => {
    const {name, rocketType, city} = req.body;
    const latitude = Number(req.body.latitude)    
    const longitude = Number(req.body.longitude)
    try{
        count += 1
        const result = await db.collection('Launcher').insertOne({
            id: count,
            city,
            rocketType,
            latitude,
            longitude,
            name
        })
        res.status(200).json({id : result.insertedId})
    } catch(e){
        res.status(500).json({message:  "The server is not responding, please try later.", error: e.message})
    }
})


app.delete('/api/launchers/:id', tokenVerify, async (req,res) => {
    const {id} = req.params;
    try{
        const find = await db.collection('Launcher').find({id : Number(id)}).toArray();
        
        if(find.length > 0){
            await db.collection('Launcher').deleteOne({id: Number(id)})
            return res.status(200).json({message: "The deletion was successful."})
        } else{
            return res.status(400).json({error: "The ID was not found"})
        }
    } catch(e){
        res.status(500).json({message:  "The server is not responding, please try later.", error: e.message})
    }
})

let newId = 0
app.post('/api/auth/register/create', tokenVerify, async (req,res)=> {
    const {username, password, email, type_user} = req.body;
    try {
        const find = await db.collection('users').find({type_user}).toArray();
        if(find.length > 0) return res.status(400).json({message:"The user type already exists."})
        newId += 1;
         const result = await db.collection('users').insertOne({
            id:newId,
            username,
            password, 
            email, 
            type_user,
            last_login: null
         })
         res.status(200).json({id : result.insertedId})
    } catch(e){
        res.status(500).json({error:e.message})
    }
});


app.put('/api/auth/register/update/:id',tokenVerify,  async (req,res) => {
    const {id} = req.params;
    const {username, password, email, type_user} = req.body; 
    let queries = {}
    if(username){queries.username = username}
    if(password){queries.password = password}
    if(email){queries.email = email}
    if(type_user)queries.type_user = type_user
    try{
        const find = await db.collection('users').find({id : Number(id)}).toArray();
        if(find.length === 0){
            return res.status(400).json({message: "The ID was not found"})
        } 
        const result = await db.collection('users').updateOne(
            {id:Number(id)},
            {$set: queries}
            )
        res.status(200).json({message: "The user has been updated", 
           Matched: result.matchedCount, Modified: result.modifiedCount
        })
    } catch(e){
        res.status(500).jsom({message: e.message})
    }
});


app.delete('/api/auth/register/delete/:id',tokenVerify, async (req,res) => {
    const {id} = req.params;
    try{
        const find = await db.collection('users').find({id : Number(id)}).toArray();
        if(find.length === 0){
            return res.status(400).json({message: "The ID was not found"})
        }
        await db.collection('users').deleteOne({id:Number(id)})
        res.status(200).json({message: "User deleted successfully"})
    } catch(e){
        res.status(500).json({message: e.message})
    }
});


app.post('/api/auth/login', async (req,res) => {
    const {username, password} = req.body
    try {
        const find = await db.collection('users').find({username,password }).toArray();
        if(find.length === 0) return res.status(400).json({message: 'The token was not found'})
        
        const result = await db.collection('users').updateOne(
        {username:username},
        {$set: {last_login: new Date().toISOString()}}
        )
        const find2 = await db.collection('users').find({username,password }).toArray();
        const user = find2[0]
        const token = createToken(user)
        res.status(200).json({message:'Login successful.',token})
    } catch(e){
        res.status(500).json({message:e.message})
    }
})


app.get('/api/auth/getUser',tokenVerify, async (req,res) => {
    const user = req.user
    res.status(200).json({user})
})

app.get('/api/users',tokenVerify, async (req,res) => {
    try{
        const users = await db.collection('users').find().toArray();
        if(users.length === 0) return res.status(200).json({users: []})
        return res.status(200).json({users})
    } catch(e){
        res.status(500).json({message: "The server is not responding, please try later.",
                error: e.message
        })
}
});





app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})
