//register logic
const users=require('../Models/userModel')
const  bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
exports.registerController=async(req,res)=>{
    console.log('Inside registration logic');
    
    const {username,email,password}=req.body
    //check email is in db
    const existingUser=await users.findOne({email})
    if(existingUser){
        res.status(409).json("user already exist!.. Please Login")
    }
    else{
        // the modelkey names and the frontend giving is alsoe same name so only make it one value other vise{username:username}
        const encryptedPassword=await bcrypt.hash(password,10)
        const newUser=await users.create({username,email,password:encryptedPassword})
        res.status(200).json(newUser)
    }

    
}

//login logic
exports.loginController=async(req,res)=>{
    const {email,password}=req.body
    const existingUser=await users.findOne({email})
    if(existingUser){
       const isPwdMatch =await bcrypt.compare(password,existingUser.password)
       if(isPwdMatch){
        const token=jwt.sign({userEmail:email,role:existingUser.role},process.env.JWTSECRET)
        res.status(200).json({user:existingUser,token})
         
       }else{
        res.status(409).json("Invalid Password")
       }
    }else{
        res.status(409).json("Invalid Email...Please Register")
    }
}

// google login logic
exports.googleLoginController=async(req,res)=>{
    console.log("inside google login controller");
    const {username,email,password,picture}=req.body
    const existingUser=await users.findOne({email})
    if(existingUser){
        const token = jwt.sign({userEmail:existingUser.email,role:existingUser.role},process.env.JWTSECRET)
        res.status(200).json({user:existingUser,token})
    }else{
       const encryptedPassword=await bcrypt.hash(password,10) 
       const newUser=await users.create({username,email,password:encryptedPassword,picture})
       const token=jwt.sign({userEmail:newUser.email,role:newUser.role},process.env.JWTSECRET)
       res.status(200).json({user:newUser,token})
    }
}

//user profile update logic
exports.userEditController=async(req,res)=>{
    console.log("inside user edit");
    const {username, picture, password, bio}=req.body
    const {id}=req.params
    console.log(req.file);
    const updatedFile=req.file?req.file.filename:picture
    console.log(req.payload);
    if(password!==""){
        const encryptedPassword=await bcrypt.hash(password,10)
        const UpdatedUser=await users.findByIdAndUpdate({_id:id},{username,password:encryptedPassword,bio,picture:updatedFile},{new:true})
        res.status(200).json(UpdatedUser)

    }else{
        const UpdatedUser=await users.findByIdAndUpdate({_id:id},{username,bio,picture:updatedFile},{new:true})
        res.status(200).json(UpdatedUser)
    }


    res.status(200).json("Update request recieved")
    
    
}

//user listing in admin page
exports.getAllUserController=async(req,res)=>{
    console.log("inside getAllUserControlle");
    const userList = await users.find({role : 'user'})
    res.status(200).json(userList)
    
}

//admin profile update logic
exports.adminEditController=async(req,res)=>{
    console.log("inside admin edit");
    const {username, picture, password}=req.body
    const {id}=req.params
    console.log(req.file);
    const updatedFile=req.file?req.file.filename:picture
    console.log(req.payload);
    if(password!==""){
        const encryptedPassword=await bcrypt.hash(password,10)
        const UpdatedUser=await users.findByIdAndUpdate({_id:id},{username,password:encryptedPassword,picture:updatedFile},{new:true})
        res.status(200).json(UpdatedUser)

    }else{
        const UpdatedUser=await users.findByIdAndUpdate({_id:id},{username,picture:updatedFile},{new:true})
        res.status(200).json(UpdatedUser)
    }


    res.status(200).json("Update request recieved")
    
    
}