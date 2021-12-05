'use strict';
module.exports = (sequelize, DataTypes) => {
  var ParkingArea = sequelize.define('ParkingArea', {
    parkingarea_name: {
      type: DataTypes.STRING,
      allowNUll: true

    },
    parking_slot: {
        type: DataTypes.INTEGER,
        allowNUll: true
  
      },
     
  

  });
  ParkingArea.associate =function (models) {
   
    // associations can be defined here
  };
  
  return ParkingArea;
}
