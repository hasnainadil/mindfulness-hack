
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index, ManyToMany } from "typeorm";
import { Mood } from "./mood";
import { Task } from "./task";
import { Message } from "./message";
import { Question } from "./question";
import { Reply } from "./reply";
import { Journal } from "./journals";
import { GenderTypes } from "../types/usetypes";
import { Chat } from "./chat";

@Entity({ name: "user" }) // Table name
@Index("IDX_USER_EMAIL", ["email"], { unique: true }) // Index for email
class User {
  @PrimaryGeneratedColumn()
  id !: number;

  @Column()
  name !: string;

  @Column({ unique: true })
  email !: string;

  @Column()
  password !: string;

  @Column()
  age !: number;

  @Column()
  gender !: GenderTypes;

  @OneToMany(() => Mood, (mood) => mood.user)
  moods !: Mood[];

  @OneToMany(() => Task, (task) => task.user)
  tasks !: Task[];

  @OneToMany(() => Question, (question) => question.user)
  questions !: Question[];

  @OneToMany(() => Chat, (chat) => chat.user)
  chats !: Chat[];

  @OneToMany(() => Reply, (reply) => reply.user)
  replies !: Reply[];

  @OneToMany(() => Journal, (journal) => journal.user)
  journals !: Journal[];

}

export { User };