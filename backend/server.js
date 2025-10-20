import app from './src/app.js'
import dotenv from "dotenv";
dotenv.config();


const port = process.env.PORT;


await app.listen(port, () =>
    console.log(`Server running on http://localhost:${port} 🔥`)
);
