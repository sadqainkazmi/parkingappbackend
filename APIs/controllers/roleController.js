const role = require("../models/").userRole;

const createrole= async(req, res)=>{

    try {
       
            if (req && req.body && !req.body.rolename) {
                console.log('play',req.body);
                res.status(400).send({ data: { status: 0, message: "You must provide Role name and Permissions" } });
            } else {
                
                var roleExist = await role.findOne({ where: { rolename: req.body.rolename } });
                roleExist = JSON.parse(JSON.stringify(roleExist));
                if (roleExist && roleExist.rolename) {
                    res.status(200).send({ status: true, message: "Role name already exist, please change the role name", data: roleExist });
                } else {
                    var roleCreate = await role.create({
                        rolename: req.body.rolename,                        
                    });
                    if (roleCreate) {
                        res.status(200).send({ status: true, message: "Role created successfully", data: roleCreate });
                    }else{
                        res.status(200).send({ status: false, message: "Role does not create" });

                    }
        
                }
           
        }
            
    } catch (error) {
        res.status(500).send({status: false, message: error})    
    }

}
const getallrole = async(req, res) => {
    try {
       
                var roleExist = await role.findAll();
                roleExist = JSON.parse(JSON.stringify(roleExist));
                if (roleExist && roleExist.length >= 1) {
                    res.status(200).send({ status: true, message: "List Of all role", data: roleExist });
                } else {
                    res.status(200).send({ status: false, message: "No role exist", data: roleExist });
        
                }
      
    } catch (error) {
        res.status(500).send({status: false, message: error})    
    }
}
const editrole = async(req, res) =>{
    try {
      
            if ((req && req.body && !req.body.rolename) || (req && req.body && !req.body.rolepermission)) {
                res.status(400).send({ data: { status: 0, message: "You must provide Role name and Permissions" } });
            } else {
                
                var roleExist = await role.findOne({ where: { id: req.body.id } });
                roleExist = JSON.parse(JSON.stringify(roleExist));
                if (roleExist && roleExist.rolename) {
                    // throw { data: secure.encrpyt({ status: 0, message: "User exists already" }) }
                    var roleEdit = await role.update({
                        rolename: req.body.rolename,
                        rolepermission: req.body.rolepermission
                        
                    },
                    {where:{id: roleExist.id }, returning:true});
                    if (roleEdit) {
                        res.status(200).send({ status: true, message: "Role Edit successfully", data: roleEdit });
                    }else{
                        res.status(200).send({ status: false, message: "Role does not Edit" });

                    }



                } else {
                    res.status(200).send({ status: true, message: "There is no Role on this Role name" });

        
                }
        
        
            }    
        
            
    } catch (error) {
        res.status(500).send({status: false, message: error})    
    }
}
const deleterole = async (req, res) =>{
    try {
      
            if (req && req.body && req.body.id) {
                var roleExist = await role.findOne({ where: { id: req.body.id } });
                roleExist = JSON.parse(JSON.stringify(roleExist));
                
                
                if (roleExist && (roleExist.id == req.body.id)) {
                    
                    //user emain exist now update all data
                    var roleDelete = await role.destroy(
                    {where:{
                        id: roleExist.id
                    }});
                    if (roleDelete) {
                        res.status(200).send({ status: true, message: "Role Deleted successfully" });
                    } else{
                        res.status(200).send({ status: false, message: "Role doesnot delete" });
                    } 
                } else {
                    res.status(200).send({ status: false, message: "Role doesnot exist"});
        
                }
            } else {
                res.status(200).send({ status: false, message: "Please provide Role id as paramerter "});
        
            }
        
        
            
    } catch (error) {
        res.status(500).send({status: false, message: error})    
    }

}

module.exports={
    deleterole,
    editrole,
    createrole,
    getallrole
}