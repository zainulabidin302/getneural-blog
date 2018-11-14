const express = require('express');
const getCollection = require('./../mongoHelper').getCollection;
const ObjectID = require('mongodb').ObjectID;

const router = express.Router();

/* GET users listing. */
router.get('/:id', (req, res) => {
  getCollection('article', (err, col) => {
    if (err) return res.json(400, err);
    let id = -1;
    try {
      id = new ObjectID(req.param('id', -1));
    } catch (error) {
      return res.json(400, { error: '"Id is invalid"' });
    }
    col.findOne({ _id: id }, (err, docs) => {
      if (err) return res.json(400, err);
      return res.json(docs);
    });
  });
});

router.get('/', (req, res) => {
  getCollection('article', (err, col) => {
    if (err) return res.json(400, err);
    col.find({}).toArray((err, docs) => {
      if (err) return res.json(400, err);
      return res.json(docs);
    });
  });
});

router.post('/', (req, res) => {
  getCollection('article', (err, col) => {
    if (err) return res.json(400, err);
    col.insert({
      title: req.body.title,
      content: req.body.content,
      publishedAt: Date.now(),
    }, (err, result) => {
      if (err) return res.json(400, err);
      return res.json(result);
    });
  });
});

router.put('/', (req, res) => {
  getCollection('article', (err, col) => {
    if (err) return res.json(400, err);
    let id = -1;
    try {
      id = new ObjectID(req.body.id);
    } catch (error) {
      return res.json(400, { error: '"Id is invalid"' });
    }

    col.update({
      _id: id,
    }, {
      title: req.body.title,
      content: req.body.content,
      publishedAt: Date.now(),
    }, (err, result) => {
      if (err) return res.json(400, err);
      return res.json(result);
    });
  });
});

module.exports = router;
