import express from 'express'
import { config } from 'dotenv'
import { connectDB,disconnectDB } from './config/db.js'

// Imports Routes 
import movieRoutes from './routes/movieRoutes.js'
import authRoutes from './routes/authRoutes.js'
import watchlistRoute from './routes/watchlistRoute.js'
 

const app = express()

config()
connectDB()

// Body parsing middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}));

// API Routes
app.use("/movies",movieRoutes)
app.use("/auth",authRoutes)
app.use("/watchlist",watchlistRoute)
const PORT = 5001
const server=app.listen(PORT,()=>{
            console.log(`Server is running on PORT ${PORT}`)
})


// Handle unhandled promise rejection (e.g.,database connection errors)
process.on("unhandledRejection",(err)=>{
    console.error("Unhandled Rejection:",err);
    ServiceWorkerRegistration.close(async()=>{
        await disconnectDB();
        process.exit(1);
    })
})

// Handle uncaught exception
process.on("uncaughtException",async(err)=>{
    console.error("Unhandled Exception:",err);
        await disconnectDB();
        process.exit(1);
    
})

// Graceful shutdown

process.on("SIGTERM",async()=>{
    console.log("SIGTERM received,shutting down gracefully");
        server.close(async()=>{
            await disconnectDB();
            process.exit(0)
        })
    
})