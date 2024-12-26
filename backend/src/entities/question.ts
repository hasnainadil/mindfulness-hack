import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { User } from "./user";
import { Reply } from "./reply";

@Entity({ name: "question" }) // Table name
class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  // likes is the number of likes the question has received and not less than 0 
  @Column({ default: 0 })
  likes!: number;

  @ManyToOne(() => User, (user) => user.questions)
  user!: User;

  // list of users who liked the question
  @ManyToMany(() => User)
  @JoinTable()
  likedBy!: User[];

  @OneToMany(() => Reply, (reply) => reply.question)
  replies!: Reply[];
}

export { Question };