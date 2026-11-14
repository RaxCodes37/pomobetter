ALTER TABLE "task" DROP CONSTRAINT "task_task_creator_user_id_fk";
--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_task_creator_user_id_fk" FOREIGN KEY ("task_creator") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;