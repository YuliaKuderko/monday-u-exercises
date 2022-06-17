import bodyParser from 'body-parser';
app.use(bodyParser.json());

app.get("", (req, res) => {
   res.render('index')
})
app.post("/pokemon", (req,res) => {
     res.status(200).json({message: "Error"});
 })

 app.post("/pokemon/:id", (req, res) => {
    const pokemon = todoList.find((value) => value.id === pokemon.id);
    if(!pokemon) return res.status(404).json({
      status: 404,
      error: "Pokemon with given id not found"
    });
    res.send(req.bod)
    res.status(200).json(pokemon);
 })