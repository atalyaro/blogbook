const express= require("express")
const app= express()
const cors= require("cors")
require ("./dbcon")

app.use(cors())
app.use(express.json())
app.use("/bloggers",require("./routes/bloggers"))
app.use("/blogs",require("./routes/blogs"))

app.listen(1000,()=>console.log("server 1000"))