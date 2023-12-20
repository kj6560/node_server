import { Sequelize, DataTypes } from 'sequelize';
import {sequelize} from '../../web_server/db.js';

const PostMedia = sequelize.define('post_media', {
    post_id: { type: DataTypes.INTEGER },
    media_name: { type: DataTypes.STRING },
    media_type: { type: DataTypes.INTEGER },
    media_created_by: { type: DataTypes.INTEGER },
    media_position: { type: DataTypes.INTEGER },
    updated_at: {
        type: DataTypes.DATE,
    },
    created_at: {
        type: DataTypes.DATE,
    }
}, { timestamps: false });

export { PostMedia };