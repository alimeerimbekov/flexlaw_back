import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            name: req.body.name,
            inn: req.body.inn,
            phone: req.body.phone,
            passwordHash: hash
        })

        const user = await doc.save()

            const token = jwt.sign({
                _id: user._id
            }, 'secret123', {expiresIn: '90d'})

        const {passwordHash, ...userData} = user._doc

        res.json({
            ...userData,
            token
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось зарегистрироваться'
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({inn: req.body.inn})

        if (!user) {
            return res.status(404).json({
                message: 'Такого аккаунта не существует'
            })
        }

        const inValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if (!inValidPass) {
            return res.status(404).json({
                message: 'Неверный логин или пароль '
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, 'secret123', {expiresIn: '30d'})

        const {passwordHash, ...userData} = user._doc

        res.json({
            ...userData,
            token
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось войти'
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }
        const {passwordHash, ...userData} = user._doc
        res.json(userData)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Нет доступа'
        })
    }
}

export const getAllUser = async (req, res) => {
    try {
        let users = await UserModel.find({
            name: new RegExp(req.query.search, 'i')
        });

        users = Array.from(users).filter((item) => item.name !== req.query.not)

        res.json(users)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить все  статьи'
        })
    }
}

export const addImage = async (req, res) => {
    try {

        const userId = req.params.id
        let user = await UserModel.findById(userId)

        UserModel.findByIdAndUpdate({
            _id: userId
        }, {
            image: req.body.image
        }, {
            returnDocument: 'after',
        }, (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Не удалось добавить фото'
                })
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Фото не найдено'
                })
            }
            res.json(doc)
        })

    } catch (err) {
        res.status(500).json({
            message: 'Не удалось отправить запрос'
        }, {
            returnDocument: 'after'
        })
    }
}

export const addPost = async (req, res) => {
    try {

        const userId = req.params.id
        let user = await UserModel.findById(userId)

        UserModel.findByIdAndUpdate({
            _id: userId,
        },{
            post: req.body.post
        }, {
            returnDocument: 'after',
        }, (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Не удалось добавить пост'
                })
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'ERROR: No documentation'
                })
            }
            res.json(doc)
        })

    } catch (err) {
        res.status(500).json({
            message: 'Не удалось отправить запрос'
        }, {
            returnDocument: 'after'
        })
    }
}

export const rename = async (req, res) => {
    try {

        const userId = req.params.id
        let user = await UserModel.findById(userId)

        UserModel.findByIdAndUpdate({
            _id: userId,
        },{
            name: req.body.name
        }, {
            returnDocument: 'after',
        }, (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Не удалось добавить пост'
                })
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'ERROR: No documentation'
                })
            }
            res.json(doc)
        })

    } catch (err) {
        res.status(500).json({
            message: 'Не удалось отправить запрос'
        }, {
            returnDocument: 'after'
        })
    }
}









