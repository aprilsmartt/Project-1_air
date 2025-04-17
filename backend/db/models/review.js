'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Spot, { 
        foreignKey: "spotId", 
        as: "spot", //! Alias for Spot association,
        unique: 'unique_review_per_spot' //! Prevent multiple reviews for the same spot
      });
      
      Review.belongsTo(models.User, { 
        foreignKey: "userId", 
        as: "user", //! Alias for User association,
        unique: 'unique_review_per_user' //! Prevent multiple reviews from the same user
      });
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 1000],
      },
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
        max: 5,
      },
    },
  },
    {
      sequelize,
      modelName: 'Review',
    }
  );

  return Review;
};
