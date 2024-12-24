// Daily Journals Table
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from "typeorm";
import { User } from "./user";

@Entity({ name: "journal" }) // Table name
@Index("IDX_JOURNAL_DATE", ["date"]) // Index for date
export class Journal {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    title!: string;

    @Column("text")
    content!: string;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @ManyToOne(() => User, (user) => user.journals)
    user!: User;
}
