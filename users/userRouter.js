const express = 'express';

const router = express.Router();

router.post('/', validateUser, (req, res) => {
    const newUser = req.body 
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {

});

router.get('/', validateUser, (req, res) => {
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
    const { user_id } = req.params; 

    db.getById(user_id) 
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
    const { user_id } = req.params; 

    db.getUserPosts(user_id) 
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
    const { user_id } = req.params; // OR const id = req.params.id;
    
    db.remove(user_id) 
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({
                message: "The post could not be removed",
                error: err
            })
        })
});

router.put('/:id', validateUserId, validatePost, (req, res) => {
    const { user_id } = req.params; // OR const id = req.params.id;
   
    db.insert()
});

//custom middleware

function validateUserId(req, res, next) {
    const { user_id } = req.params; 

    if (user_id) {   
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
