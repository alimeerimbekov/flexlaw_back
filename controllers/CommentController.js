import CommentModel from "../models/Comments.js"

export const addComment = async (req, res) => {
    try {

        const doc = new CommentModel({
            comment: req.body.comment,
            lawsId: req.body.lawsId,
        })

        const comment = await doc.save()
        res.json(comment)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось создать группу"
        })
    }
}

export const getComment = async (req, res) => {
    try {

        const laws = {lawsId: req.params.id}
        const comments = await CommentModel.find(laws)

        res.json(comments)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить группы"
        })
    }
}

export const deleteComment = async (req, res) => {
    try {

        const id = {comment: {
                userId: req.params.id
            }
        }

        const comment = await CommentModel.remove(id)
        res.json(comment)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось удалить группу"
        })
    }
}

export const changeComment = async (req, res) => {
    try {

        const commentId = req.params.id
        let comment = await CommentModel.findById(commentId)

        CommentModel.findByIdAndUpdate({
            _id: commentId,
        },{
            comment: req.body.comment
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



