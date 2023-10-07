const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userModel');
const app = express();

app.use(express.json());

// CREATE - Create a new user
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// READ - a case where you can search for users based on their firstname surname or email allowing for a smoother searching
app.get('/users', async (req, res) => {
  try {
    const { firstname, surname, email } = req.query; //searching for or
    let query = {};
    if (firstname) {
      query.firstname = new RegExp(firstname, 'i'); //searching for the each
    }
    if (surname) {
      query.surname = new RegExp(surname, 'i');
    }
    if (email) {
      query.email = new RegExp(email, 'i');
    }
    const users = await User.find(query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ - Get a single user by id
app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: `Cannot find any user with ID ${id}` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE - Update a user by id
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    
    if (!user) //A function used for when no matching user is found should have a message
    {
      return res
        .status(404)
        .json({ message: `Cannot find any user with ID ${id}` });
    }
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE - Delete a user by id
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id); //function for excution
    if (!user) {
      return res
        .status(404)
        .json({ message: `Cannot find any user with ID ${id}` }); //Now that hes deleted
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose.set('strictQuery', false);
mongoose
  .connect
  (
    'mongodb+srv://tadhgmaher54:meatballs123@assignment5.sicuhoe.mongodb.net/Assignment5?retryWrites=true&w=majority' //mongodb server
  )
  .then(() => {
    console.log('Connected');
    app.listen(3000, () =>  //unused port shown in notes
    {
      console.log(`Port 3000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });


//Json and node.js approach towards creating the crud system for the users
//I ran into a few issues which is the reasoning for messy layout. issues include when searching for a user and name not existing, mongoDB password not matching
//lastly had to include error handling and input validations
//Sources include lecture notes, dear programmer on youtube, w2schools, github.