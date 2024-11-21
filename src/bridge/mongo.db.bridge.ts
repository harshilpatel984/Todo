import mongoose from "mongoose";
import { appConfig } from '../config/app.config';
import logger from "../config/logger.config";

export class MongoDbBridge {

    public async connect() {
        logger.info("MongoDbBridge.connect()");
        const dbUri = `mongodb://${appConfig.dbHost}:${appConfig.dbPort}`;
        await mongoose.connect(dbUri, {
            dbName: appConfig.dbName,
            user: appConfig.dbUser,
            pass: appConfig.dbPass
        });
    }
}
