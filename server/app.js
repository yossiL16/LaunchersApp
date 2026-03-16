import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectMongo } from './utils/connectDB.js';

const app = express();
app.use(express.json());
app.use(cors());


const port = process.env.PORT

const db = await connectMongo({
    uri : process.env.URI,
    name : process.env.DB_NAME
})


app.get('/api/launchers', async (req,res) => {
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


app.get('/api/launchers/:id', async (req,res) => {
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
app.post('/api/launchers', async (req,res) => {
    const {name, rocketType, latitude, longitude, city} = req.body;
    console.log(req.body);
    
    
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


app.delete('/api/launchers/:id', async (req,res) => {
    const {id} = req.params;
    console.log(id);
    
    try{
        const find = await db.collection('Launcher').find({id : Number(id)}).toArray();
        console.log(find);
        
        if(find.length > 0){
            const result = await db.collection('Launcher').deleteOne({id: Number(id)})
            console.log(result);
            
            return res.status(200).json({message: "The deletion was successful."})
        } else{
            return res.status(400).json({error: "The ID was not found"})
        }
    } catch(e){
        res.status(500).json({message:  "The server is not responding, please try later.", error: e.message})
    }
})




app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})
