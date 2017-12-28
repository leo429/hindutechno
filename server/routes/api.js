const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/datacollector', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get nodes
router.get('/nodes', (req, res) => {
    connection((db) => {
        db.collection('nodes')
            .find()
            .toArray()
            .then((nodes) => {
                response.data = nodes;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
})

// Get products
router.get('/products', (req, res) => {
    connection((db) => {
        db.collection('products')
            .find()
            .toArray()
            .then((products) => {
                response.data = products;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});


router.delete('/products/:id', function(req, res) {
    connection((db) => {
        db.collection('products').deleteOne({ '_id' : new ObjectID(req.params.id) }, function(err) {
            if(err) { 
                res.status(500).send(err);
              } else {
               res.json({'_id' : req.params.id});
                console.log("Successfully deleted product.");
             }
        });
    });
});

router.post('/products', function(req, res, next) {
    var newProduct = req.body;
    if (!(req.body.name) || !(req.body.color)) {
        sendError(res, "Invalid user input", "Must provide a first or last name.", 400);
    }
    connection((db) => {
        db.collection('products').insertOne(newProduct, function(err) {
            if(err) { 
                console.log("err" + err);
                res.status(500).send(err, "Invalid details..");
              } else {
               res.json({});
                console.log("Successfully created new product.");
             }
        });
    });
});

router.get('/products/:id', function(req, res) {
   connection((db) => {
        db.collection('products').findOne({ '_id' : ObjectID(req.params.id) }, function(err, product) {
            if(err) { 
                res.status(500).send(err);
              } else {
               res.json(product);
             }
        });
    });
});

router.put('/products/:id', function(req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;

    connection((db) => {
         db.collection('products').updateOne({ '_id' : new ObjectID(req.params.id)}, updateDoc, function(err, product) {
             if(err) { 
                 res.status(500).send(err);
               } else {
                res.json(product);
              }
         });
     });
 });

module.exports = router;