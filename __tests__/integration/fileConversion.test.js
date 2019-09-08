const path = require('path');
const { txtToJson } = require('../../src/app/utils/fileConversion');

const testFilesPath = `${__dirname}/test_files`;

describe('file', () => {
  it('should return an object from a .txt file', async () => {
    const file = path.join(testFilesPath, 'customers.txt');
    const response = await txtToJson(file);
    expect(typeof response).toBe('object');
  });

  it('should return an empty array from a .txt empty file', async () => {
    const file = path.join(testFilesPath, 'empty.txt');
    const response = await txtToJson(file);
    expect(response.length).toBe(0);
  });

  it("should reject the promise if it's not a txt file", async () => {
    expect.assertions(1);
    const file = path.join(testFilesPath, 'cat.jpg');
    await expect(txtToJson(file)).rejects.toEqual({
      error: 'Invalid file format'
    });
  });

  it("should reject the promise even if the file has txt extension but it's not a txt/plain file", async () => {
    expect.assertions(1);
    const file = path.join(testFilesPath, 'cat.txt');
    await expect(txtToJson(file)).rejects.toEqual({
      error: 'The file is invalid or is corrupted'
    });
  });
});
