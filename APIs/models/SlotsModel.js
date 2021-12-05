'use strict';
module.exports = (sequelize, DataTypes) => {
  var Slots = sequelize.define('Slots', {
    available: {
      type: DataTypes.BOOLEAN,
      allowNUll: true

    },

  });
  Slots.associate =function (models) {
    Slots.belongsTo(models.ParkingArea,{
        foreignKey: {
          name: 'parkingareaId',
          allowNUll:true
        }

    // associations can be defined here
    });
}
  return Slots;
}
