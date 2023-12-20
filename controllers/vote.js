const db = require("../models");




module.exports = {
    vote: async (req,res,next)=>{
        try {
            const {userId} = req;
            const {electionId,contestant} = req.body;
            const isCreated = await db.Vote.create({contestant,ElectionId:electionId,UserId:userId});
            if(!isCreated) return res.json({
                success:false,
                message:"cannot register vote"
            });

            return res.json({
                success:true,
                message:"Vote successful"
            })
        } catch (error) {
            return next(error);
        }
    },
    getAllCandidateVote: async (req,res,next)=>{
        try {
            const contestant = req.query.candidate;
            const votes = await db.Vote.findAll({where:{contestant}});

            return res.json({
                success:true,
                data:votes
            })
        } catch (error) {
            return next(error)
        }
    },
}