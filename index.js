import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Array to savev blog posts
const posts = [];

// Routes
app.get('/', (req, res) => {
  console.log(posts); // Add this line for debugging
  res.render('../index.ejs', { posts });
});


app.get("/createpost",(req,res)=>{
    res.render("E:/Web Development Projects/CAPSTONE PROJECTS/Blog_Application/views/partials/blogcreate.ejs");
});

app.post('/post',(req,res)=>{
    const {postTitle,createPost} = req.body;

    const postId = Date.now().toString();

    const newPost = {
      id:postId,
      title: postTitle,
      content: createPost,
    }

    posts.push(newPost);

    res.redirect('/');
});

app.get('/post/:postId',(req,res)=>{
  const postId =req.params.postId;
  // Find the post with the specified id
  const post = posts.find(p => p.id === postId);

  if (post) {
    // Render the post detail page with the selected post
    res.render('postDetail', { post });
  } else {
    // If post not found, redirect to the home page
    res.redirect('/');
  }

})

app.delete('/deletepost/:id', (req, res) => {
  const postId = req.params.id;

  // Find the index of the post with the given id
  const postIndex = posts.findIndex(post => post.id == postId);

  if (postIndex !== -1) {
    // Remove the post from the array
    posts.splice(postIndex, 1);
    res.sendStatus(200);
  } else {
    res.status(404).send("Post not found");
  }
});


app.post('/editpost/:id', (req, res) => {
  const postId = req.params.id;
  const updatedTitle = req.body.updatedTitle;
  const updatedContent = req.body.updatedContent;

  // Find the index of the post with the given id
  const postIndex = posts.findIndex(post => post.id == postId);

  if (postIndex !== -1) {
    // Update the title and content of the post
    posts[postIndex].title = updatedTitle;
    posts[postIndex].content = updatedContent;
    res.redirect(`/post/${postId}`);
  } else {
    res.status(404).send("Post not found");
  }
});

app.get("/aboutme",(req,res)=>{
  res.render('aboutMe.ejs');
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


