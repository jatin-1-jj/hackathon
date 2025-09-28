const { userNameValidation } = require("../schema/signupSchema");
const Alumni = require("../models/Alumni");
const Admin = require("../models/Admin");
const Faculty = require("../models/Faculty");
const {z} = require('zod')

const usernameQuerySchema = z.object({
  username: userNameValidation,
});

const checkUniqueUsername=async(req,res)=> {
 
  try {
    const { username } = req.body;

    const result = usernameQuerySchema.safeParse({username:username});

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return res.status(200).json({
        success: false,
        message:
          usernameErrors.length > 0
            ? usernameErrors.join(",")
            : "invalid query parameters",
      });
    }

        const existingVerifiedUser1 = await Admin.findOne({
          username,
          verified: true,
        });

        const existingVerifiedUser2 = await Alumni.findOne({
          username,
          verified: true,
        });

        const existingVerifiedUser3 = await Faculty.findOne({
          username,
          verified: true,
        });
      
    if (existingVerifiedUser1||existingVerifiedUser2||existingVerifiedUser3) {
      return res.status(200).json({
        success: false,
        message: "username already taken",
      });
    }
    return res.status(200).json({
      success: true,
      message: "username is unique",
    });
  } catch (error) {
    console.log(`error in checking username ${error}`);
    return res.status(500).json({
      success: false,
      message: "error checking username",
    });
  }
}

module.exports = {checkUniqueUsername}