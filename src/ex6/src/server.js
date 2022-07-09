import express from "express";
import cors from "cors"


const app = express();
const port = 8080;


app.use(cors())


app.listen(port, ()=>{
    console.log("Server started on port", port);
});
export default app