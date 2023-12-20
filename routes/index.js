const {Router} = require("express");
const { loginAdmin, loginUser, profile } = require("../controllers/auth");
const {auth} = require("../middleware");
const { getUsers, deleteUser, createUser } = require("../controllers/user");
const { createElection, updateElection, getElections, deleteElection } = require("../controllers/election");
const { vote, getAllCandidateVote } = require("../controllers/vote");

const router = Router();


// AUTHENTICATION

router.post("/admin/login",loginAdmin);
router.post("/login",loginUser);
router.get("/get-current-user",auth,profile)

// USERS
router.get("/users/get-all",auth,getUsers);
router.delete("/user/delete/:userId",auth,deleteUser);
router.post("/user/create",auth,createUser);

// ELECTION
router.post("/election/create",auth,createElection);
router.put("/election/:electionId",auth,updateElection);
router.get("/election/get-all",auth,getElections);
router.delete("/election/delete",auth,deleteElection);

// VOTE
router.post("/vote",auth,vote);
router.get("/votes/candidate",auth,getAllCandidateVote)



module.exports = router;
