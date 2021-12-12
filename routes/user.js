const express = require('express');
const { isLoggedIn, isNotLoggedIn,  verifyToken, apiLimiter } = require('./middlewares');
const { Domain, User, Post, Hashtag, Like, Bookmark, Comment } = require('../models');

export const userRouter = express.Router();

userRouter.use(isLoggedIn, verifyToken, apiLimiter);

userRouter.get("/user/:id",  )