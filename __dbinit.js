const db = require("./models");
const { hashPassword } = require("./utilities/helpers");


async function createAdmin(){
    try {
        const password = await hashPassword("12345678");
        await db.User.create({name:"Administator",phone:"support@evoting.com",gender:"female",email:"admin@voting.com",password,isAdmin:true})
    } catch (error) {
        throw new Error(error.message)
    }
}


module.exports = async ()=>{
    try {
        console.log("Connecting to database...");
        await db.sequelize.authenticate();
        console.log("DB Connection established successfully,synchronizing Database...");
        await db.sequelize.sync(
            {force:true}
            );
        await createAdmin();
        console.log("Database synchronized successfully");
    } catch (error) {
        throw new Error(error);
    }

}