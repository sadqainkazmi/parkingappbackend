'use strict';
module.exports = (sequelize, DataTypes) => {
  var bookedSlots = sequelize.define('bookedSlots', {
    end_time: {
      type: DataTypes.STRING,
      allowNUll: true

    },
    end_date: {
      type: DataTypes.STRING,
      allowNUll: true

    },
    start_time: {
      type: DataTypes.STRING,
      allowNUll: true

    },
    start_date: {
      type: DataTypes.STRING,
      allowNUll: true

    },
  
    is_booked: {
      type: DataTypes.BOOLEAN,
      allowNUll: true
    },

  });
  bookedSlots.associate =function (models) {
    bookedSlots.belongsTo(models.User,{
      foreignKey: {
        name: 'userId',
        allowNUll:true
      }
    });
    bookedSlots.belongsTo(models.Slots,{
        foreignKey: {
          name: 'slotId',
          allowNUll:true
        }

    // associations can be defined here
    });
    bookedSlots.belongsTo(models.ParkingArea,{
        foreignKey: {
          name: 'parkingareaId',
          allowNUll:true
        }

    // associations can be defined here
    });
}
  return bookedSlots;
}
