import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from "typeorm";
import { User } from "./user";

@Entity({ name: "task" }) // Table name
@Index("IDX_TASK_TYPE", ["type"]) // Index for type
@Index("IDX_TASK_CREATED_AT", ["createdAt"]) // Index for createdAt
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string; // e.g., "mindfulness" or "daily_task"

  @Column()
  description!: string;

  @Column()
  isCompleted!: boolean;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.tasks, { nullable: true })
  user!: User; // Nullable for global tasks
}