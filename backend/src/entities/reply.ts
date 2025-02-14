import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, ManyToMany, JoinTable } from "typeorm";
import { User } from "./user";
import { Question } from "./question";

@Entity({ name: "reply" }) // Table name
@Index("IDX_REPLY_TIMESTAMP", ["timestamp"]) // Index for timestamp
class Reply {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  timestamp!: Date;

  @Column({ default: 0 })
  likes!: number;

  @ManyToOne(() => User, (user) => user.replies)
  user!: User;

  @ManyToMany(() => User)
  @JoinTable()
  likedBy!: User[];

  @ManyToOne(() => Question, (question) => question.replies)
  question!: Question;
}

export { Reply };