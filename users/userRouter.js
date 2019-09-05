const express = require('express');

const router = express.Router();

router.use(express.json());

// data base 
const db = require('./userDb.js');

router.post('/', validateUser, (req, res) => {
    const newUser = req.body;

    db.insert(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the post to the database", 
                error: err
            })
        })
});


// help
router.post('/:id/posts', validatePost, (req, res) => {
    const newPost = req.body;

    db.insert(newPost)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the comment to the database", 
                error: err 
            })
        })
});

router.get('/', (req, res) => {

    db.get()
        .then(users => {
            res.status(201).json(users);
        })
        .catch(err => {
            res.status(500).json({ 
                message: "The users information could not be retrieved.",
                error: err
            })
        })
});

router.get('/:id', validateUserId, (req, res) => {
    const { id } = req.params; 

    db.getById(id) 
        .then(user => {
            res.status(200).json(user)
        }) 
        .catch(err => {
            res.status(500).json({ 
                message: "The user with this id could not be retrieved.",
                error: err
            })
        })
});

router.get('/:id/posts', validateUserId, (req, res) => {
    const { id } = req.params; 

    db.getUserPosts(id) 
        .then(posts => {
            res.status(200).json(posts)
        }) 
        .catch(err => {
            res.status(500).json({ 
                message: "The posts with this user id could not be retrieved.",
                error: err
            })
        })
});

router.delete('/:id', validateUserId, (req, res) => {
    const { id } = req.params; // OR const id = req.params.id;
    
    db.remove(id) 
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: "The user could not be removed",
                error: err
            })
        })
});

router.put('/:id', validateUserId, (req, res) => {
    const { id } = req.params; // OR const id = req.params.id;
    const newUser = req.body 

    db.update(id, newUser)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: "The user information could not be modified.",
                error: err
            })
        })
});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params; 

    if (id) {   
        req.user_id = req.params.user_id;
    } else {
        res.status(400).json({
            message: "Invalid post Id.",
        })
    }

    next(); 
};

function validateUser(req, res, next) {
    const newUser = req.body; 

    if (newUser && newUser.name) {
        req.user = req.body; 
    } else if (newUser) {
        res.status(400).json({ 
            error: "Missing required name field.",
        })
    } else {
        res.status(400).json({ 
            error: "Missing user data.",
        })
    }

    next()
};

function validatePost(req, res, next) {
    const post = req.body; 

    if (post && post.text) {
        req.user = req.body; 
    } else if (post) {
        res.status(400).json({ 
            error: "Missing required text field.",
        })
    } else {
        res.status(400).json({ 
            error: "Missing post data.",
        })
    }

    next()
};

module.exports = router;
