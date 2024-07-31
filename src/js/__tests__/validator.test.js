import { validatorLocation } from "../validators";

test.each([
  [" ", false],
  ["24.485860", false],
  ["", false],
  ["etsgis,54.356490", false],
  ["[24.485860, 54.356490]", true],
  ["[24.485860,54.356490]", true],
  ["24.485860, 54.356490", true],
  ["24.485860,54.356490", true],
])("проверка на корректный ввод локации", (number, expected) => {
  expect(validatorLocation(number)).toBe(expected);
});
