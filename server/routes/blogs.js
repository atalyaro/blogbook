const router = require("express").Router()
const { Query, connection } = require("../dbcon")

router.get("/", (req, res) => {
    connection.query(`SELECT blogs.id,blogs.title,blogs.body,blogs.published,bloggers.name FROM blogs 
    INNER JOIN bloggers ON blogs.blogger_id= bloggers.id`, (err, results) => {
        if (err) return res.status(500).json({ err: true, err })
        res.json(results)
    })
})
router.post("/", async(req, res) => {
    const { title, body, blogger_id } = req.body
    try {
        const insert_q = `INSERT INTO blogs (title,body,blogger_id)
        VALUES ("${title}", "${body}", ${blogger_id})`
        const select_q = `SELECT blogs.id,blogs.title,blogs.body,blogs.published,bloggers.name FROM blogs 
		INNER JOIN bloggers ON blogs.blogger_id= bloggers.id`
        await Query(insert_q)
        const blogs = await Query(select_q)
        res.json(blogs)
    } catch (error) {
        res.status(500).json({ err: true, error })
    }

    // connection.query(`INSERT INTO blogs(title, body, blogger_id)
    // VALUES("${title}","${body}",${blogger_id})`, (err) => {
    // if (err) return res.status(500).json({ err: true, err })
    // res.json({ err: false, msg: "blog added" })
    // })
})

router.delete('/:id',async(req,res)=>{
	try {
		const delete_q = `DELETE FROM blogs WHERE id=${req.params.id}`
		const select_q = `SELECT blogs.id,blogs.title,blogs.body,blogs.published,bloggers.name FROM blogs 
		INNER JOIN bloggers ON blogs.blogger_id= bloggers.id`
		await Query(delete_q)
		const blogs = await Query(select_q)
		res.json(blogs)
	} catch (error) {
		res.status(500).json({ err: true, error })
	}
})

router.put('/:id', async (req, res) => {
	try {
		const { title, body } = req.body
		const update_q = `UPDATE blogs SET title=? , body=? WHERE id=?`
		const select_q = `SELECT blogs.id,blogs.title,blogs.body,blogs.published,bloggers.name FROM blogs 
		INNER JOIN bloggers ON blogs.blogger_id= bloggers.id`
		await Query(update_q, title, body, req.params.id)
		const blogs = await Query(select_q)
		res.json(blogs)
	} catch (error) {
		res.status(500).json({ err: true, error })
	}
})

module.exports = router