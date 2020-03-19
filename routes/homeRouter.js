const express = require('express');
const Ajv = require('ajv');

const homeRouter = express.Router();

const multer = require('multer');

const upload = multer({ dest: 'public/upload' });

const homeController = require('../controllers/homeController');

const ajv = Ajv({ allErrors: true });
const userSchema = require('../schemas/userSchema.json');

homeRouter.get('/', homeController.index);

async function validateData(data) {
  try {
    const valid = await ajv.validate(userSchema, data);
    let ok = '';
    if (valid) {
      ok = true;
    } else {
      ok = false;
    }
    const dataRes = ok;
    return dataRes;
  } catch (error) {
    return console.error(error);
  }
}
/* Post Data */
homeRouter.post('/postData', upload.none(), async (req, res) => {
  try {
    const postData = req.body.userName;
    const data = ({ name: postData });
    const resp = await validateData(data);
    if (!resp) {
      return res.json({ valid: false, status: resp });
    }
    const userName = await homeController.sendDataToController(data);
    return res.json({ valid: true, status: resp, userName: userName });
  } catch (error) {
    return res.json({ valid: false, status: error });
  }
});


module.exports = homeRouter;
