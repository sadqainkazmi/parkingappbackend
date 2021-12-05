const parkingarea = require("../models/").ParkingArea;
const slots = require("../models/").Slots;
const jwt = require('jsonwebtoken');
const area = require("../models/").ParkingArea;

const createparkingarea= async(req, res)=>{

    try {
        
            if (req && req.body && !req.body.parkingarea_name) {
                console.log('play',req.body);
                res.status(400).send({ data: { status: 0, message: "You must provide parking area name" } });
            } else {
                
                var areaExist = await parkingarea.findOne({ where: { parkingarea_name: req.body.parkingarea_name } });
                areaExist = JSON.parse(JSON.stringify(areaExist));
                if (areaExist && areaExist.parkingarea_name) {
                    res.status(200).send({ status: true, message: "area name already exist, please change the area name", data: areaExist });
                } else {
                    var areaCreate = await parkingarea.create({
                        parkingarea_name: req.body.parkingarea_name,  
                        parking_slot: req.body.parking_slot                         
                    });
                    console.log(areaCreate.parking_slot);
                    if (areaCreate) {
                        for (let index = 0; index <= areaCreate.parking_slot; index++) {
                           console.log('times');
                            var slotCreate = await slots.create({
                                available:true,
                                parkingareaId: areaCreate.id
                                                     
                            });
                        }
                     
                        if(slotCreate){
                            res.status(200).send({ status: true, message: "parking area with created successfully", data: areaCreate });

                        }
                    }else{
                        res.status(200).send({ status: false, message: "parking area does not create" });

                    }
        
                }
        
        
            }    
        
            
    } catch (error) {
        res.status(500).send({status: false, message: error})    
    }

}
const getallareas = async(req, res) => {
    try {
      
                var areaExist = await parkingarea.findAll();
                areaExist = JSON.parse(JSON.stringify(areaExist));
                if (areaExist && areaExist.length >= 1) {
                    res.status(200).send({ status: true, message: "List Of all area", data: areaExist });
                } else {
                    res.status(200).send({ status: false, message: "No area exist", data: areaExist });
        
                }
       
            
    } catch (error) {
        res.status(500).send({status: false, message: error})    
    }
}
const editarea = async(req, res) =>{
    try {
     
            if ((req && req.body && !req.body.parkingarea_name) || (req && req.body && !req.body.id)) {
                res.status(400).send({ data: { status: 0, message: "You must provide area name and id" } });
            } else {
                
                var areaExist = await parkingarea.findOne({ where: { id: req.body.id } });
                areaExist = JSON.parse(JSON.stringify(areaExist));
                if (areaExist && areaExist.rolename) {
                    var areaEdit = await parkingarea.update({
                        parkingarea_name: req.body.parkingarea_name,  
                        parking_slot: req.body.parking_slot     
                        
                    },
                    {where:{id: areaExist.id }, returning:true});
                    if (roleEdit) {
                        res.status(200).send({ status: true, message: "area Edit successfully", data: areaEdit });
                    }else{
                        res.status(200).send({ status: false, message: "area does not Edit" });

                    }



                } else {
                    res.status(200).send({ status: true, message: "There is no area on this area name" });

        
            }    
        }
            
    } catch (error) {
        res.status(500).send({status: false, message: error})    
    }
}
const deletearea = async (req, res) =>{
    try {
      
            if (req && req.body && req.body.id) {
                var areaExist = await parkingarea.findOne({ where: { id: req.body.id } });
                areaExist = JSON.parse(JSON.stringify(areaExist));
                
                
                if (areaExist && (areaExist.id == req.body.id)) {
                    
                    //user emain exist now update all data
                    var areaDelete = await parkingarea.destroy(
                    {where:{
                        id: areaExist.id
                    }});
                    if (areaDelete) {
                        res.status(200).send({ status: true, message: "area Deleted successfully" });
                    } else{
                        res.status(200).send({ status: false, message: "area doesnot delete" });
                    } 
                } else {
                    res.status(200).send({ status: false, message: "areae doesnot exist"});
        
                }
            } else {
                res.status(200).send({ status: false, message: "Please provide area id as paramerter "});
        
            }
      
            
    } catch (error) {
        res.status(500).send({status: false, message: error})    
    }

}
const getslotsbyparkingareaid = async(req, res) => {
    try {
   
                var slotsExist = await slots.findAll({ where: { parkingareaId: req.body.parkingareaId }, include: [ area]  });
                slotsExist = JSON.parse(JSON.stringify(slotsExist));
                if (slotsExist && slotsExist.length >= 1) {
                    res.status(200).send({ status: true, message: "List Of all area", data: slotsExist });
                } else {
                    res.status(200).send({ status: false, message: "No area exist", data: slotsExist });
        
                }
        
      
            
    } catch (error) {
        res.status(500).send({status: false, message: error})    
    }
}
module.exports={
    deletearea,
    editarea,
    createparkingarea,
    getallareas,
    getslotsbyparkingareaid
}