'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //! A booking belongs to a user
      Booking.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
      //! A booking belongsTo a spot, meaning you "book a spot"
      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        as: 'spot',
      });
    }
  }
  Booking.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Ensures userId is required
      validate: {
        isInt: true, // Ensures userId is an integer
        min: 1, // Ensures userId is a positive integer
      },
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true, // Ensures startDate is a valid date
      },
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      // validate: {
      //   isDate: true,
      //   isAfter: {
      //     args: Sequelize.col('startDate'), // Ensures endDate is after startDate
      //     msg: 'endDate must be after startDate',
      //   },
      // },
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });

  return Booking;
};
