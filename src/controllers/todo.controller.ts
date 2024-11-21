import Todo from "../models/todo.model";
import logger from "../config/logger.config";
import { Request, Response } from "express";

export class TodoController {

    /**
     * readTodo
     */
    public async readTodos(req: Request, res: Response) {
        logger.info("TodoController.readTodos()");
        try {
            const { page = 1, limit = 10 } = req.query;

            const pageNumber = parseInt(page as string, 10);
            const limitNumber = parseInt(limit as string, 10);

            if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
                res.status(400).json({ message: 'Invalid page or limit value' });
            } else {
                const todos = await Todo.find({ user: req.body.user })
                    .skip((pageNumber - 1) * limitNumber)
                    .limit(limitNumber);
                const totalTodos = await Todo.countDocuments({ user: req.body.user });

                res.status(200).json({
                    page: pageNumber,
                    limit: limitNumber,
                    totalTodos,
                    totalPages: Math.ceil(totalTodos / limitNumber),
                    data: todos,
                });
            }
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: 'Something went wrong while fetching todo List' });
        }
    }

    /**
     * readTodo
     */
    public async readTodo(req: Request, res: Response) {
        logger.info("TodoController.readTodo()");
        try {
            const { id } = req.params;
            const todo = await Todo.findOne({ _id: id, user: req.body.user });
            if (!todo) {
                res.status(404).json({ message: 'Todo is not found' });
            } else {
                res.status(200).json(todo);
            }
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: 'Something went wrong while fetching a todo' });
        }
    }

    /**
     * addTodo
     */
    public async addTodo(req: Request, res: Response) {
        logger.info("TodoController.addTodo()");
        try {
            const { title, description, dueDate } = req.body;
            const todo = new Todo({
                title,
                description,
                dueDate,
                creationDate: Date.now(),
                user: req.body.user,
            });
            await todo.save();

            res.status(201).json(todo);
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: 'Something went wrong while adding a todo' });
        }
    }

    /**
     * readTodo
     */
    public async updateTodo(req: Request, res: Response) {
        logger.info("TodoController.updateTodo()");
        try {
            const { id } = req.params;
            const todo = await Todo.findOneAndUpdate({ _id: id, user: req.body.user }, req.body, { new: true });
            if (!todo) {
                res.status(404).json({ message: 'Todo is not found' });
            } else {
                const todoWithoutSensitiveInfo = await Todo.findById(todo._id);
                res.status(200).json(todoWithoutSensitiveInfo);
            }
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: 'Something went wrong while updating a todo' });
        }
    }

    /**
     * addTodo
     */
    public async deleteTodo(req: Request, res: Response) {
        logger.info("TodoController.deleteTodo()");
        try {
            const { id } = req.params;
            const todo = await Todo.findOneAndDelete({ _id: id, user: req.body.user });
            if (!todo) {
                res.status(404).json({ message: 'Todo is not found' });
            } else {
                res.status(200).json({ message: 'Todo deleted successfully' });
            }
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: 'Something went wrong while deleting a todo' });
        }
    }
}