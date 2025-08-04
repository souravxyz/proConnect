import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendEmail from "../config/email.js";
import {
  getVerifyEmailTemplate,
  getWelcomeEmailTemplate,
  getPasswordResetEmail,
  getPasswordChangedNotification,
} from "../config/emailTemplates.js";

// ✅ Verify Email
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.id);
    if (!user) return res.redirect(`${process.env.CLIENT_URL}/verify-result?status=notfound`);

    if (user.isVerified) {
      return res.redirect(`${process.env.CLIENT_URL}/verify-result?status=already`);
    }

    user.isVerified = true;
    await user.save();

    // Send welcome email
    const { subject, html } = getWelcomeEmailTemplate(user.name);
    await sendEmail({ to: user.email, subject, html });

    // ✅ Redirect to result page
    res.redirect(`${process.env.CLIENT_URL}/verify-result?status=success`);
  } catch (error) {
    console.error(error);
    res.redirect(`${process.env.CLIENT_URL}/verify-result?status=failed`);
  }
};


// ✅ Register
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("📥 Incoming signup data:", { name, email, password }); // 👈 Step 1

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log("👤 New user created:", newUser); // 👈 Step 2

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    const verifyURL = `${process.env.BASE_URL}/api/auth/verify/${token}`;
    const { subject, html } = getVerifyEmailTemplate(newUser.name, verifyURL);

    console.log("📧 Preparing to send email to:", newUser.email); // 👈 Step 3
    await sendEmail({ to: newUser.email, subject, html });

    res
      .status(201)
      .json({ message: "Signup successful. Please verify your email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

// ✅ Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // ✅ Set cookie first
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax", // or "None" if frontend and backend are on different domains
      secure: false,   // true if HTTPS (production)
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // ✅ Then send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};


// ✅ Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10m",
    });

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
    const { subject, html } = getPasswordResetEmail(user.name, resetLink);

    await sendEmail({ to: user.email, subject, html });

    res.status(200).json({ message: "Reset link sent to email" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send reset link", error: error.message });
  }
};

// ✅ Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    await user.save();

    const { subject, html } = getPasswordChangedNotification(user.name);
    await sendEmail({ to: user.email, subject, html });

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid or expired token", error: error.message });
  }
};

// ✅ Change Password
export const changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { oldPassword, newPassword } = req.body;

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashedNew = await bcrypt.hash(newPassword, 10);
    user.password = hashedNew;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change Password Error:", error.message);
    res.status(500).json({ message: "Password change failed" });
  }
};


// ✅ Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token"); // Clear the cookie
    res.status(200).json({ message: "Logout successful" }); // Send a success response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Logout failed", error: error.message }); // Send an error response
  }
};