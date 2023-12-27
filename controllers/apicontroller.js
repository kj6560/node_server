import { sequelize } from '../../instant_sports/configs/db.js';

const ApiController = {
    async getPosts(req, res) {
        try {
            const posts = await sequelize.query(
                'SELECT posts.id AS id, ' +
                'posts.post_created_by AS post_created_by, ' +
                'pu.user_name AS post_created_by_username, ' +
                'posts.post_created_at AS post_created_at, ' +
                'posts.post_caption AS post_caption, ' +
                'posts.post_type AS post_type, ' +
                'pm.media_name AS media_name, ' +
                'pm.media_type AS media_type, ' +
                'pm.media_position AS media_position, ' +
                'c.id AS comment_id, ' +
                'c.comment AS comment, ' +
                'c.comment_by AS comment_by, ' +
                'c.is_parent AS is_parent, ' +
                'c.parent_id AS parent_id, ' +
                'c.is_available AS is_available, ' +
                'c.created_at AS comment_created_at, ' +
                'l.id AS like_id, ' +
                'l.liked_by AS liked_by, ' +
                'l.created_at AS like_created_at, ' +
                'com_user.user_name as comment_by_username, ' +
                'liked_user.user_name as liked_by_username ' + // Removed trailing comma
                'FROM posts ' +
                'INNER JOIN users AS pu ON posts.post_created_by = pu.id ' +
                'LEFT JOIN post_media AS pm ON posts.id = pm.post_id ' +
                'LEFT JOIN comments AS c ON posts.id = c.post_id ' +
                'LEFT JOIN users as com_user ON c.comment_by = com_user.id ' +
                'LEFT JOIN likes AS l ON posts.id = l.post_id ' +
                'LEFT JOIN users as liked_user ON l.liked_by = liked_user.id ' + // Renamed alias for liked_user
                'WHERE posts.is_available = :is_available ' +
                'ORDER BY posts.id',
                {
                    replacements: { is_available: 1 },
                    type: sequelize.QueryTypes.SELECT
                }
            );

            const groupedPosts = {};
            posts.forEach(post => {
                if (!groupedPosts[post.id]) {
                    groupedPosts[post.id] = {
                        id: post.id,
                        post_created_by: post.post_created_by,
                        post_created_by_username: post.post_created_by_username, // Added username property
                        post_created_at: post.post_created_at,
                        post_caption: post.post_caption,
                        post_type: post.post_type,
                        post_media: [],
                        comments: [],
                        likes: [] // Initialize likes array
                    };
                }

                if (post.media_name) {
                    groupedPosts[post.id].post_media.push({
                        media_name: post.media_name,
                        media_type: post.media_type,
                        media_position: post.media_position
                    });
                }

                if (post.comment_id) {
                    groupedPosts[post.id].comments.push({
                        id: post.comment_id,
                        comment: post.comment,
                        comment_by: post.comment_by_username,
                        comment_by_id: post.comment_by, // Added comment_by_id property
                        is_parent: post.is_parent,
                        parent_id: post.parent_id,
                        is_available: post.is_available,
                        created_at: post.comment_created_at
                    });
                }

                // Check if the like already exists in the likes array before pushing
                const existingLike = groupedPosts[post.id].likes.find(like => like.id === post.like_id);
                if (post.like_id && !existingLike) {
                    groupedPosts[post.id].likes.push({
                        id: post.like_id,
                        liked_by: post.liked_by_username,
                        created_at: post.like_created_at
                    });
                }
            });

            const response = Object.values(groupedPosts);
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Unable to fetch posts' });
        }
    },
};

export { ApiController };