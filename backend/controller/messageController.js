const Message = require("../models/Message");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Get all messages
const getMessages = async (req, res) => {
  try {
    const {id:user} = req.params;
        const myId = User.id;

    const messages = await Message.find({
         $or:[
                {senderId:myId,receiverId:user},
                {senderId:user,receiverId:myId}
            ]
        });
     
    //   .populate("user", "name email role") // pull user info
    //   .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {   
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

 
const sendMessage = async (req, res) => {
  try {
      const {id:receiverId}= req.params;
        const authHead=req.headers['authorization'];
        const token = authHead && authHead.split(' ')[1];
        const load = jwt.verify(token,process.env.JWT_SECRET);
        const userId=load.userId
    console.log("user sending",userId);
    
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Message text is required" });

    
    const sender = await User.findById(req.user.id);
    if (!sender) return res.status(404).json({ error: "User not found" });

    const message = new Message({
     senderId:myId,
            receiverId,
            text,
            image:imageUrl
    });

    await message.save();
    await message.populate("user", "name email role");  

    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getMessages, sendMessage };