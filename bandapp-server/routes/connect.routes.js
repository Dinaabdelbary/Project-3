const User = require('../models/User.model');
const router = require('express').Router();

router.get('/:id', (req, res) => {
  const otherUserId = req.params.id;
  const currentUserId = req.session.passport.user;

  User.findOneAndUpdate(
    { _id: currentUserId },
    { $push: { pendingSentRequests: otherUserId } },
    { new: true }
  )
    .then((updatedUser) => {
      req.session.currentUser = updatedUser;

      return User.findOneAndUpdate(
        { _id: otherUserId },
        { $push: { pendingReceivedRequests: currentUserId } },
        { new: true }
      );
    })
    .then((update) => {
      //   res.redirect(`/profile/${otherUserId}`);
      res.json(update);
    })
    .catch((err) => console.log(err));
});

router.get('/accept/:id', (req, res) => {
  const otherUserId = req.params.id;
  const currentUserId = req.session.passport.user;

  User.findOneAndUpdate(
    { _id: currentUserId },
    {
      $push: { friendList: otherUserId },
      $pull: { pendingSentRequests: otherUserId },
    },
    { new: true }
  )
    .then((updatedSelf) => {
      req.session.currentUser = updatedSelf;
      return User.findOneAndUpdate(
        { _id: otherUserId },
        {
          $push: { friendList: currentUserId },
          $pull: { pendingReceivedRequests: currentUserId },
        },
        { new: true }
      ).then((update) => {
        res.redirect(`/profile/${updatedSelf._id}`);
      });
    })
    .catch((err) => console.log(err));
});

router.get('/decline/:id', (req, res) => {
  const otherUserId = req.params.id;
  const currentUserId = req.session.passport.user;

  User.findOneAndUpdate(
    { _id: currentUserId },
    { $pull: { pendingSentRequests: otherUserId } },
    { new: true }
  ).then((updatedSelf) => {
    req.session.currentUser = updatedSelf;
    return User.findOneAndUpdate(
      { _id: otherUserId },
      {
        $pull: { pendingReceivedRequests: currentUserId },
      },
      { new: true }
    )
      .then((update) => {
        console.log(update);
        res.redirect(`/profile/${updatedSelf._id}`);
      })
      .catch((err) => console.log(err));
  });
});

module.exports = router;
