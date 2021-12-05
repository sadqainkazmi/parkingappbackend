const
User = require("../models").User,
jwt = require('jsonwebtoken'),
bcrypt = require("bcryptjs"),
role = require("../models/").userRole;


const createUser = async (req, res) => {
    let fields = req.body;
    try {
      
    fields.password=bcrypt.hashSync(fields.password,10);
    
    console.log(" req.body.email", req.body)
    if (Object.keys(fields).length === 0 && fields.constructor === Object)
        return res.status(200).send({ status: 0, message: "empty body" });

    var userExist = await User.findOne({ where: { email: fields.email } });
    userExist = JSON.parse(JSON.stringify(userExist));
    if (userExist && userExist.email) {
        res.status(200).send({ status: false, message: "User Exist", data: "user already exist" });
    } else {
        var userCreate = await User.create({
            user_name: fields.user_name,
            email: fields.email,
            password: fields.password,
            first_name: fields.first_name,
            last_name: fields.last_name,
            roleId: fields.roleId,
            is_active: true
        });
    }
        if (userCreate) {
            res.status(200).send({ status: true, message: "User created successfully", data: userCreate });
        } else {
            res.status(200).send({ status: false, message: "User does not create" });

        }
    // }
}
catch (error) {
    res.status(500).send({ status: false, message: error })
}
}
const login = async (req, res) => {
    try {
    if ((req && req.body && !req.body.email) || (req && req.body && !req.body.password)) {
        res.status(400).send({ data: { status: 0, message: "You must provide email, password" } });
    } else {
        var checkuser = await User.findOne({ where: { email: req.body.email }, include: [role]});

        if (checkuser && (await bcrypt.compare(req.body.password, checkuser.password)) && (req.body.email == checkuser.email)) {
            jwt.sign({ data: checkuser,"ACCESS_TOKEN_SECRET":process.env.ACCESS_TOKEN_SECRET }, "privateKey", { expiresIn: Math.floor(Date.now() / 1000) - (6120 * 2160) }, function (err, token) {
     //for expire in 30 mints     // jwt.sign({ data: checkuser }, "privateKey", { expiresIn: 30 }, function (err, token) {
                if (token) {
                    res.status(200).send({ status: true, message: "User exist", data: checkuser, token: token })
                } else {
                    res.status(200).send({ status: false, message: "Error", error: err })
                }
            });

        } else {

            res.status(200).send({ status: false, message: "Please type correct email and password" })
        }
        
    }
 } catch (error) {
        res.status(500).send({status: false, message: error})    
    }

}
const listuser = async (req, res) => {
    try {
       


            var getallUser = await User.findAll({include:[role]});
            if (getallUser && getallUser.length >= 1) {
                res.status(200).send({ status: true, message: "All User", data: getallUser });
            } else {

                res.status(200).send({ status: false, message: "There is no user in list", data: getallUser });
            }
        

    } catch (error) {
        res.status(500).send({ status: false, message: error})
    }
}
const updateuser = async (req, res) => {
    try {
    
            console.log(verifytoken);
            if (req && req.body && req.body.id) {
                var userExist = await User.findOne({ where: { id: req.body.id } });
              userExist = JSON.parse(JSON.stringify(userExist));
                let fields=req.body;
                
                if (userExist && userExist.id && userExist.email) {
                    var userUpdate = await User.update({
                        user_name:fields.user_name,
                          email:fields.email,
                          first_name:fields.first_name,
                          last_name:fields.last_name,
                          is_active:fields.is_active,
                          roleId: req.body.roleId
                   
                     } , {
                        where: {
                            id: userExist.id
                        }, returning: true
                    }
                    );
                    if (userUpdate) {
                        res.status(200).send({ status: true, message: "User update successfully", data: userUpdate });
                    } else {
                        res.status(200).send({ status: false, message: "User doesnot update", data: userUpdate });
                    }
                } else {
                    res.status(200).send({ status: false, message: "User doesnot exist" });

                }
            } else {
                res.status(200).send({ status: false, message: "Please provide user id as parameter" });

            }
        


    } catch (error) {
        res.status(500).send({ status: false, message: error })
    }
}
const deleteuser = async (req, res) => {
    try {
      
            if (req && req.body && req.body.id) {
                var userExist = await User.findOne({ where: { id: req.body.id } });
                userExist = JSON.parse(JSON.stringify(userExist));


                if (userExist && (userExist.id == req.body.id)) {
                   
                    //user emain exist now update all data
                    var userUpdate = await User.destroy(
                        {
                            where: {
                                id: userExist.id
                            }
                        });
                    if (userUpdate) {
                        res.status(200).send({ status: true, message: "User Deleted successfully" });
                    } else {
                        res.status(200).send({ status: false, message: "User doesnot delete" });
                    }
                } else {
                    res.status(200).send({ status: false, message: "User doesnot exist" });

                }
            } else {
                res.status(200).send({ status: false, message: "Please provide userid as paramerter " });

            }
        


    } catch (error) {
        res.status(500).send({ status: false, message: error })
    }
}
const canactive = async (req, res) => {
    try {
        
            if (req && req.body && req.body.id && req.body.isactive) {
                var userExist = await User.findOne({ where: { id: req.body.id } });
                userExist = JSON.parse(JSON.stringify(userExist));


                if (userExist && (userExist.id == req.body.id)) {
                    console.log("user  ", userExist);
                    
                    var userUpdate = await user.update({ is_active: req.body.isactive },
                        {
                            where: {
                                id: userExist.id
                            }, returning: true

                        });
                    if (userUpdate) {
                        res.status(200).send({ status: true, message: "User Status change successfully", data: userUpdate });
                    } else {
                        res.status(200).send({ status: false, message: "User status doesnot change" });
                    }
                } else {
                    res.status(200).send({ status: false, message: "User doesnot exist" });

                }
            } else {
                res.status(200).send({ status: false, message: "Please provide userid and isactive as paramerter " });

            }
        


    } catch (error) {
        res.status(500).send({ status: false, message: error })
    }
}

const getuserbyid = async (req, res) => {
    try {
       
            var Userone = await User.findOne({ where: { id: req.body.id } });
            Userone = JSON.parse(JSON.stringify(Userone));
            

            if (Userone && Userone.email) {
                
                res.status(200).send({ status: true, message: "User found", data: Userone });
            } else {

                res.status(200).send({ status: false, message: "There is no user in list", data: User });
            }
        

    } catch (error) {
        res.status(500).send({ status: false, message: error })
    }
}

const changepassword = async (req, res) => {
    try {
        
        if (req && req.body && req.body.id && req.body.currentpass && req.body.newpass) {

            var checkuser = await User.findOne({ where: { id: req.body.id }});

            if (checkuser && (await bcrypt.compare(req.body.currentpass, checkuser.password)) && (req.body.id == checkuser.id)) {
                checkuser = JSON.parse(JSON.stringify(checkuser));
                var userUpdate = await User.update({ password: await bcrypt.hash(req.body.newpass, 10), },
                    {
                        where: {
                            id: checkuser.id
                        }, returning: true

                    });
                if (userUpdate) {
                    res.status(200).send({ status: true, message: "Your password is updated successfully" })

                }

            } else {

                res.status(200).send({ status: false, message: "Please type correct email and password" })
            }

        } else {
            res.status(200).send({ status: false, message: "Please provide current and new password" });
        }


        

    } catch (error) {
        res.status(403).send({ status: false, message: error })
    }
}


module.exports = {getuserbyid,createUser,login,listuser,updateuser,deleteuser,canactive,changepassword}