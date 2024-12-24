import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from "typeorm";
import { Chat } from "./chat";

@Entity({ name: "message" }) // Table name
@Index("IDX_MESSAGE_TIMESTAMP", ["timestamp"]) // Index for timestamp
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @Column()
  isUser!: boolean; // True for user messages, false for AI responses

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  timestamp!: Date;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat!: Chat;
}