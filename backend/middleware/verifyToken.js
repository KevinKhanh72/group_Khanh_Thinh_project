const jwt = require("jsonwebtoken");

module.exports = (req, res, next) =>  {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ msg: "Không có token, truy cập bị từ chối!" });

  try {
    // Nếu token dạng "Bearer eyJ..."
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Lưu thông tin user
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token không hợp lệ!" });
  }
};
