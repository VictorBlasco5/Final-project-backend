import { Request, Response } from "express";
import { Match } from "../models/Match";
import { UserMatch } from "../models/User_match";
import { User } from "../models/User";

//OBTENER PARTIDOS
export const getMatches = async (req: Request, res: Response) => {
    try {

        // const limit = Number(req.query.limit) || 8; // elijo el limite que yo quiera y sino por defecto me dará 8
        // const page = Number(req.query.page) || 1; //elijo empezar por la pagina que yo quiera y sino por defecto me dará la 1
        // const skip = (page - 1) * limit as number // determinar por qué página quiero empezar

        // if (limit > 100) {
        //     return res.status(404).json(
        //         {
        //             success: false,
        //             message: "you have exceeded the limit"
        //         }
        //     )
        // }


        const matches = await Match.find({
            relations: ["court"],
            // take: limit, //paginación para que me traiga 8 usuarios al hacer la petición.
            // skip: skip
        });

        res.status(200).json(
            {
                success: true,
                message: "Matches retieved successfully",
                data: matches,
            }
        )

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Matches cant be retrieved",
            error: error
        })
    }
}

//CREAR PARTIDO
export const createMatch = async (req: Request, res: Response) => {
    try {
        const { number_players, information, match_date, court_id } = req.body;
        const userId = req.tokenData.userId;

        const dateMatchExists = await Match.findOne({
            where: { match_date: match_date }
        })

        //fecha anterior a la actual
        if (new Date(match_date) < new Date()) {
            return res.status(400).json({
                success: false,
                message: "The date has passed"
            });
        }

        //hora ocupada
        if (dateMatchExists) {
            return res.status(400).json({
                success: false,
                message: "This hour is busy"
            });
        }

        if (information.length < 1) {
            return res.status(400).json({
                success: false,
                message: "Information is required"
            })
        }

        if (information.length > 255) {
            return res.status(400).json({
                success: false,
                message: "Information must be at most 255 characters"
            })
        }

        const newMatch = new Match();
        const users = new User();

        //apuntarme al partido que creo
        let signed_up_user: number[] = [userId]
        const signed_up_user2 = JSON.stringify(signed_up_user)
        newMatch.signed_up = signed_up_user2 as any

        newMatch.number_players = number_players;
        newMatch.information = information;
        newMatch.match_date = match_date;
        newMatch.court = court_id;
        users.id = userId;
        newMatch.user = users;
        await newMatch.save();

        //tabla intermedia
        const userMatch = new UserMatch();
        const user = new User();
        user.id = userId;
        userMatch.user = user;
        userMatch.match = newMatch;
        await userMatch.save();

        res.status(200).json(
            {
                success: true,
                message: "Match created",
                data: newMatch
            }
        )

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Cant create match",
            error: error
        })
    }
}

//ELIMINAR PARTIDO
export const deleteMatch = async (req: Request, res: Response) => {
    try {
        const { userId, roleName } = req.tokenData;
        const matchId = req.params.id
        const admin = roleName === 'admin';

        const matchDelete = await Match.findOne({
            where: { id: parseInt(matchId) },
            relations: ["user"],
        })

        // const matchDelete = await Match.createQueryBuilder("match")
        //     .leftJoinAndSelect("match.user", "user")
        //     .where("match.id = :id", { id: parseInt(matchId) })
        //     .select(["match", "user.id"])
        //     .getOne();

        if (!matchDelete) {
            return res.status(404).json({
                success: false,
                message: "Match not found"
            })
        }

        if (matchDelete.user.id !== userId && !admin) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this match"
            })
        }

        await Match.remove(matchDelete)

        res.status(200).json(
            {
                success: true,
                message: "Match deleted successfully",
                data: matchDelete
            }
        )

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Match cant be delete",
            error: error
        })
    }
}

//APUNTARME A UN PARTIDO
export const assistanceMatch = async (req: Request, res: Response) => {
    try {

        const { userId } = req.tokenData;
        const matchId = req.params.id;

        const match = await Match.findOneBy({
            id: parseInt(matchId)
        });

        if (!match) {
            return res.status(404).json({
                success: false,
                message: "Match not found"
            })
        }

        const signedUpArray = match.signed_up || [];  // Obtengo el array actual del partido
        const numberPlayers = match.number_players;



        const addRemove = signedUpArray.indexOf(userId);
        if (addRemove !== -1) {
            signedUpArray.splice(addRemove, 1);
        } else {
            if (signedUpArray.length === numberPlayers) {
                return res.status(400).json({
                    success: false,
                    message: "The match is complete"
                })
            }
            signedUpArray.push(userId);
        }

        const signedUpJSON = JSON.stringify(signedUpArray);  // Convierto el array a JSON 
        match.signed_up = signedUpJSON as any   // Actualizo en DB
        await match.save();

        res.status(200).json(
            {
                success: true,
                message: addRemove !== -1 ? "Deleted successfully for match" : "Signed up successfully for match",
                data: match
            }
        )

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Cant sign up for match",
            error: error
        })
    }
}

//OBTENER PARTIDOS A LOS QUE ME HE APUNTADO
export const getMatchesAssistance = async (req: Request, res: Response) => {
    try {

        const { userId } = req.tokenData;

        const matches = await Match.createQueryBuilder("match")
            .leftJoinAndSelect("match.court", "court")
            .leftJoinAndSelect("match.user", "user")
            .getMany();

        const filtered = matches.filter(match =>
            match.signed_up.includes(userId)
        );

        res.status(200).json({
            success: true,
            message: "Matches retrieved successfully",
            data: filtered
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Matches cant be retrieved",
            error: error
        })
    }
}

//OBTENER PARTIDOS POR PISTA
export const getMatchesByCourt = async (req: Request, res: Response) => {
    try {

        const courtId = req.params.id;

        const matches = await Match.find({
            where: {
                court: { id: parseInt(courtId) }
            }, relations: ["court"]
        });

        res.status(200).json(
            {
                success: true,
                message: "Matches retieved successfully",
                data: matches
            }
        )

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Matches cant be retrieved",
            error: error
        })
    }
}

//OBTENER PARTIDOS QUE HE CREADO
export const getMyMatches = async (req: Request, res: Response) => {
    try {

        const { userId } = req.tokenData;

        const matches = await Match.find({
            where: {
                user: { id: userId }
            },
            relations: ["court"]
        });

        res.status(200).json(
            {
                success: true,
                message: "Matches retieved successfully",
                data: matches
            }
        )

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Matches cant be retrieved",
            error: error
        })
    }
}

//ACTUALIZAR PARTIDO
export const updateMatch = async (req: Request, res: Response) => {
    try {
        const matchId = req.params.id;
        const userId = req.tokenData.userId;
        const { number_players, information, match_date, court_id } = req.body;

        if (!number_players || !information || !match_date || !court_id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const findMatch = await Match.findOne({
            where: { id: parseInt(matchId) },
            relations: ["user"],
        })

        if (!matchId) {
            return res.status(404).json({
                success: false,
                message: "Match not found"
            })
        }

        await Match.update(
            {
                id: parseInt(matchId)
            },
            {
                number_players: number_players,
                information: information,
                match_date: match_date,
                court: court_id
            }
        )

        const updateMatch = await Match.findOne({
            where: { id: parseInt(matchId) },
            relations: ["user"],
        })


        if (findMatch?.user.id !== userId) {
            return res.status(403).json({
                success: false,
                message: "You cant update this match"
            })
        }

        res.status(200).json(
            {
                success: true,
                message: "Match updated successfully",
                data: updateMatch
            }
        )

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Match cant be update",
            error: error
        })
    }
}

