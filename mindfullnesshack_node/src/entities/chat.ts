import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user";
import { Reply } from "./reply";
import { Message } from "./message";

@Entity({ name: "chat" }) // Table name
export class Chat {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @ManyToOne(() => User, (user) => user.chats)
    user!: User;

    @OneToMany(() => Message, (message) => message.chat)
    messages!: Message[];
}