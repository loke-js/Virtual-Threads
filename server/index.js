import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import dalleRoutes from './routes/dalle.routes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit:"50mb"}));
app.use('/api/v1/dalle',dalleRoutes);
app.get('/',(req,res)=>{
    res.status(200).json({message:'hello from AI'});
})

app.listen(process.env.PORT,()=>{
    console.log('listening on port 8080')
})