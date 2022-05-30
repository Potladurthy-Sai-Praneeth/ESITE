const Products = require("../../Models/standup");
const jwt = require("jsonwebtoken");
const categories = [
    "mobiles",
    "laptops",
    "televisions",
    "microwave",
    "audio",
    "refrigerators",
    "washing machines",
    "air conditioners",
];
const util = require("util");
const Users = require("../../Models/users");
async function validateJWT(header) {
    let decoded = await util.promisify(jwt.verify)(
        header,
        "my@SecretKey-with-characters$"
    );
    let userCheck = await Users.findOne({ _id: decoded.id }, (err, standup) => {
        if (standup.passwordChangedAt) {
            if (decoded.iat < standup.passwordChangedAt) {
                return standup;
            }
        }
    });

    return userCheck;
}
module.exports = function(router) {
    router.get("/products", function(req, res) {
        Products.find({}, (err, standup) => {
            if (err) res.json({ success: false, message: err });
            else {
                if (!standup)
                    res.json({ success: false, message: "No Products Found" });
                else res.json({ success: true, standup: standup });
            }
        });
    });

    router.get("/products/:asked", function(req, res) {
        if (categories.includes(req.params.asked)) {
            index = categories.indexOf(req.params.asked);

            Products.find({ category: categories[index] }, (err, standup) => {
                if (err) res.json({ success: false, message: err });
                else {
                    if (!standup)
                        res.json({ success: false, message: "No Products Found" });
                    else res.json({ success: true, standup: standup });
                }
            });
        } else {
            Products.find({ prodname: { $regex: String(req.params.asked), $options: "$i" } },
                (err, standup) => {
                    if (err) res.json({ success: false, message: err });
                    else {
                        if (!standup)
                            res.json({ success: false, message: "No Products Found" });
                        else res.json({ success: true, standup: standup });
                    }
                }
            );
        }
    });

    router.get("/product/:id", function(req, res) {
        Products.findOne({ _id: req.params.id }, (err, standup) => {
            if (err) res.json({ success: false, message: err });
            else {
                if (!standup)
                    res.json({ success: false, message: "No Products Found" });
                else res.json({ success: true, standup: standup });
            }
        });
    });

    router.post("/products", async function(req, res) {
        // if (req.cookies) {

        if (req.headers.cookie) {
            let userStandup = await validateJWT(req.headers.cookie.substring(10));
            if (userStandup === null || userStandup === undefined) {
                res.clearCookie("jwt_Token");
                res.json({
                    success: false,
                    message: "Can't access. Please Login Again, Your Session is expired",
                });
            } else {
                let note = new Products(req.body);
                note.save(function(err, note) {
                    if (err) return res.status(400).json(err);

                    return res.status(200).json(note);
                });
            }
        } else {
            res.clearCookie("jwt_Token");
            res.json({
                success: false,
                message: "Can't access. Please Login Again, Your Session is expired",
            });
        }
    });

    router.put("/updateProducts/:id", async function(req, res) {
        // if (req.cookies) {

        if (!req.params.id) {
            res.json({ success: false, message: "No id is given" });
        } else {
            if (req.headers.cookie) {
                let userStandup = await validateJWT(req.headers.cookie.substring(10));
                if (userStandup === null || userStandup === undefined) {
                    res.clearCookie("jwt_Token");
                    res.json({
                        success: false,
                        message: "Can't access. Please Login Again, Your Session is expired",
                    });
                } else {
                    Products.updateOne({ _id: req.params.id }, {
                            $set: {
                                id: req.body.id,
                                prodname: req.body.prodname,
                                price: req.body.price,
                                content: req.body.content,
                                image: req.body.imag,
                                popularity: req.body.popularity,
                                category: req.body.category,
                            },
                        },
                        (err, standup) => {
                            if (err)
                                res.json({ success: false, message: "Not a Valid Product " });
                            else {
                                res.json({
                                    success: true,
                                    message: "Product Details Updated ",
                                });
                            }
                        }
                    );
                }
            } else {
                res.clearCookie("jwt_Token");
                res.json({
                    success: false,
                    message: "Can't access. Please Login Again, Your Session is expired",
                });
            }
        }
    });
    router.delete("/deleteProduct/:id", async function(req, res) {
        // if (req.cookies) {

        if (!req.params.id) {
            res.json({ success: false, message: "No id is given" });
        } else {
            if (req.headers.cookie) {
                let userStandup = await validateJWT(req.headers.cookie.substring(10));
                if (userStandup === null || userStandup === undefined) {
                    res.clearCookie("jwt_Token");
                    res.json({
                        success: false,
                        message: "Can't access. Please Login Again, Your Session is expired",
                    });
                } else {
                    Products.deleteOne({ _id: req.params.id }, (err, standup) => {
                        if (err) res.json({ success: false, message: "InValid Id " });
                        else res.json({ success: true, message: "Product Deleted " });
                    });
                }
            } else {
                res.clearCookie("jwt_Token");
                res.json({
                    success: false,
                    message: "Can't access. Please Login Again, Your Session is expired",
                });
            }
        }
    });
};