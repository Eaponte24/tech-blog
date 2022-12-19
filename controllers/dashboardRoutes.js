const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });
        
    
        const eachPost = postData.map((post) => post.get({ plain: true }));

        console.log(eachPost);
    
        res.render('dashboard', { eachPost, loggedIn: true });
      } catch (err) {
        res.status(500).json(err);
      }
    });

    router.get('/edit/:id', withAuth, async (req, res) => {
        try {
            const postData = await Post.findOne({
                where: {
                    id: req.params.id
                },
                attributes: ['id',
                    'title',
                    'content',
                    'created_at'
                ],
                include: [{
                        model: User,
                        attributes: ['username']
                    },
                    {
                        model: Comment,
                        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                        include: {
                            model: User,
                            attributes: ['username']
                        }
                    }
                ]
            });
            
        
            const eachPost = postData.get({ plain: true });
    
            console.log(eachPost);
        
            res.render('edit-post', { eachPost, loggedIn: true });
          } catch (err) {
            res.status(500).json(err);
          }
        });

        router.get('/new', (req, res) => {
            res.render('new-post');
        });



module.exports = router;