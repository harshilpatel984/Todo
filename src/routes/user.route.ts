import { Router } from "express";
import logger from "../config/logger.config";
import { UserController } from "../controllers/user.controller";

export class UserRoute {
    private userRoutes: Router;
    private userController: UserController = new UserController();

    constructor() {
        this.userRoutes = Router();
        this.initialiseRoutes();
    }

    get userRouter() {
        return this.userRoutes;
    }

    private initialiseRoutes() {
        logger.info("userRoutes.initialiseRoutes()");
        this.userRoutes.post('/register', this.userController.registerUser);
        this.userRoutes.post('/login', this.userController.loginUser);
    };
}