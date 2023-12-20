const db = require("../models");



module.exports = {
    createUser: async (req,res,next)=>{
        try {
            const isCreated = await db.User.create({...req.body});
            if(!isCreated) return res.json({
                success:false,
                message:"Cannot created"
            });

            return res.json({
                success:true,
                message:"User created successfully"
            })
        } catch (error) {
            return next(error);
        }
    },
    getUsers: async (req,res,next)=>{
        try {
            const users = await db.User.findAll();
            return res.json({
                success:true,
                data:users
            })
        } catch (error) {
            return next(error);
        }
    },
    deleteUser: async (req,res,next)=>{
        try {
            const {userId} = req.params;
            const isDeleted = await db.User.destroy({where:{id:userId}});
            if(isDeleted < 1) return res.json({
                success:false,
                message:"Cannot delete user"
            });

            return res.json({
                success:true,
                message:"user deleted successfully"
            })
        } catch (error) {
            return next(error);
        }
    }
}