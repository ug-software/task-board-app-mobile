CREATE TABLE `notification` (
	`id` integer PRIMARY KEY NOT NULL,
	`status` text NOT NULL,
	`project_id` integer NOT NULL,
	`task_id` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
DROP TABLE `child-tasks`;