import { Router } from 'express';
const api = Router();
import {addMessage, getMessages}  from "../../controllers/message.controller";


api.post("/addmsg", addMessage);
api.post("/getmsg", getMessages);

export default api;