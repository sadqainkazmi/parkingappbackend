'use strict';
module.exports = (sequelize, DataTypes) => {
  var userFeedback = sequelize.define('userFeedback', {
    user_feedback: {
      type: DataTypes.STRING,
      allowNUll: true

    },
    admin_reply: {
        type: DataTypes.STRING,
        allowNUll: true
  
      },
  

  });
  userFeedback.associate =function (models) {
    userFeedback.belongsTo(models.User,{
      foreignKey: {
        name: 'userId'
      }
    });
    // associations can be defined here
  };
  
  return userFeedback;
}
