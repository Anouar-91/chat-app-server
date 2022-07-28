import { Router } from 'express';
import UserRouter from './api/user.route';
import MsgRouter from './api/message.route';
const router = Router();

router.use('/api/msg', MsgRouter);
router.use('/api/user', UserRouter);

export default router;
