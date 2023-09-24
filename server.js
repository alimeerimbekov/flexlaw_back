import express from 'express'
import multer from 'multer'
import cors from 'cors'
import handleValidatorErrors from "./utils/handleValidatorErrors.js";
import mongoose from 'mongoose'
import {login, register, getAllUser, getMe, addImage, addPost, rename} from "./controllers/UserController.js";
import {addComment, changeComment, deleteComment, getComment} from "./controllers/CommentController.js";
import {addNot, addYes, delVoice, getLaws, getLawsId, getOneLawsId, sendLaw} from "./controllers/LawsController.js";


mongoose.connect("mongodb+srv://alimeerimbekov:502505ali@law.3uf3adt.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log('Mongo DB успешно запущен'))
    .catch((err) => console.log('Ошибка при запуске Mongo DB ', err))


const server = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({storage})

server.use(express.json())
server.use(cors())
server.use('/uploads', express.static('uploads'))


const PORT = process.env.PORT || 5555

server.post('/upload', upload.single('image'), (req, res) => {
    res.json(
        {
            url: `/uploads/${req.file.originalname}`
        })
})

server.post('/auth/login', handleValidatorErrors, login)
server.post('/auth/register', register)

server.get('/users/:id', getMe)
server.get('/users', getAllUser)

server.post('/comment/add', addComment)
server.get('/comment/:id', getComment)
server.delete('/comment/:id/del', deleteComment)
server.patch('/comment/:id/change', changeComment)

server.post('/law/send', sendLaw)
server.get('/laws', getLaws)
server.get('/laws/:id', getLawsId)
server.get('/get/laws/:id', getOneLawsId)
server.patch('/law/:id/change/yes', addYes)
server.patch('/law/:id/change/not', addNot)
server.patch('/law/:id/change/del', delVoice)


server.listen(PORT, (err) => {
    if (err) {
        return console.log('Произошла ошибка', err)
    }
    console.log(`Сервер запущен на порту ${PORT}`)
})