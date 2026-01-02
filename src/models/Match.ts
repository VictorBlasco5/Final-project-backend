import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Court } from "./Court";
import { UserMatch } from "./User_match";
import { User } from "./User";

@Entity('matches')
export class Match extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'number_players' })
    number_players!: number

    @Column ({ name: 'signed_up', type: 'integer', array: true, default: []})
    signed_up!: number[]

    @Column({ name: 'information' })
    information!:string

    @Column({ type: 'timestamp', name: 'match_date' })
    match_date!:string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at!: Date;

    @ManyToOne(() => User, (user) => user.matches)
    @JoinColumn ({ name: "user_id" })
    user!: User;

    @ManyToOne(() => Court, (court) => court.matches)
    @JoinColumn ({ name: "court_id" })
    court!: Court;

    @OneToMany(() => UserMatch, (userMatch) => userMatch.match)
    userMatches!: UserMatch[]


}