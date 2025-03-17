const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => { // <-- Tambahkan 'next' di parameter
  try {
    // Ambil token dari Authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Akses ditolak! Token tidak diberikan." });
    }

    // Pisahkan token dari "Bearer"
    const token = authHeader.split(" ")[1];

    // Verifikasi
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token tidak valid atau sudah kedaluwarsa!" });
      }

      // Simpan userId dari token ke req agar bisa digunakan di endpoint lain
      req.userId = decoded.userId;
      next(); // <-- Ini harus ada agar middleware lanjut ke handler berikutnya
    });
  } catch (error) {
    console.error("Error dalam verifikasi token:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server!" });
  }
};

module.exports = verifyToken;
