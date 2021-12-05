'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    user_name: {
      type: DataTypes.STRING,
      allowNUll: true

    },
    email: {
      type: DataTypes.STRING,
      allowNUll: true

    },
    password: {
      type: DataTypes.STRING,
      allowNUll: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNUll: true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNUll: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNUll: true
    },

  });
  User.associate =function (models) {
    User.belongsTo(models.userRole,{
      foreignKey: {
        name: 'roleId'
      }
    });
    // associations can be defined here
  };
  
  return User;
}
