const { clumsybirdSays } = require(".");

test("clumsybird knows what to say", () => {
  expect(clumsybirdSays("woooahhh!")).toBe("(o.o) woooahhh!");
});

test("clumsybird is not sure what to say", () => {
  expect(clumsybirdSays()).toBe("(o.o) chookity?");
});