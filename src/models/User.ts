import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./Role";
import { UserMatch } from "./User_match";
import { FavoriteCourt } from "./Favorite_court";
import { Match } from "./Match";

@Entity('users')
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({name: 'name'})
    name!: string

    @Column({name: 'nickname', unique: true})
    nickname!: string

    @Column({name: 'email', unique: true})
    email!: string

    @Column({name: 'password', select: false})
    password!: string

    @Column({name: 'favorite_position', nullable: true})
    favorite_position!: string

    @Column({name: 'presentation', nullable: true})
    presentation!: string

    @Column({name: 'image', nullable: true})
    image!: string

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at!: Date;

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn ({ name: "role_id" })
    role!: Role;

    @OneToMany(() => Match, (match) => match.user)
    matches!: Match[]

    @OneToMany(() => UserMatch, (userMatch) => userMatch.user)
    userMatches!: UserMatch[]

    @OneToMany(() => FavoriteCourt, (favoriteCourt) => favoriteCourt.user)
    favoriteCourts!: FavoriteCourt[]
}