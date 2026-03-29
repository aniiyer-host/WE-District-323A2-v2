import express from "express"
import supabase from "../utils/supabaseClient.js"

const router = express.Router()

router.get("/", async (req, res) => {

    const { data, error } = await supabase
        .from("project_pages")
        .select("*")

    if (error) return res.status(500).json(error)

    res.json(data)
})

export default router