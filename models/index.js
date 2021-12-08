const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');
const Like = require('./domain');
const Comment = require('./comment');
const Bookmark = require('./bookmark');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;
db.Domain = Domain;
db.Like = Like;
db.Comment = Comment;
db.Bookmark = Bookmark;

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);
Domain.init(sequelize);
Like.init(sequelize);
Comment.init(sequelize);
Bookmark.init(sequelize);

User.associate(db);
Post.associate(db);
Hashtag.associate(db);
Domain.associate(db);
Like.associate(db);
Comment.associate(db);
Bookmark.associate(db);

module.exports = db;