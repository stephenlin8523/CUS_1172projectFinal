const express = require('express');
const router = express.Router();

// Placeholder for video data
let videos = [
    { id: 1, title: "World Cup Highlights", url: "http://example.com/video1" },
    { id: 2, title: "Best Goals of the Tournament", url: "http://example.com/video2" }
];

// Route to display the form for adding a new video
router.get('/new', (req, res) => {
    res.render('new_video');
});
// Route to display dashboard
router.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        res.redirect('/auth/login'); // Redirect to login if user is not logged in
    } else {
        res.render('dashboard', { videos: videos });
    }
});

// Route to handle the submission of the form
router.post('/new', (req, res) => {
    const { title, url } = req.body;
    if (!title || !url) {
        res.render('new_video', { error: "All fields are required." });
        return;
    }
    const newVideo = {
        id: videos.length + 1, // simple increment for ID
        title: title,
        url: url
    };
    videos.push(newVideo); // Add new video to the array
    res.redirect('/video/dashboard');
});

module.exports = router;
