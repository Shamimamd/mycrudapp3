// const users = require("../models/model");
const users = require("../models/model");
const moment = require("moment");
// register user
exports.userpost = async (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  const file = req.file.filename;
  const { fname, lname, email, mobile, gender, location, status } = req.body;
  try {
    const preuser = await users.findOne({ email: email });

    if (preuser) {
      res.status(401).json("This user already exist in our databse");
    } else {
      const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

      const userData = new users({
        fname,
        lname,
        email,
        mobile,
        gender,
        location,
        status,
        profile: file,
        datecreated,
      });
      await userData.save();
      res.status(200).json(userData);
    }
  } catch (error) {
    res.status(401).json(error);
    console.log("catch block error");
  }
};

// GET ALL USER DATA
exports.userget = async (req, res) => {
  // const search = req.query.search || "";
  // const gender = req.query.gender || "";
  // const status = req.query.status || "";
  // const sort = req.query.sort || "";
  // const page = req.query.page || 1;
  // const ITEM_PER_PAGE = 4;

  // const query = {
  //   fname: { $regex: search, $options: "i" },
  // };

  // if (gender !== "All") {
  //   query.gender = gender;
  // }

  // if (status !== "All") {
  //   query.status = status;
  // }

  try {
    const usersdata = await users.find();
    res.status(200).json(usersdata);
    // const skip = (page - 1) * ITEM_PER_PAGE; // 1 * 4 = 4
    // const count = await users.countDocuments(query);
    // const usersdata = await users
    //   .find(query)
    //   .sort({ datecreated: sort == "new" ? -1 : 1 })
    //   .limit(ITEM_PER_PAGE)
    //   .skip(skip);
    // const pageCount = Math.ceil(count / ITEM_PER_PAGE); // 8 /4 = 2
    // res.status(200).json({
    //   Pagination: {
    //     count,
    //     pageCount,
    //   },
    //   usersdata,
    // });
  } catch (error) {
    res.status(401).json(error);
  }
};

// GET SINGLE USER DATA
exports.singleuserget = async (req, res) => {
  const { id } = req.params;

  try {
    const userdata = await users.findOne({ _id: id });
    res.status(200).json(userdata);
  } catch (error) {
    res.status(401).json(error);
  }
};

// user edit
exports.useredit = async (req, res) => {
  const { id } = req.params;
  const {
    fname,
    lname,
    email,
    mobile,
    gender,
    location,
    status,
    user_profile,
  } = req.body;
  const file = req.file ? req.file.filename : user_profile;

  const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

  try {
    const updateuser = await users.findByIdAndUpdate(
      { _id: id },
      {
        fname,
        lname,
        email,
        mobile,
        gender,
        location,
        status,
        profile: file,
        dateUpdated,
      },
      {
        new: true,
      }
    );

    await updateuser.save();
    res.status(200).json(updateuser);
  } catch (error) {
    res.status(401).json(error);
  }
};
