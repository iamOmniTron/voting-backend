





module.exports = (sequelize,DataTypes)=>{
    const Vote = sequelize.define("Vote",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        contestant:DataTypes.STRING,
    },{
        sequelize,freezeTableName:true,timestamps:true
    });


    Vote.associate = (models)=>{
        Vote.belongsTo(models.User);
        Vote.belongsTo(models.Election)
    }

    return Vote;
}