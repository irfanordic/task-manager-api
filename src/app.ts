import express from "express"
import authRoutes from "./routes/auth.route"
import {authMiddleware} from "./middleware/auth.middleware"
import  taskRoutes  from "./routes/task.route"
import {errorHandler} from "./middleware/error.middleware"
const app = express()

app.use(express.json())
app.use("/auth", authRoutes)
app.use('/tasks', taskRoutes)

app.get("/profile", authMiddleware, (req:any, res) => {
  res.json({
    message: "access granted to protected route",
    user: req.user
  })
})
app.get("/", (req, res)=>{
    res.send("The app is Running")
})


app.use(errorHandler)


export default app