const db = require('../model')
const Polls = {
    showPolls: async (req, res, next) => {
        try {
            console.log(db);
            const polls = await db.polls.find();
            console.log(polls)
            res.status(200).json({ polls })
        } catch (err) {
            err.status = 400;
            next(err);
        }
    },
    createPolls: async (req, res, next) => {
        try {
            const { question, options } = req.body
            const poll = await db.polls.create({
                question,
                options: options.map(option => ({ option, votes: 0 }))
            });
            res.status(201).json({message: "Poll Created", poll_id:poll})

        } catch (err) {
            console.log(err)
            err.status = 400
            next(err)
        }
    }
}
module.exports = Polls;