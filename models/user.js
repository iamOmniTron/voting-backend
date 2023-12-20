



module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define("User",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:DataTypes.STRING,
        phone:DataTypes.STRING,
        email:DataTypes.STRING,
        gender:DataTypes.STRING,
        password:DataTypes.STRING,
        // this would be the stringified array buffer
        fingerprintData:DataTypes.TEXT,
        isAdmin:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    },{
        sequelize,freezeTableName:true,timestamps:true
    });


    User.associate = (models)=>{
        User.hasOne(models.Vote);
    }


    return User;
}