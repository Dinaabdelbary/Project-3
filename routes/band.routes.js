const router = require('express').Router();
const Band = require('../models/Band.model')


//create band
router.post('/create', (req, res) => {  
  const {name, location, imageUrl, genres, members} = req.body;
  Band.create({name, location, imageUrl, genres, members})
  .then(newBand => {
    res.json(newBand)
  }).catch(error => res.json(error));
});

//get a band
router.get('/:id', (req, res) => {
    const {id} = req.params;
    Band.findById(id)
    .then(band => {
        res.json(band)
    }).catch(error => res.json(error))
})

//update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {name, location, imageUrl, genres, members} = req.body;
    Band.findByIdAndUpdate(id, {name, location, imageUrl, genres, members })
    .then(() => {
      res.json('The band profile has been updated.')
    }).catch(error => res.json(error))
  });

//delete
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    Band.findByIdAndRemove(id, { name })
    .then(() => {
      res.json('The band profile has been deleted.')
    }).catch(error => res.json(error))
  });

module.exports = router