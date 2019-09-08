const path = require('path');
const { txtToJson, stringToTxt } = require('../utils/fileConversion');
const { getDistance } = require('../utils/geolocation');

class UploadController {
  async getAttendes(req, res) {
    try {
      const txtFile = req.file.path;
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

      res.render('list', {
        attendees: attendeesList,
        fileUrl: attendeesList.length > 0 ? `${outputFilename}.txt` : null
      });
    } catch (err) {
      res.render('list', err);
    }
  }
}

module.exports = new UploadController();
