const { ELECTION_STATUS } = require("../utilities/defaults")



module.exports = (sequelize,DataTypes)=>{
    const Election = sequelize.define("Election",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        title:DataTypes.STRING,
        status:{
            type:DataTypes.STRING,
            defaultValue:ELECTION_STATUS.PENDING
        },
        winner:DataTypes.STRING,
        commencement:DataTypes.STRING,
        endDate:DataTypes.STRING,
        contestants:DataTypes.TEXT

    },
    {
        sequelize,freezeTableName:true,timestamps:true
    });

    Election.associate = (models)=>{
        Election.hasMany(models.Vote);
    }


    return Election;
}