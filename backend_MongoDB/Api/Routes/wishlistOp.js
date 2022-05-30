const Wishlist = require("../../Models/wishlist");
const Users = require("../../Models/users");
const jwt = require("jsonwebtoken");
const { MongoClient, ObjectID } = require("mongodb");
const util = require("util");
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
    router.get("/wishlist/:id", async function(req, res) {
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
                    let wishlistID = userStandup.wishlist;
                    Wishlist.findOne({ _id: wishlistID }, (err, standup) => {
                        if (err) res.json({ success: false, message: "InValid Id " });
                        else {
                            if (!standup)
                                res.json({ success: false, message: "No Products Found" });
                            else res.json({ success: true, standup: standup.products });
                        }
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
    router.post("/addToWishlist/:id", async function(req, res) {
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
                    let wishlistID = userStandup.wishlist;
                    Wishlist.updateOne({ _id: wishlistID }, {
                            $push: {
                                products: {
                                    productId: req.body.productId,
                                },
                            },
                        },

                        (err, standup) => {
                            if (err) res.json({ success: false, message: "InValid Id " });
                            else if (standup) {
                                res.json({
                                    success: true,
                                    message: "wishlist Item Quantity Added ",
                                });
                            } else {
                                res.json({
                                    success: false,
                                    message: "No Products Found",
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

    router.delete(
        "/deleteWishlist/:userId/:productId",
        async function(req, res) {
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
                        let wishlistID = userStandup.wishlist;
                        Wishlist.updateOne({ _id: wishlistID }, {
                                $pull: {
                                    products: { productId: req.params.productId },
                                },
                            }, { multi: "true" },
                            (err, standup) => {
                                if (err) res.json({ success: false, message: "InValid Id " });
                                else {
                                    res.json({ success: true, message: "Product Deleted " });
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
        }
    );

    router.delete("/deleteTotalWishlist/:id", async function(req, res) {
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
                    let wishlistID = userStandup.wishlist;
                    Wishlist.updateOne({ _id: wishlistID }, {
                            $set: {
                                products: [{
                                    productId: ObjectID("0000000088ff740dc8a7831b"),
                                }, ],
                            },
                        },
                        (err, standup) => {
                            if (err) res.json({ success: false, message: "InValid Id " });
                            else {
                                res.json({
                                    success: true,
                                    message: "wishlist Deleted ",
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
};