module.exports = function isIn(req, res, next) {
  const keys = Object.keys(req.body);
  let err = false;
  for (i = 0; i < keys.length; i++) {
    console.log('daid', keys[i] in req.body)
    if (keys[i] in req.body === false) {
      err = true;
      return;
    }
  }
  if (err) return res.status(400).send("bad request");
  next();
};
