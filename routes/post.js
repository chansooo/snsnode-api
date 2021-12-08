const express = require('express');
//const passport = require('passport');
//const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { isLoggedIn, isNotLoggedIn,  verifyToken, apiLimiter } = require('./middlewares');
const { Domain, User, Post, Hashtag, Like, Bookmark, Comment } = require('../models');

const postRouter = express.Router();


try {
    fs.readdirSync('uploads');
  } catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
  }
  

  const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, 'uploads/');
      },
      filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
  });



postRouter.get('/my', apiLimiter, verifyToken, (req, res) => {
    Post.findAll({ where: { userId: req.decoded.id } })
      .then((posts) => {
        //console.log(posts);
        res.json({
          code: 200,
          payload: posts,
        });
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({
          code: 500,
          message: '서버 에러',
        });
      });
  });
  
postRouter.get('/hashtag/:title', verifyToken, apiLimiter, async (req, res) => {
    try {
      const hashtag = await Hashtag.findOne({ where: { title: req.params.title } });
      if (!hashtag) {
        return res.status(404).json({
          code: 404,
          message: '검색 결과가 없습니다',
        });
      }
      const posts = await hashtag.getPosts();
      return res.json({
        code: 200,
        payload: posts,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        message: '서버 에러',
      });
    }
});

postRouter.get('/:id', verifyToken, apiLimiter, async (req, res)=>{
    const post = await Post.findOne({where: {postId: req.params.id}});
    if(!post){
        return res.status(404).json({
            code: 404,
            message: '해당하는 글이 없습니다.',
        });
    }
    const showPost = await post.getPosts();
    return res.json({
        code:200,
        payload: showPost,
    });
});

postRouter.post('/write', verifyToken, apiLimiter, async(req, res)=>{
    const {content, image} = req.body;
    await Post.create({
        content,
        image
    });
    res.redirect('/');
})

//앞에 /:id라우터보다 앞으로 빼야함
postRouter.patch('/:id/edit', verifyToken, apiLimiter, async(req, res)=>{
    const {content, image} = req.body;
    Post.update(
        {
            content,
            image,
        },{where: {postId: req.params.id}}
    );
});

postRouter.delete('/:id/delete', verifyToken, apiLimiter, async (req, res)=>{
    Post.destroy({where: {postId: req.params.id}});
});

postRouter.post('/comment/:id', verifyToken, apiLimiter, async(req, res)=>{
    const {content} = req.body;
    Comment.create({
        content,
        postId: req.params.id,
    });

});

postRouter.delete('/comment/:id', verifyToken, apiLimiter, async(req, res)=>{
    Comment.destroy({
        where: {commentId: req.params.id}
    });
})

postRouter.post('/like/:id', verifyToken, apiLimiter, async(req, res)=>{
    Like.create({
        PostId: req.params.id
    });
});

postRouter.delete('/like/:id', verifyToken, apiLimiter, async(req, res)=>{
    Like.destroy({
        where: {likeId: req.params.id}
    });
});

postRouter.post('/bookmark/:id', verifyToken, apiLimiter, async(req, res)=>{
    Bookmark.create({
        postId: req.params.id
    });
});

postRouter.delete('/bookmark/:id', verifyToken, apiLimiter, async(req, res)=>{
    Bookmark.destroy({where: {bookmarkId: req.params.id}});
});

