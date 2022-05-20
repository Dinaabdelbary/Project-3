const User = require('../models/User.model');
const router = require('express').Router();

router.post('/accept/:id', (req, res) => {
  const otherUserId = req.params.id;
  const { currentUserId } = req.body;


  User.findOneAndUpdate(
    { _id: currentUserId },
    {
      $push: { friendList: otherUserId },
      $pull: { pendingReceivedRequests: otherUserId },
    },
    { new: true }
  )
    .then((updatedSelf) => {
      req.session.currentUser = updatedSelf;
      return User.findOneAndUpdate(
        { _id: otherUserId },
        {
          $push: { friendList: currentUserId },
          $pull: { pendingSentRequests: currentUserId },
        },
        { new: true }
      ).then((update) => {
        console.log('accepted friend request in db:', update);
        res.json(update);
      });
    })
    .catch((err) => console.log(err));
});


// CHANGED
router.post('/decline/:id', (req, res) => {
  const otherUserId = req.params.id;

  const { currentUserId } = req.body;



  User.findOneAndUpdate(
    { _id: currentUserId },
    { $pull: { pendingReceivedRequests: otherUserId } },
    { new: true }
  ).then((updatedSelf) => {
    req.session.currentUser = updatedSelf;
    return User.findOneAndUpdate(
      { _id: otherUserId },
      {
        $pull: { pendingSentRequests: currentUserId },
      },
      { new: true }
    )
      .then((update) => {
        console.log('declined friend request in db:', update);
        res.redirect('/');
        res.json(update);
      })
      .catch((err) => console.log(err));
  });
});

//send friend request
// router.get('/:id', (req, res) => {
//   const otherUserId = req.params.id;
//   const currentUserId = req.session.passport.user;

//   User.findOneAndUpdate(
//     { _id: currentUserId },
//     { $push: { pendingSentRequests: otherUserId } },
//     { new: true }
//   )
//     .then((updatedUser) => {
//       req.session.currentUser = updatedUser;

//       return User.findOneAndUpdate(
//         { _id: otherUserId },
//         { $push: { pendingReceivedRequests: currentUserId } },
//         { new: true }
//       );
//     })
//     .then((update) => {
//       res.json(update);
//       res.redirect(`/${otherUserId}`);
//     })
//     .catch((err) => console.log(err));
// });

 // CHANGED
router.post('/:id', (req, res) => {
  const otherUserId = req.params.id;
  const { currentUserId } = req.body;

  User.findOneAndUpdate(
    { _id: currentUserId },
    { $push: { pendingSentRequests: otherUserId } },
    { new: true }
  )
    .populate('pendingSentRequests')
    .then((updatedUser) => {
      req.session.currentUser = updatedUser;
      User.findOneAndUpdate(
        { _id: otherUserId },
        { $push: { pendingReceivedRequests: currentUserId } },
        { new: true }
      )
        .populate('pendingReceivedRequests')
        .then(() => console.log('updated added user'))
        .catch((error) => console.log(error, 'error when updating added user'));
      res.json(updatedUser);
    })
    .catch((err) =>
      console.log(err, 'error when updating request sender user')
    );
});

//unfollow CHANGED
router.post('/unfollow/:id', (req, res) => {
  const otherUserId = req.params.id;
  const { currentUserId } = req.body;

  User.findOneAndUpdate(
    { _id: currentUserId },
    { $pull: { friendList: otherUserId } },
    { new: true }
  )
    .then((update) => {
      res.json(update);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
