import cron from "node-cron";
import Todo from "../models/todo.model";
import logger from "../config/logger.config";

export class TodoCron {

    /**
     * updateTodo
     */
    public async updateTodo(cronExpression: string) {
        if (!cron.validate(cronExpression)) {
            logger.error('Invalid cron expression provided.');
            return;
        }

        const task = cron.schedule(cronExpression, async () => {
            logger.info('Running cron job to mark overdue todos as completed...');
            try {
                const currentEpoch = Date.now();
                const result = await Todo.updateMany(
                    { dueDate: { $lt: currentEpoch }, completed: false },
                    { $set: { completed: true } }
                );
                logger.info(`Cron job completed. ${result.modifiedCount} todos marked as completed.`);
            } catch (error) {
                logger.error('Error while running cron job:', error);
            }
        });

        process.on('SIGTERM', () => {
            logger.info('Stopping cron job gracefully...');
            task.stop();
            process.exit(0);
        });
    }
}