import express from "express";
import { login, register } from "./controllers/authController";


export const app = express();

app.use(express.json());

app.get('/healthy', (req, res) => {
    res.status(200).json(
      {
        success: true,
        message: "Server is healthy"
      }
    );
})

//auth routes
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);