const min = 1;
const max = 10000000;

function randomID(context, events, done) {
  const id = Math.floor(Math.random() * (max - min + 1)) + min;
  context.vars.id = id;
  return done();
}

module.exports = {
  randomID,
}
