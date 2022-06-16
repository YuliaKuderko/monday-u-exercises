import express from "express";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 8080;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(__dirname +'\\dist'));

app.get('', (req, res) =>{
    res.sendFile(__dirname + '\\index.html');
})

app.listen(port, ()=>{
    console.log("Server started on port", port);
});