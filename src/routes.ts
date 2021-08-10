import { Router } from "express";
import { CreateUSerController } from "./controllers/CreateUserController";
import {CreateTagController} from "./controllers/CreateTagController";
import {ensureAdmin}  from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";

const router = Router();
const createUserController = new CreateUSerController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
router.post('/users',createUserController.handle);
//router.get('/users',)
router.post('/tags',ensureAdmin,createTagController.handle);
router.post('/login',authenticateUserController.handle);
router.post('/compliments',createComplimentController.handle)
export { router }
