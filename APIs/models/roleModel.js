'use strict';
module.exports = (sequelize, DataTypes) => {
  const userRole = sequelize.define('userRole', {
    rolename: {
      type: DataTypes.STRING,
      allowNull: true,
    },
   
  }, {});
  
  userRole.associate = function(models) {
    // associations can be defined here
  };
  return userRole;
};