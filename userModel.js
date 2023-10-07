const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter your title.'],
    },
    firstName: {
      type: String,
      required: [true, 'Please enter your first name.'],
    },
    surname: {
      type: String,
      required: [true, 'Please enter your surname.'],
    },
    mobile: {
      type: String,
      required: [true, 'Please enter your mobile number.'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email address.'],
    },
    homeAddress: {
      addressLine1: {
        type: String,
        required: [true, 'Please enter your home address.'],
      },
      addressLine2: {
        type: String,
      },
      town: {
        type: String,
        required: [true, 'Please enter your town.'],
      },
      county: {
        type: String,
        required: [true, 'Please enter your county/city.'],
      },
      eircode: {
        type: String,
        required: [true, 'Please enter your EIRCODE.'],
      },
    },
    shippingAddress: {
      addressLine1: {
        type: String,
        required: [true, 'Please enter your shipping address.'],
      },
      addressLine2: {
        type: String,
      },
      town: {
        type: String,
        required: [true, 'Please enter your town.'],
      },
      county: {
        type: String,
        required: [true, 'Please enter your county/city.'],
      },
      eircode: {
        type: String,
        required: [true, 'Please enter your EIRCODE.'],
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
