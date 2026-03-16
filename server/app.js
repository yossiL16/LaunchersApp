import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectMongo } from './utils/connectDB.js';

const app = express();
app.use(express.json());
app.use(cors());


const port = process.env.port

const db = connectMongo({
    uri : process.env.URI,
    name : process.env.DB_NAME
})


app.get('/', (req,res) => {
    console.log("hello");
    console.log(uri);
    console.log(name);
    
    
    res.send("hello")
})


app.get('/api/launchers', (req,res) => {

})




app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})
