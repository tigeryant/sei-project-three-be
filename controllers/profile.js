import User from '../models/user.js'

async function getProfileInfo(req, res, next) {
    // const user = await User.findOne({ email: req.body.email })
    // console.log('your email is: ', req.body.email)

    // // return res.status...
    // return res.status(202).json({
    //     message: `Your email here`,
    //     // message: `Your email is: ${user.email}`,
    // })

    try {
        const user = await User.findOne({ email: req.body.email })
        // console.log('your email is: ', req.body.email)
        return res.status(202).json({
            message: `Your email here`,
            // message: `Your email is: ${user.email}`,
        })
    } catch (err) {
        next(err)
    }
}

export default {
    getInfo: getProfileInfo
}