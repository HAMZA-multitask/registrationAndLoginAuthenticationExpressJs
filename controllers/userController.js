import UserModel from "../models/User.js"
import bcrypt from 'bcrypt'
class UserController {
    static home = (req, res) => {
        res.render("index")
    }

    static registration = (req, res) => {
        res.render("registration")
    }

    static login = (req, res) => {
        res.render("login")
    }

    static createUserDoc = async (req, res) => {
        try {
            // using bcrypt to hash the password in the database
            const hashPassword = await bcrypt.hash(req.body.password, 10)
            // Creating New Document using Model
            const doc = new UserModel({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword
            })

            // saving document
            await doc.save()
            res.redirect('/login')

        } catch (error) {
            console.log(error)
        }
    }

    static verifyLogin = async (req, res) => {
        try {
            const {email, password} = req.body
            const result = await UserModel.findOne({email:email})
            if (result != null) {
                const isMatch = await bcrypt.compare(password, result.password)
                if (result.email == email && isMatch) {
                    res.send(`<h1>Dashboard----${result}</h1>`)
                } else {
                    res.send(`<h1>Email or Password is not valid</h1>`)
                }
            } else {
                res.send(`<h1>You are not a registered user</h1>`)
            }
            
        } catch (error) {
            
        }
    }
}

export default UserController