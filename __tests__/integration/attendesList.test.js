const request = require('supertest');
const app = require('../../src/app');
const fs = require('fs');
const rimraf = require('rimraf');

const testFilesPath = `${__dirname}/test_files`;

describe('Attendes List', () => {
  it("should return error if there's no files selected", async () => {
    const response = await request(app)
      .post('/results')
      .send();

    expect(response.status).toBe(400);
    expect(response.error).not.toBeUndefined();
  });

  it('should return error if the attached file is invalid', async () => {
    const response = await request(app)
      .post('/results')
      .attach('list', `${testFilesPath}/cat.txt`);
    expect(response.status).toBe(400);
    expect(response.error).not.toBeUndefined();
  });

  it('should create a new file and return success if a valid file is attached', async () => {
    const response = await request(app)
      .post('/results')
      .attach('list', `${testFilesPath}/customers.txt`);

    fs.existsSync(`../../downloads/${response.body.fileUrl}`, exist => {
      expect(exist).toBe(true);
    });

    expect(response.status).toBe(200);
  });

  it('should return a json with the data if a valid file is attached', async () => {
    const response = await request(app)
      .post('/results')
      .attach('list', `${testFilesPath}/customers.txt`);

    expect(response.body.attendees.length).toBeGreaterThan(0);
  });

  it("should return an empty array if there's no attendees", async () => {
    const response = await request(app)
      .post('/results')
      .attach('list', `${testFilesPath}/noAttendes.txt`);

    expect(response.body.attendees.length).toBe(0);
  });
});
