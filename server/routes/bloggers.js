const router= require("express").Router()
const {Query}= require("../dbcon")

router.get("/",async(req,res)=>{
    try{
        const bloggers= await Query(`SELECT * FROM bloggers`)
        res.json(bloggers)
    }catch(error){
        res.status(500).json({err:true,error})
    }
})

module.exports = router