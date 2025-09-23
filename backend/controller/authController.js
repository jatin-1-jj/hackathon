const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../lib/utils');




const check =(req,res)=>{
   try{
      console.log('22222222222222222222222222')
      return res.status(200).json(req.user);
    }
    catch(error){
        console.log('error in check authController : ',error.message);
        res.status(500).json({message:"internal server error in check"});
    }
}


const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name , !email,  !password) return res.status(400).json({ error: 'Name, email and password required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role: role || 'candidate' });
    await user.save();

    const token = generateToken(user._id,res)
    res.status(201).json({ 
      token, 
      user: { 
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verified: user.verified
      },
      message: 'Registered successfully'
  });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


const login =  async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const user = await User.findOne({ email });
    console.log("yes it",user);
    
    if (!user) return res.status(404).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    console.log("yes",valid);
    
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken(user._id,res)
    res.status(200).json({ 
      token, 
      user: { 
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verified: user.verified
      }});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {check,register,login}