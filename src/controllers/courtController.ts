import { Request, Response } from "express";
import { Court } from "../models/Court";
import { FavoriteCourt } from "../models/Favorite_court";
import { User } from "../models/User";

//CREAR PISTAS
export const createCourt = async (req: Request, res: Response) => {
    try {

        const name = req.body.name;
        const direction = req.body.direction;
        const URL_maps = req.body.URL_maps;

        const courtExist = await Court.findOneBy({
            name: name
        })

        if (courtExist) {
            return res.status(400).json({
                success: false,
                message: "Court already exist"
            })
        }

        if (name.length < 3) {
            return res.status(400).json({
                success: false,
                message: "Name must be at least 3 characters"
            })
        }

        if (name.length > 50) {
            return res.status(400).json({
                success: false,
                message: "Name must be at most 50 characters"
            })
        }

        if (direction.length < 3) {
            return res.status(400).json({
                success: false,
                message: "Direction must be at least 3 characters"
            })
        }

        if (direction.length > 255) {
            return res.status(400).json({
                success: false,
                message: "Direction must be at most 255 characters"
            })
        }

        const newCourt = await Court.create({
            name: name,
            direction: direction,
            URL_maps: URL_maps
        }).save()

        res.status(200).json(
            {
                success: true,
                message: "Court created",
                data: newCourt
            }
        )

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Cant create court",
            error: error
        })
    }
}

//OBTENER PISTAS
export const getCourts = async (req: Request, res: Response) => {
    try {
        // const limit = Number(req.query.limit) || 8; // elijo el limite que yo quiera y sino por defecto me dará 8
        // const page = Number(req.query.page) || 1; //elijo empezar por la pagina que yo quiera y sino por defecto me dará la 1
        // const skip = (page - 1) * limit as number // determinar por qué página quiero empezar

        // if (limit > 100) {
        //     return res.status(404).json(
        //         {
        //             success: false,
        //             message: "you have exceeded the limit"
        //         },
        //     )
        // }

        const courts = await Court.find({
        //     take: limit, //paginación para que me traiga 8 usuarios al hacer la petición.
        //     skip: skip
        })

        res.status(200).json(
            {
                success: true,
                message: "Court retieved successfully",
                data: courts
            }
        )

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Courts cant be retrieved",
            error: error
        })
    }
}

//ACTUALIZAR PISTAS
export const updateCourt = async (req: Request, res: Response) => {
    try {

        const courtId = req.params.id;
        const name = req.body.name;
        const direction = req.body.direction;
        const  URL_maps = req.body.URL_maps;

        //validacion
        const court = await Court.findOneBy({
            id: parseInt(courtId)
        })

        if (!court) {
            return res.status(404).json({
                success: false,
                message: "Court not found"
            })
        }

        //actualizar db
        const courtUpdate = await Court.update(
            {
                id: parseInt(courtId)
            },
            {
                name: name,
                direction: direction,
                URL_maps: URL_maps
            }
        )


        res.status(200).json(
            {
                success: true,
                message: "Court updated successfully",
                data: courtUpdate
            }
        )

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Courts cant be update",
            error: error
        })
    }
}

//ELIMINAR PISTAS
export const deleteCourt = async (req: Request, res: Response) => {
    try {

        const courtId = req.params.id

        const courtDelete: any = await Court.findOneBy({
            id: parseInt(courtId)
        })


        if (!courtDelete) {
            return res.status(404).json({
                success: false,
                message: "Court not found"
            })
        }

        const courtRemove = await Court.remove(courtDelete)

        res.status(200).json(
            {
                success: true,
                message: "Court deleted successfully",
                data: courtRemove
            }
        )

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Courts cant be delete",
            error: error
        })
    }
}

//AÑADIR PISTA A FAVORITAS
export const favoriteCourts = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;
        const courtId = parseInt(req.params.id);

        const court = await Court.findOne({ where: { id: courtId } });
        if (!court) {
            return res.status(404).json({
                success: false,
                message: "Court not found"
            });
        }
        
        let favoriteCourt = await FavoriteCourt.findOne({
            where: {
                user: { id: userId },
                court: { id: courtId }
            }
        });

        if (!favoriteCourt) {
            
            favoriteCourt = new FavoriteCourt();
            favoriteCourt.user = { id: userId } as User;
            favoriteCourt.court = { id: courtId } as Court;
            favoriteCourt.name = court.name;
        } else {
            await favoriteCourt.remove();
            return res.status(200).json({
                success: true,
                message: "Removed from favorites successfully",
                data: favoriteCourt
            });
        }

        await favoriteCourt.save();

        return res.status(200).json({
            success: true,
            message:  "Added to favorites successfully",
            data: favoriteCourt
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: "Couldn't update favorites",
            error: error
        });
    }
};

//OBTENER MIS PISTAS FAVORITAS
export const getMyFavoriteCourts = async (req: Request, res: Response) => {
    try {

        const userId = req.tokenData.userId;

        const favoriteCourts = await FavoriteCourt.find({
            where: {
                user: { id: userId }
            },
            relations: ["court"]
        });


        res.status(200).json(
            {
                success: true,
                message: "Court retieved successfully",
                data: favoriteCourts
            }
        )

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Courts cant be retrieved",
            error: error
        })
    }
}
