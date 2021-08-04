import { Router } from "express";
import { CreateUSerController } from "./controllers/CreateUserController";
import {CreateTagController} from "./controllers/CreateTagController";
import {ensureAdmin}  from "./middlewares/ensureAdmin";

const router = Router();
const createUserController = new CreateUSerController();
const createTagController = new CreateTagController();
router.post('/users',createUserController.handle);
router.post('/tags',ensureAdmin,createTagController.handle);
export { router }
