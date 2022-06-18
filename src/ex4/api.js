import app from './server.js';
import bodyParser from 'body-parser';
import ItemManager from './ItemManager.js';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const itemManager = new ItemManager();

app.post("/add", (req,res) => {
   itemManager.addTask(req.body.title)
   .then(() => res.json(itemManager.getItems()))
 });

 app.get("/get", (req, res) => {
   res.status(200).json(itemManager.getItems());
});

app.patch('/done/:id', (req, res) => {
   itemManager.setDone(req.params.id);
   res.json(itemManager.getItems());
 });

 app.patch('/undone/:id', (req, res) => {
   itemManager.setUnDone(req.params.id);
   res.json(itemManager.getItems());
 });

 app.delete('/delete/:id', (req, res) => {
   itemManager.removeTask(req.params.id);
   res.json(itemManager.getItems());
 });

 app.delete('/delete_all_items', (req, res) => {
   itemManager.clear();
   res.json(itemManager.getItems());
 });