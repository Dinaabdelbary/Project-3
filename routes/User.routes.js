const router = require("express").Router();
const User = require('../models/User.model');
const fileUploader = require('../configs/cloudinary')


// ===================================//Post /api/user ==== CREATE A USER  =============================

// router.post('/user/signup', (req, res) => {  
//   const { name, email, password, instruments } = req.body; // The required fields
//   User.create({name, email, password, instruments})
//   .then(newUser => {
//     res.json(newUser)
//   }).catch(error => res.json(error));

// });

//================================//Get /api/user/ === GET ALL USERS =======================================

router.get('/list', (req, res) => {
  User.find()
  .then(allUsers => {
    res.json(allUsers)
  }).catch(error => res.json(error));

});

//================================//Get /api/user/:id === GET A SPECIFIC USER =======================================

router.get('/user/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id)
  .then(user => {
    res.json(user)
  }).catch(error => res.json(error))
})

//================================//Get /api/user === SPECIFIC SEARCH =======================================???


//================================//Get /api/user/:id === UPDATE USER =======================================

router.post('/profile/user/:id', (req, res) => {
  const { id } = req.params;
  console.log('req.body : ', req.body)
  const {name, email, password, instruments, location, genres, bio, profilePicture } = req.body;
  User.findByIdAndUpdate(id, {name, email, password, instruments, location, genres, bio, profilePicture})
  .then((updatedUser) => {
    res.json(updatedUser)
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


//================================// CLOUDINARY =======================================

router.post(
	'/fileUpload',
	fileUploader.single('profilePicture'),
	(req, res, next) => {
    console.log('req.file: ', req.file)
		if (!req.file) {
			next(new Error('No file uploaded!'));
			return;
		}
		res.json({ secure_url: req.file.path });
	}
);