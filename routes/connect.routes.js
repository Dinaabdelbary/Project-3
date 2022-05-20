const User = require('../models/User.model');
const router = require('express').Router();

router.get('/accept/:id', (req, res) => {
  const otherUserId = req.params.id;
  const currentUserId = req.session.passport.user;

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

router.get('/decline/:id', (req, res) => {
  const otherUserId = req.params.id;
  console.log('req.params.id: ', otherUserId);
  const currentUserId = req.session.passport.user;
  console.log('req.session.passport.user: ', currentUserId);

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

router.get('/:id', (req, res) => {
  const otherUserId = req.params.id;
  const currentUserId = req.session.passport.user;

  User.findOneAndUpdate(
    { _id: currentUserId },
    { $push: { pendingSentRequests: otherUserId } },
    { new: true }
  ).populate('pendingSentRequests')
    .then((updatedUser) => {
      req.session.currentUser = updatedUser;
      User.findOneAndUpdate(
        { _id: otherUserId },
        { $push: { pendingReceivedRequests: currentUserId } },
        { new: true }
      ).populate('pendingReceivedRequests')
        .then(() => console.log('updated added user'))
        .catch((error) =>
          console.error(error, 'error when updating added user')
        );
      res.json(updatedUser);
    })
    .catch((err) =>
      console.log(err, error, 'error when updating request sender user')
    );
});

//unfollow
router.get('/unfollow/:id', (req, res) => {
  const otherUserId = req.params.id;
  const currentUserId = req.session.passport.user;

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
