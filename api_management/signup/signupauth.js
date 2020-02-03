const mongoose = require('mongoose')
const Joi = require('joi');

// connection 
mongoose.connect('mongodb://localhost/management', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('connected') })
    .catch(err => { console.log('rejected', err) })


const Member = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        maxlength: 50,
        unique:true
    },

    contact: {
        type: Number,
        maxlength: 15,

    },
    password: {
        type: String,
        maxlength: 300,

    },
    googleid: { type: String },
    roles: {
        type: [{
            type: String,
            enum: ['user', 'admin']
        }],
        default: ['user']
    },
})

Allmember = mongoose.model('newusers', Member);


function validateUser(user) {

    schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().required().email(),
        contact: Joi.number().min(10).required(),
        password: Joi.string().min(8).required()

    }

    return Joi.validate(user, schema)
}

exports.Allmember = Allmember;
exports.validate = validateUser;

