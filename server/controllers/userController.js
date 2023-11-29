const userInfo = require("../model/userModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendEmail = async (recieverEmail, url) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "angelpriyapapakipari9192@gmail.com",
        pass: "ancs esuy omoj xknn",
      },
    });
    const details = {
      from: "angelpriyapapakipari9192@gmail.com",
      to: `${recieverEmail}`,
      subject: "Email varification link.",
      text: `${url}`,
    };
    await transporter.sendMail(details);
    console.log("email sent successfully");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password, customer, companyName } = req.body;
    const usernameCheck = await userInfo.findOne({ username: username });
    // console.log("usernamechecked "+usernameCheck);
    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }
    const emailCheck = await userInfo.findOne({ email: email });
    // console.log("email checked "+emailCheck);
    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const token = crypto.randomBytes(32).toString("hex");
    // console.log("hashed password "+hashedPassword);
    const user = new userInfo({
      username: username,
      email: email,
      password: hashedPassword,
      customer: customer,
      companyName: companyName,
      verificationToken: token,
    });
    const userRegistration = await user.save();
    if (userRegistration) {
      // console.log(result);
      res.json({ msg: "User registration successful", status: true });
      const isUserValid = await userInfo.findOne({ username: username });
      const url = `http://localhost:3000/verify/${isUserValid._id}/${token}`;
      const verificationResult = await sendEmail(email, url);
    }
    if (userRegistration === false) {
      return res.json({ msg: "User registration failed", status: false });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const isUserValid = await userInfo.findOne({ username: username });
    if (!isUserValid) {
      return res.json({
        msg: "Username or password is incorrect.",
        status: false,
      });
    }
    const isPasswordValid = bcrypt.compareSync(password, isUserValid.password);
    if (!isPasswordValid) {
      return res.json({
        msg: "Username or password is incorrect.",
        status: false,
      });
    }
    if (isUserValid && isPasswordValid) {
      const isUserVerified = isUserValid.verified;
      if (isUserVerified === true) {
        const activeStatus = await userInfo.findByIdAndUpdate(isUserValid._id, {
          active: true,
        });
        if (activeStatus) {
          isUserValid.password = "";
          return res.json({ status: true, isUserValid });
        }
      } else {
        res.json({
          msg: "User email is not verified.",
          status: false,
        });
        const url = `http://localhost:3000/verify/${isUserValid._id}/${isUserValid.verificationToken}`;
        const verificationResult = await sendEmail(isUserValid.email, url);
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports.emailVerification = async (req, res, next) => {
  try {
    const user = await userInfo
      .findOne({ _id: req.params.id })
      .maxTimeMS(60000);
      console.log(user);
    if (user) {
      userToken = user.verificationToken;
      if (req.params.token === userToken) {
        await userInfo.findByIdAndUpdate(req.params.id, { verified: true });
        await userInfo.findByIdAndUpdate(req.params.id, {
          verificationToken: "",
        });
        return res.json({ status: true });
      }
    } else {
      return res.json({ status: false, error: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  const userId = req.params.id;
  console.log(userId);
  const avatarImage = req.body.image;
  console.log(avatarImage);
  try {
    const userData = await userInfo.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage: avatarImage,
    });
    if (userData) {
      return res.json({
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getEmployees = async (req, res, next) => {
  try {
    const { currentUser } = req.body;
    //   console.log(currentUser);
    if (currentUser.customer === true) {
      const allEmployees = await userInfo
        .find({
          $or: [{ companyName: currentUser.company }],
          _id: { $ne: req.params.id },
          //   $or: [{ active: true }],
        })
        .select(["email", "username", "avatarImage", "_id", "active"]);
      // console.log("customer");
      return res.json(allEmployees);
    } else {
      const allEmployees = await userInfo
        .find({
          $or: [{ customer: true }],
          _id: { $ne: req.params.id },
          //   $or: [{ active: true }],
        })
        .select(["email", "username", "avatarImage", "_id", "active"]);
      // console.log("employee");
      return res.json(allEmployees);
    }
  } catch (error) {
    next(error);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    const activeStatus = await userInfo.findByIdAndUpdate(req.params.id, {
      active: false,
    });
    console.log(activeStatus);
    return res.json({ status: true });
  } catch (error) {
    next(error);
  }
};
