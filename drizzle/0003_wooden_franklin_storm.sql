PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`email` text NOT NULL,
	`img` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "name", "description", "email", "img") SELECT "id", "name", "description", "email", "img" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
PRAGMA foreign_keys=ON;