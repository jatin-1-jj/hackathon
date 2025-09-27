const {z} = require('zod')

const signInSchema = z.object({
    identifer:z.string(),
    password:z.string()
})

module.exports={signInSchema}