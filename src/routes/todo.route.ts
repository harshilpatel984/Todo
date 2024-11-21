import { Router } from "express";
import logger from "../config/logger.config";
import { Auth } from "../middleware/auth.middleware";
import { TodoController } from "../controllers/todo.controller";

export class TodoRoute {
    private todoRoutes: Router;
    private Auth: Auth = new Auth();
    private todoController: TodoController = new TodoController();

    constructor() {
        this.todoRoutes = Router();
        this.initialiseRoutes();
    }

    get todoRouter() {
        return this.todoRoutes;
    }

    private initialiseRoutes() {
        logger.info("todoRoutes.initialiseRoutes()");
        this.todoRoutes.get('/', this.Auth.authUser, this.todoController.readTodos);
        this.todoRoutes.get('/:id', this.Auth.authUser, this.todoController.readTodo);
        this.todoRoutes.post('/', this.Auth.authUser, this.todoController.addTodo);
        this.todoRoutes.put('/:id', this.Auth.authUser, this.todoController.updateTodo);
        this.todoRoutes.delete('/:id', this.Auth.authUser, this.todoController.deleteTodo);
    };
}