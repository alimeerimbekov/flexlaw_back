import LawsModel from "../models/Laws.js"

export const sendLaw = async (req, res) => {
    try {

        const doc = new LawsModel(req.body)

        const law = await doc.save()
        res.json(law)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось отправить сообщение"
        })
    }

}

export const getLaws = async (req, res) => {
    try {

        let laws = await LawsModel.find({
            name: new RegExp(req.query.search, 'i')
        })

        res.json(laws)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить сообщения"
        })
    }
}

export const getLawsId = async (req, res) => {
    try {

        let laws = await LawsModel.find({
            senderId: req.params.id
        })
        res.json(laws)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить сообщения"
        })
    }
}

export const getOneLawsId = async (req, res) => {
    try {

        let laws = await LawsModel.findById({
            _id: req.params.id
        })
        res.json(laws)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить сообщения"
        })
    }
}

export const addYes = async (req, res) => {
    try {

        const lawsId = req.params.id
        let laws = await LawsModel.findById(lawsId)

            LawsModel.findByIdAndUpdate({
                _id: lawsId
            }, {
                yesV: [...laws._doc.yesV.filter(item => item !== req.body.yesV), req.body.yesV],
                notV: [...laws._doc.notV.filter(item => item !== req.body.yesV)]
            }, {
                returnDocument: 'after',
            }, (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        message: 'Не удалось добавить комментарий'
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

export const addNot = async (req, res) => {
    try {

        const lawsId = req.params.id
        let laws = await LawsModel.findById(lawsId)


        LawsModel.findByIdAndUpdate({
            _id: lawsId
        }, {
            notV: [...laws._doc.notV.filter(item => item !== req.body.notV), req.body.notV],
            yesV: [...laws._doc.yesV.filter(item => item !== req.body.notV)]
        }, {
            returnDocument: 'after',
        }, (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Не удалось добавить комментарий'
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

export const delVoice = async (req, res) => {
    try {

        const lawsId = req.params.id
        let laws = await LawsModel.findById(lawsId)


        LawsModel.findByIdAndUpdate({
            _id: lawsId
        }, {
            notV: [...laws._doc.notV.filter(item => item === req.body.notV ? '' : item)],
            yesV: [...laws._doc.yesV.filter(item => item === req.body.yesV ? '' : item)],
        }, {
            returnDocument: 'after',
        }, (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Не удалось добавить комментарий'
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
