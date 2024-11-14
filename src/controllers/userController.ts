import { Request, Response } from "express";
import { User } from "../models/User";


//VER TODOS LOS USUARIOS
export const getUsers = async (req: Request, res: Response) => {
    try {
        const limit = Number(req.query.limit) || 8; // elijo el limite que yo quiera y sino por defecto me dará 8
        const page = Number(req.query.page) || 1; //elijo empezar por la pagina que yo quiera y sino por defecto me dará la 1
        const skip = (page - 1) * limit as number // determinar por qué página quiero empezar

        if (limit > 100) {
            return res.status(404).json(
                {
                    success: false,
                    message: "you have exceeded the limit"
                }
            )
        }

        const users = await User.find(
            {
                select: {
                    id: true,
                    name: true,
                    nickname: true,
                    email: true,
                    favorite_position: true,
                    presentation: true,
                    image: true,
                },
                relations: ['role'],
                take: limit, //paginación para que me traiga 8 usuarios al hacer la petición.
                skip: skip
            }
        )

        res.status(200).json({
            success: true,
            message: "users retrieved successfully",
            data: users
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "It is not possible to recover the users",
            error: error
        })
    }
}

//VER MI PERFIL
export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;

        const userProfile = await User.findOneBy(
            {
                id: userId
            }
        )

        if (!userProfile) {
            return res.status(400).json({
                success: false,
                message: "User not found ",
            })
        }

        res.status(200).json({
            success: true,
            message: "User retrieved",
            data: userProfile
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User cant be retrieved",
            error: error
        })
    }
}

//ACTUALIZAR MI PERFIL
export const updateProfile = async (req: Request, res: Response) => {
    try {

        const { name, nickname, favorite_position, presentation, image } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required"
            })
        }

        if (!nickname) {
            return res.status(400).json({
                success: false,
                message: "Nickname is required"
            })
        }

        const positions = ['Base', 'Alero', 'Pivot'];
        if (!positions.includes(favorite_position)) {
            return res.status(400).json({
                success: false,
                message: "Favorite position must be 'Base', 'Alero' or 'Pivot'"
            })
        }

        const userUpdate = await User.update(
            {
                id: req.tokenData.userId
            },
            {
                name: name,
                nickname: nickname,
                favorite_position: favorite_position,
                presentation: presentation,
                image: image
            }
        )

        res.status(200).json({
            success: true,
            message: "User update",
            date: userUpdate
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User cant be update",
            error: error
        })
    }
}

//ELIMINAR USUARIO
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        const userToRemove: any = await User.findOneBy({
            id: parseInt(userId),
        })

        if (!userToRemove) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const userDelete = await User.remove(userToRemove)

        res.status(200).json(
            {
                success: true,
                message: "User delete",
                data: userDelete
            }
        )

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Cant delete user",
            error: error
        })
    }
}
