const express = require('express');
const { isLoggedIn, isNotLoggedIn,  verifyToken, apiLimiter } = require('./middlewares');
const { Domain, User, Post, Hashtag, Like, Bookmark, Comment } = require('../models');

export const userRouter = express.Router();

userRouter.use(isLoggedIn, verifyToken, apiLimiter);

userRouter.get("/:id", async(req, res) =>{
    const user = User.findOne({where: {userId: req.params.id}});
    return res.json({
        code: 200,
        payload: user,
    });
});

userRouter.get("/following/:id/", async(req, res)=>{
    const user = User.findOne({where: {userId: req.params.id}});
    const followingUser = user.getFollowings();
    return res.status(200).json(followingUser);
})

userRouter.get("/followed/:id/", async(req, res)=>{
    const user = User.findOne({where: {userId: req.params.id}});
    const followedUser = user.getFollowers();
    return res.status(200).json(followedUser);
})

userRouter.get("/like/:id", async(req, res)=>{
    const likePost = req.params.id.
})

userRouter.get("/bookmark/:id", async(req, res)=>{

})

userRouter.post("/follow/:id", async(req, res)=>{
    
})