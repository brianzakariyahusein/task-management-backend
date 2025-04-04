const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
require("dotenv").config();

// REGISTER
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password harus minimal 6 karakter!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Registrasi berhasil!" });
  } catch (error) {
    console.error("Error saat registrasi:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server!" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User tidak ditemukan..." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "password salah!" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login Berhasil!", token });
  } catch (error) {
    console.error("Error saat login:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server!" });
  }
};

// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email tidak ditemukan!" });
    }

    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:5000/api/auth/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      html: `<p>Klik link berikut untuk reset password: <a href="${resetLink}">${resetLink}</a></p>`,
    });

    res
      .status(200)
      .json({ message: "Link reset password telah dikirim ke email!" });
  } catch (error) {
    console.error("Error saat forgot password:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server!" });
  }
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Cek apakah token diberikan
    if (!token) {
      return res.status(400).json({ message: "Token tidak boleh kosong!" });
    }

    // Verifikasi token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(400).json({ message: "Token tidak valid atau sudah kadaluarsa!" });
    }

    // Cek panjang password minimal 6 karakter
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password harus minimal 6 karakter!" });
    }

    // Cari user berdasarkan ID di token
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    // Hash password baru sebelum menyimpan
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Simpan password baru
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password berhasil direset, silakan login dengan password baru!" });
  } catch (error) {
    console.error("Error saat reset password:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server!" });
  }
};