const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res) => {
    console.log('---- logged in user detail ---', req.user);
    res.status(200).json([
        {
            name: "Mobile",
            price: 30000
        },
        {
            name: "Television",
            price: 40000
        },
        {
            name: "Fridge",
            price: 30000
        },
        {
            name: "Washing Machine",
            price: 50000
        }
    ])
});

module.exports = router;