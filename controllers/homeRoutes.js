const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const router = require('express').Router();
// gather all posts route
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
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
    
        res.render('homepage', { eachPost, loggedIn: req.session.loggedIn });
      } catch (err) {
        res.status(500).json(err);
      }
    });

// gather login page route
    router.get('/login', (req, res) => {
        if (req.session.loggedIn) {
            res.redirect('/');
            return;
        }
        res.render('login');
    });

// gather signup page route
    router.get('/signup', (req, res) => {
        res.render('signup');
    });

// gather a single post route
    router.get('/post/:id', async (req, res) => {
        try {
            const postData = await Post.findOne({
                where: {
                    id: req.params.id
                },
                attributes: [
                    'id',
                    'content',
                    'title',
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
            
        
            const eachPost = postData.get({ plain: true });
    
            console.log(eachPost);
        
            res.render('singlePost', { eachPost, loggedIn: req.session.loggedIn });
          } catch (err) {
            res.status(500).json(err);
          }
        });

        router.get('/posts-comments', async (req, res) => {
            try {
                const postData = await Post.findOne({
                    where: {
                        id: req.params.id
                    },
                    attributes: [
                        'id',
                        'content',
                        'title',
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
                
            
                const eachPost = postData.get({ plain: true });
        
                console.log(eachPost);
            
                res.render('posts-comments', { eachPost, loggedIn: req.session.loggedIn });
              } catch (err) {
                res.status(500).json(err);
              }
            });






    module.exports = router;