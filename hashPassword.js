const bcrypt = require('bcryptjs');

const generateHash = async () => {
  const password = 'Flordia2803$';
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log('Hashed Password:', hashedPassword);
};

generateHash();
