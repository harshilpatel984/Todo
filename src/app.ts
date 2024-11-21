import cors from "cors";
import * as path from "path";
import express from "express";
import swaggerUi from "swagger-ui-express";
import logger from "./config/logger.config";
import { appConfig } from "./config/app.config";
import { UserRoute } from "./routes/user.route";
import { TodoRoute } from "./routes/todo.route";
import { MongoDbBridge } from "./bridge/mongo.db.bridge";
import { TodoCron } from "./utils/complete.todo.cron";
import { swaggerSpec } from "./config/swagger.config";
import * as OpenApiValidator from "express-openapi-validator";
import { errorHandler } from "./middleware/error.middleware";

class APP {

    private app: express.Application = express();
    private mongoDbBridge:MongoDbBridge = new MongoDbBridge();
    private userRoute: UserRoute = new UserRoute();
    private todoRoute: TodoRoute = new TodoRoute();

    constructor() {
        this.startApp();
    }

    private async startApp() {
        logger.info("Starting application");
        await this.setupDatabase();
        await this.setupCron();
        await this.setupRoutes();
        await this.startServer();
    }

    private async setupDatabase() {
        logger.info("Setting up DB connection");
        await this.mongoDbBridge.connect();
    }

    private async setupCron() {
        logger.info("Setting up Cronjob");
        let todoCron:TodoCron = new TodoCron();
        todoCron.updateTodo(appConfig.todoCron);
    }

    private async setupRoutes() {
        logger.info("Setting up Routes");
        this.app.use(express.json());
        this.app.use(cors());
        const spec = path.join(__dirname, "../api.yaml");
        this.app.use("/api/v1/spec", express.static(spec));
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        this.app.use(
            OpenApiValidator.middleware({
                apiSpec: spec,
                validateRequests: { allErrors: true },
            })
        );
        this.app.use('/api/v1/user', this.userRoute.userRouter);
        this.app.use("/api/v1/todo", this.todoRoute.todoRouter);
        this.app.use(errorHandler);
    }

    private async startServer() {
        this.app.listen(appConfig.port, () => {
            logger.info(`Server has been started on port ${appConfig.port}`);
        });
    }

}

logger.info("Todo app is intializing....");
const todoApp: APP = new APP();