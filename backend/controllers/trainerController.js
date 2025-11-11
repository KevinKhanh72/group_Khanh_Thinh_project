const User = require('../models/User');

exports.getAllTrainers = async (req, res) => 
{
  try {
    const { specialty, city, district, gender } = req.query;

    // Tạo điều kiện lọc linh hoạt
    const filter = { role: 'trainer' }; 
    if (specialty) filter.specialty = specialty;
    if (city) filter.city = city;
    if (district) filter.district = district;
    if (gender) filter.gender = gender;

    const trainers = await User.find(filter).select('-password');
    res.status(200).json(trainers);
  } catch (error)  {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách huấn luyện viên', error });
  }
};
