import { Op } from 'sequelize';
import Sequelize from 'sequelize';

import { Comments, PostMedia, Post, Likes } from '../models/posts.js';

const ApiController = {
    async getPosts(req, res) {
        try {
            const perpage = 1000;
            const current_page = parseInt(req.body.page) || 1;
            const offset = (current_page - 1) * perpage;
            const total_data = await Post.count();
            const total_pages = Math.ceil(total_data / perpage);

            let query = {
                attributes: ['id', 'post_created_by', 'post_created_at', 'post_caption', 'post_type'],
                include: [
                    {
                        model: PostMedia,
                        attributes: ['media_name', 'media_type', 'media_position'],
                    },
                    {
                        model: Comments,
                        attributes: ['id', 'comment', 'comment_by', 'is_parent', 'parent_id', 'is_available', 'created_at'],
                    },
                    {
                        model: Likes,
                        attributes: ['id', 'liked_by', 'created_at'],
                    },
                ],
                order: [['id', 'DESC']],
                limit: perpage,
                offset: offset,
            };

            const post_id = parseInt(req.body.post_id) || 0;
            if (post_id) {
                query.where = { id: post_id };
            }
            const posts = await Post.findAll(query);

            res.json(posts);
        } catch (error) {
            console.error(error);
            
            res.status(500).json({ error: 'Unable to fetch posts' });
        }
    },
};

export { ApiController };
