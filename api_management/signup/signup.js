const { Allmember, validate } = require('./signupauth');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// user register api
router.post('/register', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.send({ data: { body: { status: 400, message: error.details[0].message } } });

    const checkUser = await Allmember.findOne({ email: req.body.email });
    if (checkUser) return res.send({ data: { body: { status: 400, message: 'user already registered' } } });

    var genSalt = await bcrypt.genSalt(10);
    var password_hash = await bcrypt.hash(req.body.password, genSalt);

    const user = new Allmember({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        password: password_hash
    });

    const result = await user.save();

    res.send({ data: { body: { status: 200, message: "success" } } });
    res.end();

});

module.exports = router;


