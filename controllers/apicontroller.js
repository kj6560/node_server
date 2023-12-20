import { Op } from 'sequelize';
import Sequelize from 'sequelize';

import { Post } from '../models/posts.js';
import { PostMedia } from '../models/posts_media.js';

const ApiController = {
    async getPosts(req, res) {
        try {
            const perpage = 1;
            const current_page = parseInt(req.query.page) || 1;
            const offset = (current_page - 1) * perpage;
            const total_data = await Post.count();
            const total_pages = Math.ceil(total_data / perpage);

            const posts = await Post.findAll({
                attributes: ['id', 'post_created_by', 'post_created_at', 'post_caption', 'post_type'],
                include: {
                    model: PostMedia,
                    attributes: ['media_name', 'media_type', 'media_position'],
                },
                order: [['id', 'DESC']],
                limit: perpage,
                offset: offset,
            });
            res.json({ posts,total_data,perpage,current_page, total_pages });
        } catch (error) {
            res.status(500).json({ error: 'Unable to fetch posts' });
        }
    },
};

export { ApiController };
