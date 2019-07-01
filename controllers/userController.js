require("dotenv").config();

// const jwt = require("jsonwebtoken");
// const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Notice = require("../models/Notice");
const User = require("../models/User");

// const createUser = async (req, res) => {
//   try {
//     let user = await User.findOne({empId: req.body.empId, email: req.body.email});
//     if(user) {
//       res.status(200).json({message: "user exists"});
//     }

//   } catch(err) {
//     res.status(400).json({message: err.message});
//   }
// }

const loginUser = async (req, res) => {
  try {
    let user = await User.findOne({ empId: req.body.empId });
    if (!user)
      return res
        .status(200)
        .json({ message: "user not registered", user: null });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(200).json({ message: "invalid password", user: null });

    const token = user.generateAuthToken();
    res.header("x-auth-token", token);
    return res
      .status(200)
      .json({
        message: `login success and the token is: ${token}`,
        user: user
      });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "error while signing in", user: null });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "name",
      "empId",
      "email",
      "contactNo",
      "designation",
      "cabinLocation",
      "available",
      "additionalDetails"
    );
    return res.send(user);
  } catch (err) {
    return res.status(400).json({ message: "user can't be fetched!" });
  }
};

const editProfile = async (req, res) => {
	try{
		let user = await User.findById(req.user._id);
		if(!user) return res.status(200).json({ message: 'no user found!', user: null });

		req.user.name = req.body.name;
		req.user.category = req.body.category;
		req.user.empId = req.body.empId;
		req.user.email = req.body.email;
		req.user.contactNo = req.body.contactNo;
		req.user.designation = req.body.designation;
		req.user.cabinLocation = req.body.cabinLocation;
		req.user.available = req.body.available;
		req.user.additionalDetails = req.body.additionalDetails;

		return res.status(200).json({ message: 'profile updated successfully', user });
		
	}
	catch (err) {
		return res.status(400).json({ message: 'something went wrong', user: null });
		
	}
}

const changePassword = async (req, res) => {
	try{
		let user = await User.findById(req.user._id);
		if(!user) return res.status(200).json({ message: 'no user found!', user: null });

		const oldPassword = user.password;
		const salt = await bcrypt.genSalt(10);
		if(req.body.password.length < 5 || req.body.password.length > 255)
			return res.status(400).json({ message: 'password must be at least 5 characters', user });

		const newPassword = await bcrypt.hash(req.body.password, salt);
		if(oldPassword === newPassword)
			return res.status(400).json({ message: 'new password is same as old one.', user });
		user.password = newPassword;
		return res.status(200).json({ message: 'password updated successfully', user });
		
	}
	catch (err) {
		return res.status(400).json({ message: 'something went wrong', user: null });
		
	}
}

const changeStatus = async (req, res) => {
	try{
		let user = await User.findById(req.user._id);
		if(!user) return res.status(200).json({ message: 'no user found!', user: null });

		if(user.available === 'false')
			user.available = 'true';
		else
			user.available = 'false';

		await user.save();
		return res.status(200).json({ message: 'status changed successfully', user });
	}
	catch (err) {
		return res.status(400).json({ message: 'error changing the status', user });
		
	}
}

const postNotices = async (req, res) => {
	try{
		let user = await User.findById(req.user._id);
		if (!user) return res.status(200).json({ message: 'no user found', user: null });

		if(user.canPost === 'false') return res.status(200).json({ message: 'not eligible to post', user });

		let notice = new Notice({
			title: req.body.title,
			description: req.body.description,
			link: req.body.link,
			postedBy: req.body.postedBy,
			postedOn: req.body.postedOn
		});

		await notice.save();

		return res.status(200).json({ message: 'notice posted successfully', notice });

	}
	catch (err) {
		return res.status(400).json({ message: 'error while posting', notice: null });

	}
}

const createUser = async (req, res) => {
	const role = req.user.role;
	try {
		let admin = await User.findOne({ empId: req.user.empId, role: 'admin' });
		if(!admin) return res.status(400).json({ message: 'not authorised', user: null });

		let user = await User.findOne({ empId: req.body.empId });
		if(user) return res.status(200).json({ message: 'user already exist', user: null });

		let newUser = new User({
			name: req.body.name,
			category: req.body.category,
			empId: req.body.empId,
			password: req.body.password,
			role: req.body.role,
			email: req.body.email,
			contactNo: req.body.contactNo,
			designation: req.body.designation,
			cabinLocation: req.body.cabinLocation,
			canPost: req.body.canPost,
			available: req.body.available,
			additionalDetails: req.body.additionalDetails
		});

		const salt = await bcrypt.genSalt(10);
		newUser.password = await bcrypt.hash(newUser.password, salt);
		await newUser.save();
		return res.status(200).json({ message: 'user created successfully', newUser })

	}
	catch (err) {
		return res.status(400).json({ message: 'error while creating user', user: null })

	}
}

module.exports = { loginUser, getProfile, editProfile, changePassword, changeStatus, postNotices, createUser }
