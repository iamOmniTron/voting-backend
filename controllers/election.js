const db = require("../models");
const z = require("zod");

const TypeSchema = {
    ElectionSchema: z.object({
        title:z.string(),
        commencement:z.string(),
        endDate:z.string(),
        contestants:z.string()
    })
}




module.exports = {
    createElection: async (req,res,next)=>{
        try {
            const body = TypeSchema.ElectionSchema.parse(req.body);
            const isCreated = await db.Election.create({...body});
            if(!isCreated) return res.json({
                success:false,
                message:"cannot create election"
            });
            return res.json({
                success:true,
                message:"election created successfully"
            })
        } catch (error) {
            return next(error);
        }
    },
    updateElection: async (req,res,next)=>{
        try {
            const {electionId} = req.params;
            const isUpdated = await db.Election.update({...req.body},{where:{id:electionId}});
            if(isUpdated[0] < 1) return res.json({
                success:false,
                message:"cannot update election"
            });
            return res.json({
                success:true,
                message:"election updated successfully"
            })
        } catch (error) {
            return next(error);
        }
    },
    getElections: async (req,res,next)=>{
        try {
            const elections = await db.Election.findAll();
            return res.json({
                success:true,
                data:elections
            })
        } catch (error) {
            return next(error)
        }
    },
    deleteElection: async (req,res,next)=>{
        try {
            const {electionId} = req.params;
            const isDeleted = await db.Election.destroy({where:{id:electionId}});
            if(isDeleted < 1) return res.json({
                success:false,
                message:"Election deleted successfully"
            })
        } catch (error) {
            return next(error);
        }
    }
}