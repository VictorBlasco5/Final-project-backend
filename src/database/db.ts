import "reflect-metadata"
import "dotenv/config"
import { DataSource } from "typeorm"
import { Role1714129148730 } from "./migrations/1714129148730-role"
import { User1714129322306 } from "./migrations/1714129322306-user"
import { Court1714129641445 } from "./migrations/1714129641445-court"
import { FavoriteCourt1714130144466 } from "./migrations/1714130144466-favorite_court"
import { Match1714130426227 } from "./migrations/1714130426227-match"
import { UserMatch1714130716308 } from "./migrations/1714130716308-user_match"
import { Court } from "../models/Court"
import { FavoriteCourt } from "../models/Favorite_court"
import { Match } from "../models/Match"
import { Role } from "../models/Role"
import { UserMatch } from "../models/User_match"
import { User } from "../models/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3307,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_DATABASE || "baloncesto",
    entities: [
        Court,
        FavoriteCourt,
        Match,
        Role,
        UserMatch,
        User
    ],
    migrations: [
        Role1714129148730,
        User1714129322306,
        Court1714129641445,
        FavoriteCourt1714130144466,
        Match1714130426227,
        UserMatch1714130716308,

    ],
    synchronize: false,
    logging: false,
})