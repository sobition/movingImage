import getCurrentDate from '../utils/getCurrentDate';

test('return date format in dd.mm.yyyy', () => {
  expect(getCurrentDate()).toEqual(expect.stringMatching(/^([1-9]|[12][0-9]|3[01])[- /.]([1-9]|1[012])[- /.](19|20)\d\d$/));
});
