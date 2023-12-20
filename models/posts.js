import { Sequelize, DataTypes } from 'sequelize';
import {sequelize} from '../../web_server/db.js';
const Post = sequelize.define('posts', {
  post_created_by: DataTypes.INTEGER,
  post_created_at: DataTypes.DATE,
  post_caption: DataTypes.STRING,
  post_type: { type: DataTypes.INTEGER },
  updated_at: {
    type: DataTypes.DATE,
  },
  created_at: {
    type: DataTypes.DATE,
  }
},{timestamps: false});

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


Post.hasMany(PostMedia, { foreignKey: 'post_id' }); // Assuming 'post_id' is the foreign key in PostMedia
PostMedia.belongsTo(Post, { foreignKey: 'post_id' });

export { Post, PostMedia };