const fs = require('fs');

const { txtToJson, stringToTxt } = require('../utils/fileConversion');
const { getDistance } = require('../utils/geolocation');

class UploadController {
  async getAttendes(req, res) {
    const txtFile = req.file.path;
    try {
      const outputFilename = `attendes_${Date.now()}`;
      const customerList = await txtToJson(txtFile);

      const attendeesList = customerList
        .filter(person => getDistance(person.latitude, person.longitude) <= 100)
        .sort((cur, next) => (cur.user_id < next.user_id ? -1 : 1));

      if (attendeesList.length > 0) {
        const listContent = attendeesList
          .map(entry => `${entry.user_id} - ${entry.name}\n`)
          .join('');

        await stringToTxt(outputFilename, listContent);
      }

      fs.unlinkSync(txtFile);

      res
        .status(200)
        .json({
          attendees: attendeesList,
          fileUrl: attendeesList.length > 0 ? `${outputFilename}.txt` : null
        })
        .send();
    } catch (err) {
      fs.unlinkSync(txtFile);
      res.status(400).json(err);
    }
  }
}

module.exports = new UploadController();
