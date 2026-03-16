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
console.log(db);




app.get('/api/launchers', async (req,res) => {
    try{
        
        const launchers = await db.collection('Launcher').find().toArray();
        console.log(launchers);
        
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
        const launcher = await db.collection('Launcher').find({id : id}).toArray()
        if(launcher.length === 0) return res.status(400).json({error: "The ID was not found"})
        return res.status(200).json({launcher: launcher[0]})
    } catch(e){
        res.status(500).json({error: e.message, message: "The server is not responding, please try later."})
    }
})






app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})
