'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {
        foreignKey: "ownerId",
        as: "owner" //! Alias for owner
      }),

        Spot.hasMany(models.SpotImage, {
          foreignKey: "spotId",  //! The foreign key in SpotImage
          as: "spotImages"  //! Alias for association (lowercase)
        })
    }
  }
  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [5, 100],
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 100],
        },
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 100],
        },
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 100],
        },
      },
      //! Must be between -90 (South Pole) and 90 (North Pole)
      lat: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false,
        validate: {
          isDecimal: true,
          min: -90,
          max: 90,
        },
      },
      //! Must be between -180 (West) and 180 (East)
      lng: {
        type: DataTypes.DECIMAL(10, 7),
        allowNull: false,
        validate: {
          isDecimal: true,
          min: -180, 
          max: 180, 
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 100],
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 500]
        },
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 0,
        },
      },
    }, {
    sequelize,
    modelName: "Spot",
  });
  return Spot;
};