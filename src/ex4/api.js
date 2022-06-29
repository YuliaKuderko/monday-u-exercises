import app from './server.js';
import bodyParser from 'body-parser';
import ItemManager from './ItemManager.js';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const itemManager = new ItemManager();

app.post("/add", async(req,res) => {
   await itemManager.addTask(req.body.itemName)
   res.status(200).json( {})
 });

 app.get("/get",async(req, res) => {
   res.status(200).json(await itemManager.getItems());
});

app.patch('/done/:id', async(req, res) => {
   await itemManager.setDone(req.params.id);
   res.json({});
 });

 app.patch('/undone/:id', async(req, res) => {
  await itemManager.setUnDone(req.params.id);
   res.json({});
 });

 app.delete('/delete/:id', async(req, res) => {
  await itemManager.removeTask(req.params.id);
   res.json({});
 });

 app.delete('/delete_all_items', async(req, res) => {
  await itemManager.clear();
   res.json( {});
 });