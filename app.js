//DEPENDENCIES
const express = require("express");
const cors = require("cors");

//CONFIGURATION
const app = express();
const bookmarksController = require("./controllers/bookmarksController.js");

//MIDDLEWARE
app.use(express.json()); //parse incoming JSON from POST via cURL (RestMETHOD)
app.use(cors()); // This will allow ANY app to make requests to your API. Since we are just building a sample app and not hosting it online, we don't have to worry about restricting it. Later, when your app is deployed in the cloud, you would want to be more thoughtful about how to properly allow/restrict access.

//this is not necessary in this application but if we wanted to run a fxn for every request we want to use the code below
/*app.use((req, res, next) => {
    console.log("This code runs for every request");
    next();
});
*/

//ROUTES
app.get("/", (req, res) => {
    res.send("Welcome to Bookmarks App");
});

app.use("/bookmarks", bookmarksController);
//we are using /bookmarks as the base route

//let's add a 404 route
app.get("*", (req,res) => {
    res.status(404).json({error: "Page not found"});
});
//the asterisk is to denote any page that does not have a route

//without the res.status(404) when we open up our Chrome Dev Tools and go to the Network tab we will get a status of the 304 or 200 but we want 4040 so we have to put status(404) which corresponds to "Page not found"

//EXPORT
module.exports = app;
