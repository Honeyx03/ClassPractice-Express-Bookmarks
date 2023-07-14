//Dependencies
const express = require("express");
const bookmarks = express.Router();
const bookmarksArray = require("../models/bookmark.js");
const { validateURL } = require("../models/validations.js");

//Configuration
bookmarks.get("/", (req, res) => {
    res.json(bookmarksArray);
});
//we are using res.json instead of res.send because we are sending json instead of a simple string. 
//the res.json() is a method in Express that converts an array of objects into JSON format when sent to the client. The res.json() method automatically converts JavaScript objects or arrays into JSON format and ends the request.

//CREATE (HTTP verb POST)
//adding a route that will take data from the request body and push it onto the bookmarksArray
bookmarks.post("/", validateURL, (req, res) => {
    bookmarksArray.push(req.body);
    res.json(bookmarksArray[bookmarksArray.length - 1]);
  });

//Show (HTTP verb GET) Route that will return a book mark at an index in the bookmarksArray 
//w/o error handling:
/*
bookmarks.get("/:arrayIndex", (req.res) => {
    const { arrayIndex } = req.params;
    res.json(bookmarksArray[arrayIndex]);
})
*/

//with error handling:
bookmarks.get("/:arrayIndex", (req, res) => {
    if (bookmarksArray[req.params.arrayIndex]) {
        res.json(bookmarksArray[req.params.arrayIndex]);
    } else {
        res.status(404).json({ error: "Not Found" });
    }
});


//now we have to go back to app.js to connect our controllers for bookmarks.

//DELETE (HTTP verb DELETE) with error handling
bookmarks.delete("/:indexArray", (req, res) => {
    if (bookmarksArray[req.params.indexArray]) {
        const deletedBookmark = bookmarksArray.splice(req.params.indexArray, 1);
        res.status(200).json(deletedBookmark);
    } else {
        res.status(404).json({ error: "Not found" });
    }
});

//UPDATE/change already existing data (HTTP verb PUT) with error handling
bookmarks.put("/:arrayIndex", validateURL, async (req, res) => {
    if (bookmarksArray[req.params.arrayIndex]){
        bookmarksArray[req.params.arrayIndex] = req.body; //add the incoming data to the body
        res.status(200).json(bookmarksArray[req.params.arrayIndex]);
    } else {
        res.status(404).json({ error: "Not found" })
    }
});

//Export
module.exports = bookmarks;

/*
Important notes:
GET can only pass data through the URL (request header)

The goal is to allow users to add datat via an HTML form. HTML form data comes through in the "body" of a request.

we will use a new verb, PST, that will allow us to pass data through the response body

Since we are working with an array stored in memory, we will push our new data onto the array. The problem is every time we restart the server; our changes will disappear. Later, we'll learn about persisting our data with a database.
*/