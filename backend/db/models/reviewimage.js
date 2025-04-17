'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReviewImage.belongsTo(models.Review, {
        foreignKey: "reviewId",  //! The foreign key in ReviewImage
        as: "review"  //! Alias for association (lowercase)
      });
      // //! Optional: ReviewImage can belong to a User indirectly via Spot
      // SpotImage.belongsTo(models.User, {
      //   foreignKey: "ownerId",  // Foreign key in ReviewImage, through Spot
      //   as: "owner",  // Alias for the relationship (singular)
      // });
    }
  }
  ReviewImage.init({
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [12, 255],
      },
    },
    //! NOT NEEDED NOW BUT can uncomment to use if preview of review image desired later
    // preview: {
    //   type: DataTypes.BOOLEAN
    // }
  }, {
    sequelize,
    modelName: "ReviewImage",
  });
  return ReviewImage;
};