'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.User, {foreignKey: 'authorId'})
      Job.hasMany(models.Skill, {foreignKey: 'jobId'})
      Job.belongsTo(models.Company, {foreignKey: 'companyId'})
    }
  }
  Job.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title is required"
        },
        notNull: {
          msg: "Title is required"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description is required"
        },
        notNull: {
          msg: "Description is required"
        }
      }
    },
    companyId: DataTypes.STRING,
    authorId: DataTypes.INTEGER,
    jobType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Job type is required"
        },
        notNull: {
          msg: "Job type is required"
        }
      }
    },
    mongo_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Mongo Id is required"
        },
        notNull: {
          msg: "Mongo Id is required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};