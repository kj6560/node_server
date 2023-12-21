// models/User.js
import bcrypt from 'bcryptjs';

import { sequelize } from '../../web_server/configs/db.js';
import { DataTypes } from 'sequelize';
const User = sequelize.define('user', {
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    user_role: { type: DataTypes.INTEGER },
    updated_at: {
        type: DataTypes.DATE,
    },
    created_at: {
        type: DataTypes.DATE,
    }
}, { tableName: 'users',timestamps: false });
// Hash password before saving
User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

// Compare password
User.prototype.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default User;
