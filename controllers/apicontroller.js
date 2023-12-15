const User = require("../models/user");

const ApiController = {
    index(req,res) {
        return User.getAll((err, users) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(users);
            }
        });
    }
};

module.exports = ApiController;