import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(cors());


const port = process.env.port

app.get('/', (req,res) => {
    console.log("hello");
    res.send("hello")
    
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})
