const z = require("zod");

const userAuthenticationSchema = z.object({
  username: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must have atleast 8 characters")
    .max(12, "Password must not have more than 12 characters"),
  phoneNumber: z
    .string()
    .length(10, "Phone number must have 10 digits"),
  countryCode: z.string(),
  bio: z.string().optional(),
  privacy: z.object({
    profileVisibility: z.boolean(),
    allowMessages: z.boolean(),
  }),
});

function isUserAuthenticated(req, res, next) {
  try {
    const {
      username,
      password,
      firstname,
      lastname,
      email,
      phoneNumber,
      countryCode,
      bio,
      privacy,
    } = req.body;
    const result = userAuthenticationSchema.safeParse({
      username,
      password,
      firstname,
      lastname,
      email,
      phoneNumber,
      countryCode,
      bio,
      privacy,
    });

    if(!result.success){
        return res.status(422).json({
            msg: result.error.errors
        });
    }
    console.log("user data is validated successfully");
    next();
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({
      msg: "User authentication failed.",
    });
  }
}

module.exports = isUserAuthenticated;
