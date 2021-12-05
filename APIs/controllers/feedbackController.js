const feedback = require("../models/").userFeedback,
user = require("../models/").User;


const createfeedback= async(req, res)=>{

    try {
       
            if (req && req.body && !req.body.user_feedback) {
                console.log('play',req.body);
                res.status(400).send({ data: { status: 0, message: "You must provide some feedback" } });
            } else {
                
                    var feedbackCreate = await feedback.create({
                        user_feedback: req.body.user_feedback, 
                        userId:req.body.userId                       
                    });
                    if (feedbackCreate) {
                        res.status(200).send({ status: true, message: "feedback saved successfully", data: feedbackCreate });
                    }else{
                        res.status(200).send({ status: false, message: "feedback does not create" });

                    }
        
                // }
        
        
            }    
      
            
    } catch (error) {
        res.status(500).send({status: false, message: error})    
    }

}
const getallfeedback = async(req, res) => {
    try {
       
                var feedbacks = await feedback.findAll({include:[user]});
                feedbacks = JSON.parse(JSON.stringify(feedbacks));
                if (feedbacks && feedbacks.length >= 1) {
                    res.status(200).send({ status: true, message: "List Of all feedbacks", data: feedbacks });
                } else {
                    res.status(200).send({ status: false, message: "No feedbacks exist", data: feedbacks });
        
                }
            
    } catch (error) {
        res.status(500).send({status: false, message: error})    
    }
}
const replyfeedback = async(req, res) =>{
    try {
      
            if (req && req.body && !req.body.admin_reply) {
                res.status(400).send({ data: { status: 0, message: "You must provide reply" } });
            } else {
                
                var feedbackExist = await feedback.findOne({ where: { id: req.body.id } });
                feedbackExist = JSON.parse(JSON.stringify(feedbackExist));
                if (feedbackExist && feedbackExist.user_feedback) {
                    var reply = await feedback.update({
                        admin_reply:req.body.admin_reply
                        
                    },
                    {where:{id: feedbackExist.id }, returning:true});
                    if (reply) {
                        res.status(200).send({ status: true, message: "reply saved successfully", data: reply });
                    }else{
                        res.status(200).send({ status: false, message: "reply not saved" });

                    }



                } else {
                    res.status(200).send({ status: true, message: "There is no feedback exist with this id" });

        
                }
        
        
            }    
        
            
    } catch (error) {
        res.status(500).send({status: false, message: error})    
    }
}
const deletefeedback = async (req, res) =>{
    try {
      
            if (req && req.body && req.body.id) {
                var feedbackExist = await feedback.findOne({ where: { id: req.body.id } });
                feedbackExist = JSON.parse(JSON.stringify(feedbackExist));
                
                
                if (feedbackExist && (feedbackExist.id == req.body.id)) {
                    
                    var feedbackDelete = await feedback.destroy(
                    {where:{
                        id: feedbackExist.id
                    }});
                    if (feedbackDelete) {
                        res.status(200).send({ status: true, message: "feeedback Deleted successfully" });
                    } else{
                        res.status(200).send({ status: false, message: "feedback doesnot delete" });
                    } 
                } else {
                    res.status(200).send({ status: false, message: "feedback doesnot exist"});
        
                }
            } else {
                res.status(200).send({ status: false, message: "Please provide feedbck id as paramerter "});
        
            }
        
        
            
    } catch (error) {
        res.status(500).send({status: false, message: error})    
    }

}

module.exports={
    deletefeedback,
    replyfeedback,
    createfeedback,
    getallfeedback
}