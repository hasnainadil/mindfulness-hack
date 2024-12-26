import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { MoodType } from "../types/mood.types";

@Entity({ name: "mood" })
@Index("IDX_MOOD_DATE", ["date"]) // Index for date
class Mood {
    @PrimaryGeneratedColumn()
    id !: number;

    @Column({ type: "enum", enum: [1, 2, 3, 4, 5], default: 3 })
    mood !: MoodType;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    date !: Date;

    @ManyToOne(() => User, (user) => user.moods)
    user !: User;
}

export { Mood };
