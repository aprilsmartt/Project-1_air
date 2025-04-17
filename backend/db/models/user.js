'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Spot, {
        foreignKey: "ownerId", // the foreign key in Spot that links to User
        as: "spots",  // alias for the relationship
      });

      User.hasMany(models.Review, {
        foreignKey: 'userId', // The foreign key in Review that links to User
        as: 'reviews', // Alias for the association (plural)
      });
      
      User.hasMany(models.Booking, {
        foreignKey: 'userId',
        as: 'bookings'
      });


      // //! Optional: One-to-many relationship between User and SpotImage
      // //! This is an indirect relationship through Spot, BECAUSE the User owns a Spot, AND each Spot has many SpotImages.
      // User.hasMany(models.SpotImage, {
      //   foreignKey: "spotId",  // the foreign key in SpotImage that links to Spot
      //   as: "spotImages",  // alias for the relationship
      // });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        len: [4, 30],                        // username must be 4-30 characters
        isNotEmail(value) {                  // custom validator
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        len: [3, 256],                       // email must be 3-256 characters
        isEmail: true,                       // must be a valid email format
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,  //! use binary string
      validate: {
        len: [60, 60],                       // bcrypt hashes are always 60 characters
      },
    },
    //! add firstName and lastName attributes
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 100]
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 100]
      },
    },
  }, {
    sequelize,
    modelName: "User",
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
      },
    }
  });
  return User;
};