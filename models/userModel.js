const users = [];
module.exports = class User {
  constructor(name) {
    this.name = name;
  }

  save() {
    users.push(this);
  }
};

/* Mongoose */
const mongoose = require('mongoose');

const userSchemeList = {
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20,
  },
};

const { Schema } = mongoose;
const userScheme = new Schema(userSchemeList);
const url = 'mongodb://localhost:27017/tetra_database';
const params = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(url, params, (err, res) => {
  if (err) throw err(err);
  else {
    console.log('Database online');
  }
});

module.exports = mongoose.model('User', userScheme);
