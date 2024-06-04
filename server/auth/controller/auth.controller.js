const AUTH_MODEL = require("../model/auth.model");
const {
  hashPassword,
  generateOtp,
  generateToken,
} = require("../../middleware/commonFunction");
const bcrypt = require("bcrypt");

var _auth = {};
//Signup user
(_auth.register = async function (req, res, next) {
  try {
    const data = req.body;

    let pwd = await hashPassword(data.password);
    data.password = pwd;
    let otp = await generateOtp();
    const isExist = await AUTH_MODEL.findOne({ email: data.email });
    if (!isExist) {
      const savedData = await AUTH_MODEL.create(data);
      res.send({
        code: 200,
        message: "Data Saved Successfully",
        savedData,
      });
    } else {
      res.send({
        code: 400,
        message: "Email already exists",
      });
    }
  } catch (error) {
    console.log("Error>>", error);
  }
}),
  (_auth.login = async (req, res, next) => {
    try {
      const data = req.body;
      if (data) {
        const user = await AUTH_MODEL.findOne({ email: data.email });
        if (!user) {
          return res.send({ status: 401, message: "Invalid credentials" });
        }
        const isPaswdValid = await bcrypt.compare(data.password, user.password);
        if (!isPaswdValid) {
          return res.send({ status: 401, message: "Invalid credentials" });
        } else {
          const token = await generateToken(user._id);

          return res.send({ status: 200, message: "Login succesfulll", token });
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  });

_auth.getUser = async (req, res, next) => {
  try {
    let pageNo = req.query.pageNo || 1;
    const getData = await AUTH_MODEL.aggregate([
      {
        $facet: {
          metadata: [{ $count: "total" }, { $addFields: { page: pageNo } }],
          data: [{ $skip: (pageNo - 1) * pageNo }, { $limit: 10 }],
        },
      },
    ]);
    if (getData) {
      res.send({
        status: 200,
        message: "Data found successfully",
        data: getData[0],
        metadata: getData[0]?.metadata[0],
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = _auth;
