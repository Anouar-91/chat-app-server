import { Router } from 'express';
const api = Router();
import {register, login, setAvatar, getAllUsers, logOut}  from "../../controllers/user.controller";

api.post("/register", register)
api.post("/login", login)
api.post("/avatar/:id", setAvatar);
api.get("/allusers/:id", getAllUsers);
api.get("/logout/:id", logOut);


export default api;