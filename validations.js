//Middleware for specific routes
const validateURL = (req, res, next) => {
    if(
        req.body.url.substring(0, 7) === "http://" ||
        req.body.url.substring(0, 8) === "https://"
        //we can also use regularExpressions>>> with the .match():
        //req.body.url.match(/https?:\/\//);
    ) {
        return next();
    } else {
        res
            .status(400)
            .send(`Oops, you forgot to start your url with http:// or https://`);
    }
};

//Export
module.exports = { validateURL };

/* note: we are exporting validateURL using object literal notation with {} because we are exporting a function as properties of an object.

By using curly braces around validateURL ({ validateURL }), you are explicitly specifying that you want to export it as a named property of the object being exported. This allows you to import it using the corresponding property name when importing it into another module.

 when importing the validateURL function in another module, you would use the following syntax:

        const { validateURL } = require('./path-to-file');

*/