const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send("Server works!"));

app.listen(5000, () => console.log("Running on 5000"));
