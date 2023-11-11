'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.hasMany(models.Job, {foreignKey: 'companyId'})
    }
  }
  Company.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is required"
        },
        notNull: {
          msg: "Name is required"
        }
      }
    },
    companyLogo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Company Logo is required"
        },
        notNull: {
          msg: "Company Logo is required"
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Location is required"
        },
        notNull: {
          msg: "Location is required"
        }
      }
    },
    email: DataTypes.STRING,
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description is required"
        },
        notNull: {
          msg: "Description is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};