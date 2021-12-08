const Sequelize = require('sequelize');

module.exports = class Bookmark extends Sequelize.Model{
    static init(sequelize){
        return super.init({
          sequelize,
          timestamps: true,
          underscored: false,
          modelName: 'Bookmark',
          tableName: 'Mookmarks',
          paranoid: false,
          charset: 'utf8mb4',
          collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db){
        db.Like.belongsTo(db.Post);
        db.Like.belongsTo(db.User);
    }
} 