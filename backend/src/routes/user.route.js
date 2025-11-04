import express from "express"
import { deleteUserById, getUserById, getUsers, loginUser, registerUser, updateUserById } from "../controllers/user.controller.js"
import { auth } from "../middleware/authMiddleware.js"


const router=express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser);
router.get("/", auth, getUsers);               
router.get("/:id", auth, getUserById);        
router.put("/:id", auth, updateUserById);     
router.delete("/:id", auth, deleteUserById); 



export default router