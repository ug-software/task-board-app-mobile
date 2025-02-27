ALTER TABLE `projects` ADD `icon` text NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` ADD `color` text NOT NULL;
ALTER TABLE `tasks` ADD COLUMN `date_marked` TIMESTAMP;
