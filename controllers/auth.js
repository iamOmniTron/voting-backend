const db = require("../models");
const z = require("zod");
const { isPassMatch, assignToken } = require("../utilities/helpers");


const TypeSchema = {
    LoginAdminSchema: z.object({
        email:z.string().email("email is required"),
        password:z.string().min(1,"password is required")
    }),
    LoginUserSchema: z.object({
        email:z.string().email("email is required"),
        password:z.string().min(1,"password is required")
    }),

}



module.exports = {
    loginUser: async (req,res,next)=>{
        try {
            const {email,password} = TypeSchema.LoginUserSchema.parse(req.body);
            const user = await db.User.findOne({where:{email,isAdmin:false}});
            if(!user) return res.status(403).json({
                success:false,
                message:"Invalid E-mail/password"
            });
            const isMatched = await isPassMatch(user.password,password);
            if(!isMatched) return res.status(403).json({
                success:false,
                message:"Invalid E-mail/password"
            });
            
            const token = assignToken({userId:user.id});
            return res.json({
                success:true,
                data:token
            })
        } catch (error) {
            return next(error);
        }
    },
    loginAdmin: async (req,res,next)=>{
        try {
            const {email,password} = TypeSchema.LoginAdminSchema.parse(req.body);
            const user = await db.User.findOne({where:{email,isAdmin:true}});
            if(!user) return res.status(403).json({
                success:false,
                message:"Invalid E-mail/password"
            });
            const isMatched = await isPassMatch(user.password,password);
            if(!isMatched) return res.status(403).json({
                success:false,
                message:"Invalid E-mail/password"
            });
            
            const token = assignToken({userId:user.id,admin:true});
            return res.json({
                success:true,
                data:token
            })
        } catch (error) {
            return next(error);
        }
    },

    profile: async(req,res,next)=>{
        try {
            const {userId} = req;

            const user = await db.User.findOne({where:{id:userId}});
            return res.json({
                success:true,
                data:user
            })
        } catch (error) {
            return next(error);
        }
    }
}