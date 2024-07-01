import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import routes from "./routes"
import path from "path";


dotenv.config()
const PORT = process.env.PORT || 8080

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(routes)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pub', 'index.html'));
  });


app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`)
})

