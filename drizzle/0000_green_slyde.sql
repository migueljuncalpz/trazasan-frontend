CREATE TABLE `incidents` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`location` text NOT NULL,
	`severity` text DEFAULT 'media' NOT NULL,
	`status` text DEFAULT 'abierta' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_incidents_status_created` ON `incidents` (`status`,`created_at`);--> statement-breakpoint
CREATE TABLE `waste_records` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`container_code` text NOT NULL,
	`waste_type` text NOT NULL,
	`ler_code` text NOT NULL,
	`unit` text NOT NULL,
	`weight_kg` integer NOT NULL,
	`status` text DEFAULT 'registrado' NOT NULL,
	`risk` text DEFAULT 'ordinario' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_waste_records_status_created` ON `waste_records` (`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_waste_records_unit` ON `waste_records` (`unit`);