import bodyParser from 'body-parser';


app.post("/pokemon", (req,res) => {
     res.status(200).json({message: "Error"});
 })

 app.get("/pokemon/:id", (req, res) => {
    const pokemon = todoList.find((value) => value.id === pokemonId);
    if(!pokemon) return res.status(404).json({
      status: 404,
      error: "Pokemon with given id not found"
    });
    res.status(200).json(pokemon);
 })