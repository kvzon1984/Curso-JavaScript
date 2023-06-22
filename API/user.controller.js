const Users = require('./User')
const User = {
    list: async (req, res) => {
        const users = await Users.find()
        res.status(200).send(users)
    },
    get: async (req, res) => {
        const { id } = req.params
        const user = await Users.findOne({_id : id})
        res.status(200).send(user)
    },
    create: async (req, res) => { //post
        const user = new Users(req.body)
        const { id } = await user.save()
        res.status(200).send(id)
    },
    update: async (req, res) => { //put
        const { id } = req.params
        const user = await Users.findOne({ _id: id })
        Object.assign(user, req.body)
        await user.save()
        res.sendStatus(204)
    },
    destroy: async (req, res) => { //delete
        const { id } = req.params
        const user = await Users.findOne({ _id: id })
        console.log(user);
        if (user) {
            user.deleteOne()
        }

        res.sendStatus(204).send
    },
}

module.exports = User

