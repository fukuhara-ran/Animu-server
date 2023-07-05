const jwt = require("jsonwebtoken");

//verify token from cookies
const verifyToken = (req, res, next) => {
  const { animuAuthenticatedUser } = req.cookies;

  //console.log("Cookies: ", req.cookies);
  // console.log(`Ini kue: ${animuAuthenticatedUser}`);

  //Kalo tokennya ga ada
  if (!animuAuthenticatedUser) {
    const error = new Error("Token not found");
    error.code = 401;
    error.status = "Unauthorized";

    const response = {
      code: error.code,
      status: error.status,
      message: error.message,
    };
    // console.log(error);

    return res.status(response.code).json(response);
  }

  //Kalo tokennya ada
  try {
    const decoded = jwt.verify(animuAuthenticatedUser, process.env.JWT_SECRET);
    req.userId = decoded.payload.userId;
    // console.log("test", req.userId);
    next();
  } catch (error) {
    error.code = 401;
    error.status = "Unauthorized";

    const response = {
      code: error.code,
      status: error.status,
      message: error.message,
    };

    return res.status(response.code).json(response);
  }
};

module.exports = { verifyToken };