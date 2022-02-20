## Overview
I worked in a group with [aromiafolabi](https://github.com/aromiafolabi), [sallyali7](https://github.com/sallyali7) and [astounded2006](https://github.com/astounded2006) to complete this project as part of the General Assembly Software Engineering Immersive course. The course was split into four modules, and this was our submission for module three. During module three, we learnt about Node, Express and Mongo. This was my first exposure to server-side software and databases. The finished project was deployed with Netlify (front end) and Heroku (back end), and can be found [here](https://ketokitchen-proj-three-sei.netlify.app/). This is the back end repository. The front end can be found [here](https://github.com/tigeryant/sei-project-three-fe).

<p align="center">
  <img src="https://i.imgur.com/uAXHDqI.png" width="700">
  </p>

## Brief
Our task was to build a full stack web application using the MERN stack (Mongo, Express, React and Node).

## Timeframe
We were given one week to complete this project.

## Technologies used
* Express.js
* Node.js
* React.js
* Mongo
* Mongoose
* JavaScript
* Sass
* Bootstrap
* Bcrypt
* JSON Web Tokens
* Axios
* Cloudinary
* Git
* GitHub

## Approach
We decided to build a keto recipe website which we gave the name ‘KetoKitchen’.

## Planning
On the first day, we spent our time brainstorming ideas for our app. Ultimately we agreed to design and build KetoKitchen. We decided on a few key features for our minimum viable product (MVP), and then set out some ’stretch goals’ - features that we could work on upon completion of the MVP. We decided that the MVP should include the following pages and functionality: a landing page, an index page - for displaying the recipes, searching and filtering, a show page for each recipe - to display information specific to that recipe, login and registration (authentication), a profile page - to display user data and footer pages - such as an ‘About’ page. Our stretch goals were a favourites feature and a comments feature. One of my team members used Excalidraw to produce the home page wireframe and I drew one for the Index page.

<p align="center">
  <img src="https://i.imgur.com/wuLX6Cn.png" width="500">
  <img src="https://i.imgur.com/TTwzGKS.png" width="500">
  </p>

We held daily stand ups throughout the week to discuss what each of us were working on and any upcoming tasks that needed to be completed.

## Work split
For the first few days, we all worked together on the most fundamental parts of the application so that we had a basic skeleton for the app. An example of this was each writing JSON data in the seeds file to populate the database. After a few days, once this was built, we branched off and took a more modular approach, with each of us working on a separate component or task. My main role at this point was to work on user authentication and, following this, the favourites feature. This involved both front and back end development.

## Build
### User Authentication
The feature I initially worked to implement was user authentication. This involved development on both the front and back end. I wrote the code for the `Register.js` and `Login.js` files. Each of these allows the user to fill in a form which is then submitted via an API call to the back end. Here are some snippets showing the ‘submit’ functions:

```javascript
const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await loginUser(formData)
      setId(res.data._id)
      setToken(res.data.token)
      setIsAuth(true)
      history.push('/recipes')
    } catch (err) {
      setIsError(true)
    }
  }
```
```javascript
const handleSubmit = async e => {
    e.preventDefault()
    try {
      await registerUser(formData)
      history.push('/login')
    } catch (err) {
      setFormErrors(err.response.data.errors)
    }
  }
```

In order to allow the users to have a display photo, I used a third party image hosting service called Cloudinary. The `handleImageUpload` function can be seen here:

```javascript
const handleImageUpload = async (e) => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
    setIsUploadingImage(true)
    const res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data)
    setFormData({ ...formData, profileImage: res.data.url })
    setIsUploadingImage(false)
}
```

On the back end I set up routing for login and registration, and wrote the following controllers to handle authentication requests. JSON web tokens were used for the authentication process.

```javascript
async function registerUser(req, res, next) {
  try {
    const createdUser = await User.create(req.body)
    return res.status(201).json({
      message: `Welcome ${createdUser.username}`,
    })
  } catch (err) {
    next(err)
  }
}
 
async function loginUser(req, res, next) {
  try {
    const userToLogin = await User.findOne({ email: req.body.email })
    if (!userToLogin || !userToLogin.validatePassword(req.body.password)) {
      throw new Unauthorized()
    }
    const token = jwt.sign({ sub: userToLogin._id }, secret, { expiresIn: '7 days' })
    return res.status(202).json({
      message: `Welcome Back ${userToLogin.username}`,
      token,
      _id: userToLogin._id,
      userInfo: userToLogin,
    })
  } catch (err) {
    next(err)
  }
}
```

### Favourites feature - front end and back end
After successfully implementing user authentication, I moved on to implementing the favourites feature. This also involved both front and back end development, but my primary focus was on the back end. The favourites feature allows users to ‘favourite’ a particular recipe from the show page - the recipe is then added to their ‘favourites’ list. This process uses Mongoose to query and update the database. When the user views their profile page, the favourites are displayed. Here is the controller I built to handle the request that toggles the recipe. The schema also had to be updated to implement this feature.

```javascript
async function toggleFavourite(req, res, next) {
  const { recipeId } = req.params
  const { currentUser, currentUserId } = req
  try {
    const recipeToFavourite = await Recipe.findById(recipeId).populate('favouritedBy')
    if (!recipeToFavourite) {
      throw new NotFound()
    }
    if (recipeToFavourite.favouritedBy.find(user => currentUserId.equals(user._id))) {
      recipeToFavourite.favouritedBy.remove(currentUserId)
    } else {
      recipeToFavourite.favouritedBy.push(currentUser)
    }
    await recipeToFavourite.save()
    return res.status(201).json(recipeToFavourite)
  } catch (err) {
    next(err)
  }
}
```

If the user has not yet favourited the recipe, their id is added to the `favouritedBy` list on the recipe document. If the user has already favourited the recipe, their id is removed. This conditional enables the ‘toggle’ function, meaning a single controller can be used for both adding and removing favourites.
 
Another important part of the favourites feature I built was the `getFavourites` controller. When the user visits their profile page, an API call is made which retrieves data about all the recipes they have favourited.

```javascript
async function getFavourites(req, res, next) {
  try {
    const { userId } = req.params
    const user = await User.findById(userId).populate('favouriteRecipes')
    const favouriteRecipes = user.favouriteRecipes
    return res.status(200).json(favouriteRecipes)
  } catch (err) {
    next(err)
  }
}
```
On the front end, in the `Profile.js` component, I used the React useEffect hook to make an API call to retrieve the data.

```javascript
React,useEffect(() => {
    const getData = async () => {
      try { 
        const id = getId()
        const res = await getFavourites(id)
        console.log('successful response')
        console.log('res.data: ', res.data)
        setFavourites(res.data)
      } catch (err) {
        console.log('getting favourites info error')
      }
    }
    getData()
  }, [])
```

## Known bugs
One bug we are aware of is to do with the favourites feature. One of my group members realised that if the user favourites a recipe on the show page, then moves to another page, and then returns to the show page, the favourites button will still display its ‘unfavourited’ state. This is due to a problem with the default state of the ‘isFavourited’ variable.

## Challenges
One of the biggest challenges we had was version control. While we had all used Git before, this was the first time we had used it extensively to collaborate and manage five versions of the codebase simultaneously. At times we struggled with merge conflicts and divergent branches. I realised that my own knowledge of Git was not sufficient for the collaborative nature of the project. Due to this, I decided to learn more about Git in my own time. In particular, I tried to develop my understanding of how branches diverge and converge, how stashing works, the relationship between the working tree, the staging tree and the current branch, how changes can be undone to return to a previous state, rebasing vs merging and how conflicts can be resolved. This paid off, as later in the week I was able to help other group members with resolving conflicts and managing branches.

## Key learnings
Of all the projects at GA, this one taught me the most. In terms of soft skills, I learnt a lot about collaboration in a development team and I got to practise working to a deadline. In terms of tech skills, I learnt a great deal about Git, which I mentioned above, React, and perhaps most intimately, Express. This was the first time I really got to grips with how schemas, routing, middleware and databases work. I spent a lot of time building schemas and middleware, learning about API calls and reading documentation. This experience was truly invaluable and serves as a good reminder of the benefits of active over passive learning.
