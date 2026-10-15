import { prisma } from "../config/db.js"
import {generateToken} from "../utils/generateToken.js"
import bcrypt from "bcryptjs";
const register =async(req,res)=>{
                const {name,email,password} = req.body;

            // Check if User already exists
            
            const userExists = await prisma.user.findUnique({
                where :{email:email},
            })
                
            if(userExists){
                return res
                .status(400).
                json({error:"User Already Exists with this Email"})
            }

            // Hash Password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password,salt);

            // Create User
            const user = await prisma.user.create({
                    data:{
                            name,
                            email,
                            password:hashedPassword
                    }
            });

                //GENERATE JWT TOKEN
             const token = generateToken(user.id,res)

            res.status(201).json({
                    status:"SUCCESS",
                    data :{
                            user:{
                                    id:user.id,
                                    name:name,
                                    email:email
                            }, 
                            token,
                    }
            })

           }

            // LOGIN USER 
            const login = async(req,res)=>{
                const {email,password} = req.body;

                // Check if the User email exists in the table
                const user = await prisma.user.findUnique({
                    where:{email:email}
                })

                if(!user){
                    return res
                    .status(400)
                    .json({error:"Invalid Email or Password"})
                }

                // Verify Password
                const isPasswordValid = await bcrypt.compare(password,user.password);

                if(!isPasswordValid){
                        return res.status(401).json({error:"Invalid Email or Password"})
                }


                // GENERATE JWT TOKENS 
                    const token = generateToken(user.id,res)


                res.status(201).json({
                    status:"SUCCESS",
                    data :{
                            user:{
                                    id:user.id,
                                    email:email
                            },
                            token,
                    }
            })
            }

const logout = async(req,res)=>{
            res.cookie("jwt","",{
                httpOnly:true,
                expires:new Date(0),
            });

        res.status(200).json({
            status:"success",
            message:"Logged out successfully"
        })
}

export {register,login,logout}  