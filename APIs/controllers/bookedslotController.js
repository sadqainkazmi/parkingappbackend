const booking = require("../models/").bookedSlots;
const slot = require("../models/").Slots;
const user = require("../models/").User;
const area = require("../models/").ParkingArea;
const Op = require('sequelize').Op;
const emailsender = require("../controllers/emailController")
const createbooking = async (req, res) => {

    try {

        if (req && req.body && !req.body.slotId) {
            res.status(400).send({ data: { status: 0, message: "You must provide slot id" } });
        } else {

            var bookingExist = await booking.findOne({ where: { [Op.and]: [{ slotId: req.body.slotId }, { is_booked: req.body.is_booked }] } });
            bookingExist = JSON.parse(JSON.stringify(bookingExist));
            if (bookingExist) {
                res.status(200).send({ status: false, message: "already booked", data: bookingExist });
            } else {
              
                var bookingCreate = await booking.create({
                    is_booked: req.body.is_booked,
                    end_time: req.body.end_time,
                    start_time: req.body.start_time,
                    end_date: req.body.end_date,
                    start_date: req.body.start_date,
                    userId: req.body.userId,
                    slotId: req.body.slotId,
                    parkingareaId: req.body.parkingareaId
                });
               
                if (bookingCreate) {
                    bookingCreate = JSON.parse(JSON.stringify(bookingCreate));
                    console.log(req.body.slotId);
                    var slotupdate = await slot.update({
                        available:false
                    },
                    {where:{id: req.body.slotId }, returning:true});
                    console.log(slotupdate);
                    if(slotupdate){
                        console.log('su');
                       emailsender.email("saadkaxmi@gmail.com", 'test', 'testt')

                        res.status(200).send({ status: true, message: "parkingslot booked successfully", data: bookingCreate });
                    }
                  
                } else {
                    res.status(200).send({ status: false, message: "slot does not booked" });

                }

            }


        }


    } catch (error) {
        res.status(500).send({ status: false, message: error })
    }

}
const getallbooking = async (req, res) => {
    try {

        var bookingExist = await booking.findAll({ include: [slot, user, area] });
        bookingExist = JSON.parse(JSON.stringify(bookingExist));
        if (bookingExist && bookingExist.length >= 1) {
            res.status(200).send({ status: true, message: "List Of all bookings", data: bookingExist });
        } else {
            res.status(200).send({ status: false, message: "No booking exist", data: bookingExist });

        }

    } catch (error) {
        res.status(500).send({ status: false, message: error })
    }
}
const deletebooking = async (req, res) => {
    try {

        if (req && req.body && req.body.id) {
            var bookingExist = await booking.findOne({ where: { id: req.body.id } });
            bookingExist = JSON.parse(JSON.stringify(bookingExist));


            if (bookingExist && (bookingExist.id == req.body.id)) {


                var bookingDelete = await booking.destroy(
                    {
                        where: {
                            id: req.body.id
                        }
                    });
                if (bookingDelete) {
                    res.status(200).send({ status: true, message: "booking Deleted successfully" });
                } else {
                    res.status(200).send({ status: false, message: "booking doesnot delete" });
                }
            } else {
                res.status(200).send({ status: false, message: "booking doesnot exist" });

            }
        } else {
            res.status(200).send({ status: false, message: "Please provide booking id as paramerter " });

        }


    } catch (error) {
        res.status(500).send({ status: false, message: error })
    }

}

module.exports = {
    createbooking,
    getallbooking,
    deletebooking
}