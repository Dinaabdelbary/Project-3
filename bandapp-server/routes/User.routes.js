const router = require("express").Router();
const User = require('../models/User')


// ===================================//Post /api/user ==== CREATE A USER  =============================

// router.post('/user/signup', (req, res) => {  
//   const { name, email, password, instruments } = req.body; // The required fields
//   User.create({name, email, password, instruments})
//   .then(newUser => {
//     res.json(newUser)
//   }).catch(error => res.json(error));

// });

//================================//Get /api/user/ === GET ALL USERS =======================================

router.get('/user/list', (req, res) => {
  console.log('user list working')  
  User.find()
  .then(allUsers => {
    res.json(allUsers)
  }).catch(error => res.json(error));

});

//================================//Get /api/user/:id === GET A SPECIFIC USER =======================================

router.get('/user/:id', (req, res) => {
  console.log('user ID')
  const { id } = req.params;
  User.findById(id)
  .then(user => {
    res.json(user)
  }).catch(error => res.json(error))
})

//================================//Get /api/user === SPECIFIC SEARCH =======================================???


//================================//Get /api/user/:id === UPDATE USER =======================================

router.put('/user/:id', (req, res) => {
  const { id } = req.params;
  const {name, email, password, instruments, location, image, listento, genre, history } = req.body;
  User.findByIdAndUpdate(id, {name, email, password, instruments, location, image, listento, genre, history })
  .then(() => {
    res.json('Your profile has been updated.')
  }).catch(error => res.json(error))
});

//================================//Get /api/user/:id === DELETE USER =======================================

router.delete('/user/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  User.findByIdAndRemove(id, { name })
  .then(() => {
    res.json('Your profile has been deleted.')
  }).catch(error => res.json(error))
});

module.exports = router;

