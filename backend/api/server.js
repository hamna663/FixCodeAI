import app from '../src/app.js'
import dotenv from "dotenv";
dotenv.config();
import serverless from 'serverless-http';

const port = process.env.PORT;


export default serverless(app);
