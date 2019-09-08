const path = require('path');
const { txtToJson, jsonToTxt } = require('../utils/fileConversion');
const { getDistance } = require('../utils/geolocation');

class UploadController {
  async getAttendes(req, res) {
    const txtFile = req.file.path;

    try {
      const customerList = await txtToJson(txtFile);

      const attendeesList = customerList
        .filter(att => getDistance(att.latitude, att.longitude) <= 100)
        .sort((cur, next) => (cur.user_id < next.user_id ? -1 : 1));

      const file = await jsonToTxt('attendes', attendeesList);

      res.status(200).json(attendeesList);
    } catch (err) {
      res.status(400).json(err);
    }
  }
}

module.exports = new UploadController();
