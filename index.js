const express = require('express');
require('dotenv').config()
const path = require('path')
const app = express();
const { connectDb } = require('./config/dbConnect')
const userRoute = require('./routes/user')
const userCount = require('./routes/availableUser');
const Blog = require('./models/blog')
const cookieParser = require('cookie-parser');
const { checkForAuth } = require('./middleware/auth');
const blogRoute = require('./routes/blogroute')
const PORT = process.env.PORT;


app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.json());
app.use(cookieParser());

app.use(checkForAuth('token'));
app.use(express.static('public'));


app.get('/', async(req,res) => {
    const allBlog = await Blog.find({})
    res.render('home', {
        user: req.user,// Send user to the view
        blogs: allBlog
    });
})

// app.get('/', (req, res) => {
//     // console.log("User in session:", req.user);
//     // console.log(req.user);// Log user to see if it's being set
//     res.render('home', {
//         user: req.user,// Send user to the view
//     });
// });

app.use('/user', userRoute);
app.use('/blog', blogRoute);
// app.use('/info', userCount);

app.listen(PORT, () => {
    connectDb();
    console.log(`Server started at PORT: ${PORT}`);
});
