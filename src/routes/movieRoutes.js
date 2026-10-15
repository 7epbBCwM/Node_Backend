import express from 'express'

const router = express.Router()

router.get('/hello',(req,res)=>{
                res.json({message:"Hello from the GET"})
})

router.post('/hello',(req,res)=>{
                res.json({message:"Hello from the POST "})
})

router.put('/hello',(req,res)=>{
                res.json({message:"Hello from the PUT"})
})

router.delete('/hello',(req,res)=>{
                res.json({message:"Hello from the DELETE"})
})


export default router