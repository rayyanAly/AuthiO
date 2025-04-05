import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';


/**
 * @desc		Auth User
 * @route		POST /api/users/login
 * @access	public
 */
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401); // Unauthorized;
		throw new Error('Invalid email or password');
	}
});

/**
 * @desc		Get user profile
 * @route		GET /api/users/profile
 * @access	private
 */
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

/**
 * @desc		Register new user
 * @route		POST /api/users/
 * @access	public
 */
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400); // Bad request
		throw new Error('User already exists');
	}

	const user = await User.create({ name, email, password });

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

/**
 * @desc		Update user profile
 * @route		PUT /api/users/profile
 * @access	private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

/**
 * @desc		Get all users
 * @route		GET /api/users
 * @access	private/admin
 */
const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({}).select('-password');
	res.json(users);
});

/**
 * @desc		Delete a user
 * @route		DELETE /api/users/:id
 * @access	private/admin
 */
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		await User.deleteOne(user);
		res.json({ message: 'User deleted' });
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

/**
 * @desc		Get user by ID
 * @route		GET /api/users/:id
 * @access	private/admin
 */
const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password');

	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

/**
 * @desc		Update a user
 * @route		PUT /api/users/:id
 * @access	private/admin
 */
const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isAdmin = req.body.isAdmin;

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

/**
 * @desc    Forgot Password
 * @route   POST /api/users/forgot-password
 * @access  Public
 */
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    // Email transport using SendGrid SMTP
    const transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 465,
        secure: true,
        auth: {
            user: 'apikey', 
            pass: process.env.SENDGRID_API_KEY, 
        },
    });

    // Email content http://localhost:3000 / https://authio-5yv3.onrender.com/  //
	
    const resetUrl = `https://authio-5yv3.onrender.com/reset-password/${resetToken}`; 
    const mailOptions = {
        from: process.env.EMAIL_FROM, 
        to: user.email,
        subject: 'Password Reset Request',
        html: `<p>You requested a password reset. Click the link below:</p>
               <a href="${resetUrl}" target="_blank">${resetUrl}</a>
               <p>This link will expire in 1 hour.</p>`,
    };

    // Send email
    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Password reset link sent to email' });
    } catch (error) {
        console.error(error);
        res.status(500);
        throw new Error('Email could not be sent');
    }
});

 /**
 * @desc    Reset password
 * @route   POST /api/users/reset-password/:token
 * @access  public
 */
const resetPassword = asyncHandler(async (req, res) => {
	const resetToken = req.params.token; 
	const { password } = req.body; 
  
	// Find the user by the reset password token and check if the token is expired
	const user = await User.findOne({
	  resetPasswordToken: resetToken,
	  resetPasswordExpires: { $gt: Date.now() },
	});
  
	if (!user) {
	  res.status(400);
	  throw new Error('Invalid or expired token');
	}
  
	// Reset the password
	user.password = password; 
	user.resetPasswordToken = undefined; 
	user.resetPasswordExpire = undefined; 
  
	// Save the updated user data
	await user.save();
  
	res.json({ message: 'Password has been reset successfully' });
  });  

/**
 * @desc    Send OTP for Email Verification
 * @route   POST /api/users/send-otp
 * @access  Private
 */
const sendVerificationOtp = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}

	if (user.isVerified) {
		res.status(400);
		throw new Error('User is already verified');
	}

	// Generate 6-digit OTP
	const otp = Math.floor(100000 + Math.random() * 900000).toString();
	user.otp = otp;
	user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins
	await user.save();

	// Email config
	const transporter = nodemailer.createTransport({
		host: 'smtp.sendgrid.net',
		port: 465,
		secure: true,
		auth: {
			user: 'apikey',
			pass: process.env.SENDGRID_API_KEY,
		},
	});

	const mailOptions = {
		from: process.env.EMAIL_FROM,
		to: user.email,
		subject: 'Your Verification OTP',
		html: `<p>Hello ${user.name},</p>
		       <p>Your OTP is: <strong>${otp}</strong></p>
		       <p>This OTP will expire in 10 minutes.</p>`,
	};

	try {
		await transporter.sendMail(mailOptions);
		res.json({ message: 'OTP sent to your email address' });
	} catch (error) {
		console.error(error);
		res.status(500);
		throw new Error('Failed to send OTP');
	}
});

/**
 * @desc    Verify OTP
 * @route   POST /api/users/verify-otp
 * @access  Private
 */
const verifyOtp = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const { otp } = req.body;

	const user = await User.findById(userId);

	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}

	if (!user.otp || !user.otpExpires || user.otpExpires < Date.now()) {
		res.status(400);
		throw new Error('OTP is invalid or has expired');
	}

	if (user.otp !== otp) {
		res.status(400);
		throw new Error('Incorrect OTP');
	}

	// Success: clear OTP and mark verified
	user.otp = undefined;
	user.otpExpires = undefined;
	user.isVerified = true;
	await user.save();

	res.json({ message: 'Account verified successfully' });
});

export {
	authUser,
	deleteUser,
	getUserById,
	getUserProfile,
	getUsers,
	registerUser,
	updateUser,
	updateUserProfile,
	forgotPassword,
	resetPassword,
	sendVerificationOtp,
	verifyOtp,
};
