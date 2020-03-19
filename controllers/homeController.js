const User = require('../models/userModel');

module.exports.index = function (req, res) {
  res.render('index', { title: 'Try Post Data'});
};

const sendDataToController = async (data) => {
  try {
    const user = await new User(data);
    const succes = await user.save();
    const userName = succes.name;
    let ret = '';
    if (succes) {
      ret = ({ true: true, userName: userName });
    } else {
      ret = ({ true: false, userName: false });
    }
    return ret;
  } catch (error) {
    console.log(error);
  }
};

module.exports.sendDataToController = sendDataToController;
