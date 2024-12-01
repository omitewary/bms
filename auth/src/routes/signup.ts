import express from 'express';
const router = express.Router();

router.get('/api/users/signup', (req, res) => {
    res.send("Hi there sign up!")
});

export {router as signupRouter}