import { sequelize } from '../../instant_sports/configs/db.js';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
const saltRounds = 10;
const SiteController = {

    async index(req, res) {
        try {
            // Uncomment the code if you need to query the database
            // const users = await sequelize.query(
            //     'SELECT * FROM users',
            //     {
            //         type: sequelize.QueryTypes.SELECT
            //     }
            // );
            // console.log(users);

            return res.render('index', { "name": "keshav" });
        } catch (error) {
            console.error('Error in index:', error);
            return res.status(500).send('Internal Server Error');
        }
    },

    async login(req, res) {
        return res.render('login');
    },

    async loginUser(req, res) {

        const email = req.body.email;
        const password = req.body.password;
        try {
            const user = await User.findOne({ where: { email } });
            if (!user || !(await user.isValidPassword(password))) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            req.session.user = {
                id: user.id,
                email: user.email,
                is_loggedin: true
            };

            if (req.session.user.is_loggedin) {
                res.redirect('/');

            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async register(req, res) {
        return res.render('register');
    },

    async registerUser(req, res) {
        try {
            const { first_name, last_name, mobile, email, password } = req.body;
            console.log(req.body);
            const is_active = 1;
            const user_role = 1;

            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const result = await sequelize.query(
                'INSERT INTO users (first_name, last_name, mobile, email, password, is_active, user_role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, now(),now())',
                {
                    replacements: [first_name, last_name, mobile, email, hashedPassword, is_active, user_role],
                    type: sequelize.QueryTypes.INSERT,
                }
            );

            console.log(result);

            return res.redirect('/');
        } catch (error) {
            console.error('Error in registerUser:', error);
            return res.status(500).send('Internal Server Error');
        }
    },

    async getAllUsers(req,res){
        var users = await sequelize.query("select * from users order by id desc");
        console.log(users);
    },
    uploadFile(req, res) {
        // make entry in database or perform other actions
        return res.redirect('/');
    }
};

export { SiteController };
