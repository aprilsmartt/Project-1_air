'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SpotImage.belongsTo(models.Spot, {
        foreignKey: "spotId",  //! The foreign key in SpotImage
        as: "spot"  //! Alias for association (lowercase)
      });
      // //! Optional: SpotImage can belong to a User indirectly via Spot
      // SpotImage.belongsTo(models.User, {
      //   foreignKey: "ownerId",  // Foreign key in SpotImage, through Spot
      //   as: "owner",  // Alias for the relationship (singular)
      // });
    }
  }
  SpotImage.init({
    spotId: {
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
        isUrl: true,  // Ensures it's a valid URL
      },
    },
    preview: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,  // Optional default    
    }
  }, {
    sequelize,
    modelName: "SpotImage",
  });
  return SpotImage;
};