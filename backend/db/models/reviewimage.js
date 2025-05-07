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
      // SpotImage.belongsTo(models.Review, {
      //   foreignKey: "reviewId", // foreign key in ReviewImage
      //   as: "review"  // alias for the association
      // });

      ReviewImage.belongsTo(models.Review, {
        foreignKey: "reviewId",  //! The foreign key in ReviewImage
        as: "review"  //! Alias for association (lowercase)
      });

      //! Optional: ReviewImage can belong to a User indirectly via Spot
      // If needed, this can be defined through the Spot -> Review -> ReviewImage relationship:
      // ReviewImage.belongsTo(models.User, {
      //   foreignKey: "ownerId", // foreign key for User
      //   as: "owner",  // Alias for indirect ownership
      // });
    }
  }
  ReviewImage.init({
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Reviews',
        key: 'id',
      },
      onDelete: 'CASCADE',
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