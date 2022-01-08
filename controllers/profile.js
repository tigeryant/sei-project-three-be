import User from '../models/user.js'

async function getProfileInfo(req, res, next) {
    // const { userId }= req.body


    // could find user by id
    try {
        // const user = await User.findOne({ _id: req.body.userId })
        const { userId } = req.params
        const user = await User.findById(userId)
        // const user = await User.findById(req.body.userId)
        //console.log('your email is: ', req.body.email)
        console.log('req.body: ', req.body)

        // test
        if (user) {
            console.log(`user found`)
        } else {
            console.log('user not found')
        }

        return res.status(200).json(user)

        // return res.status(200).json({
        //     profileImage: user.profileImage,
        //     firstName: user.firstName,
        //     lastName: user.lastName,
        //     username: user.username,
        //     email: user.email,
        //     // include favourites here

        //     // todo: check the front end and display this on the profile page
        //     // allUserInfo: user,
        // })
    } catch (err) {
        next(err)
    }
}

export default {
    getProfileInfo: getProfileInfo
}