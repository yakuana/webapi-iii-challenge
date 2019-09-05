const express = 'express';

const router = express.Router();

router.get('/', (req, res) => {
    db.get() 
    .then(posts => {
        res.status(201).json(posts);
    })
    .catch(err => {
        res.status(500).json({ 
            message: "The posts information could not be retrieved.", 
            error: err
        })
    })
});

router.get('/:id', validatePostId, (req, res) => {
    const { id } = req.params; 

    db.getById(id) 
        .then(post => {
            res.status(200).json(post)
        }) 
        .catch(err => {
            res.status(500).json({ 
                message: "The post with this id could not be retrieved.",
                error: err
            })
        })
});

router.delete('/:id', validatePostId, (req, res) => {
    const { id } = req.params; // OR const id = req.params.id;
    
    db.remove(id) 
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

router.put('/:id', validatePostId, (req, res) => {
    const { id } = req.params; // OR const id = req.params.id;
    const editPost = req.body;

    if (editPost.title && editPost.contents) {
        db.update(id, editPost)
            .then(post => {
                res.status(200).json(post)
            })
            .catch(err => {
                res.status(500).json({
                    message: "The post information could not be modified.",
                    error: err
                })
            })
    } else {
        res.status(400).json({
            error: "Please provide text for the comment."
        })
    }

});

// custom middleware

function validatePostId(req, res, next) {
    const { id } = req.params; 

    if (id) {   
        req.id = req.params.id
    } else {
        res.status(400).json({
            message: "Invalid post Id.",
        })
    }

    next(); 
};




module.exports = router;