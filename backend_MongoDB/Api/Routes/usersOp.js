const Users = require("../../Models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { crypto } =
import ("crypto");
const nodemailer = require("nodemailer");

const Cart = require("../../Models/cart");
const Wishlist = require("../../Models/wishlist");
const { MongoClient, ObjectID } = require("mongodb");

async function createEmptyCartOrWishlist(opt) {
    if (opt === "cart") {
        let note = await new Cart({
            products: [{
                productId: ObjectID("0000000088ff740dc8a7831b"),
                quantity: 0,
                price: 0,
            }, ],
        });
        note.save(function(err, note) {
            if (err) return err;
        });
        return note._id;
    } else if (opt === "wishlist") {
        let note = await new Wishlist({
            products: [{ productId: ObjectID("0000000088ff740dc8a7831b") }],
        });

        note.save(function(err, note) {
            if (err) return err;
        });
        return note._id;
    }
}

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
async function confirmLogin(entered, database) {
    let val = await bcrypt.compare(entered, database);
    return val;
}

function getJwt(id) {
    let tok = jwt.sign({ id: id }, "my@SecretKey-with-characters$", {
        expiresIn: "10m",
    });
    return tok;
}

function getResetToken() {
    const resetToken = crypto.randomBytes(32).toString("hex");
    return resetToken;
}

const sendEmail = async(options) => {
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "e527d8bea5e1e2",
            pass: "7298ff8d12af09",
        },
    });
    const mailOptions = {
        from: "E$!Te <E$!Te.org.in>",
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    await transport.sendMail(mailOptions);
};

module.exports = function(router) {
    router.get("/users", async function(req, res) {
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
                Users.find({}, (err, standup) => {
                    if (err) res.json({ success: false, message: err });
                    else {
                        if (!standup)
                            res.json({ success: false, message: "No Users Found" });
                        else res.json({ success: true, standup: standup });
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
    });

    router.get("/users/:id", async function(req, res) {
        if (!req.params.id) {
            res.json({ success: false, message: "No id is given" });
        } else {
            Users.findOne({ userid: req.params.id }, (err, standup) => {
                if (err) res.json({ success: false, message: err });
                else {
                    if (!standup) res.json({ success: false, message: "No Users Found" });
                    else {
                        const token = getJwt(standup._id);

                        res.cookie("jwt_Token", token, {
                            expire: new Date(Date.now() + 10 * 60 * 1000),
                            httpOnly: true,
                        });

                        res.json({ success: true, standup: standup });
                    }
                }
            });
        }
    });

    router.post("/users", async function(req, res) {
        let cartObj = await createEmptyCartOrWishlist("cart");
        let wishObj = await createEmptyCartOrWishlist("wishlist");

        let note = new Users({
            name: req.body.name,
            userid: req.body.userid,
            password: req.body.password,
            orders: req.body.orders,
            items: req.body.items,
            cart: cartObj,
            wishlist: wishObj,
        });

        note.save(function(err, note) {
            if (err) return res.status(400).json(err);

            return res.status(200).json({ user: note });
        });
    });
    router.patch("/updateUsers/:id", async function(req, res) {
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
                    Users.updateOne({ _id: req.params.id }, {
                            $set: { orders: req.body.orders, items: req.body.items },
                        },
                        (err, standup) => {
                            if (err) res.json({ success: false, message: err });
                            else
                                res.json({
                                    success: true,
                                    message: "User Details Updated ",
                                });
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

    router.post("/forgotPassword", async function(req, res) {
        if (!req.body.email)
            res.json({ success: false, message: "No Email is given in request" });
        else {
            let standup = await Users.findOne({ userid: req.body.email });

            if (standup) {
                const resetNormal = getResetToken();
                const resetHash = crypto
                    .createHash("sha256")
                    .update(resetNormal)
                    .digest("hex");
                Users.updateOne({ userid: req.body.email }, {
                        $set: {
                            resetToken: resetHash,
                            resetTokenExpiry: Date.now() + 10 * 60 * 1000,
                        },
                    },

                    (err, required) => {
                        if (err)
                            res.json({
                                success: false,
                                message: err,
                            });
                        else {
                            sendEmail({
                                email: req.body.email,
                                subject: "Your password Reset Token. Valid for 10 min only",
                                message: `Hi ${req.body.email}, \n Your unique secret token to reset password is:${resetNormal}\n Don't share it with anyone.\n This is valid only for 10 min.`,
                            });
                            res.json({
                                success: true,
                                message: "User is Valid and Mail is sent",
                            });
                        }
                    }
                );
            } else
                res.json({
                    success: false,
                    message: "Not a Valid User, Please Enter a valid Email Id ",
                });
        }
    });
    router.post("/resetPassword", async function(req, res) {
        if (!req.body.resetToken || !req.body.pass)
            res.json({
                success: false,
                message: "No Token is given in request",
                token: "",
            });
        else {
            const tokenHash = crypto
                .createHash("sha256")
                .update(req.body.resetToken)
                .digest("hex");

            Users.updateOne({
                    resetToken: tokenHash,
                    resetTokenExpiry: { $gt: Date.now() },
                }, {
                    $set: {
                        password: req.body.pass,
                        resetToken: undefined,
                        resetTokenExpiry: undefined,
                        passwordChangedAt: Date.now(),
                    },
                },

                (err, requi) => {
                    const jwt = getJwt(requi._id);
                    if (err) res.json({ success: false, message: err });
                    if (requi)
                        res.json({
                            success: true,
                            message: "Password is Reset",
                            token: jwt,
                        });
                    else
                        res.json({
                            success: false,
                            message: "Your Token is incorrect or expired.Please Login again",
                            token: "",
                        });
                }
            );
        }
    });

    router.post("/updatePassword", async function(req, res) {
        // if (req.cookies) {

        if (!req.body.newPassword || !req.body.id)
            res.json({
                success: false,
                message: "No Password or Id is given in request",
                token: "",
            });
        else {
            if (req.headers.cookie) {
                let userStandup = await validateJWT(req.headers.cookie.substring(10));
                if (userStandup === null || userStandup === undefined) {
                    res.clearCookie("jwt_Token");
                    res.json({
                        success: false,
                        message: "Can't access. Please Login Again, Your Session is expired",
                    });
                } else {
                    const jwt = getJwt(req.body.id);

                    Users.updateOne({ _id: req.body.id }, {
                            $set: {
                                password: req.body.newPassword,
                                resetToken: undefined,
                                resetTokenExpiry: undefined,
                                passwordChangedAt: Date.now(),
                            },
                        },
                        (err, required) => {
                            if (err) res.json({ success: false, message: err, token: "" });
                            else
                                res.json({
                                    success: true,
                                    message: "Password is Reset",
                                    token: jwt,
                                });
                        }
                    );
                }
            } else {
                res.json({
                    success: false,
                    message: "Can't access. Please Login Again, Your Session is expired",
                    token: "",
                });
            }
        }
    });

    router.post("/verifyUser", async function(req, res) {
        if (!req.body.email || !req.body.pwd)
            res.json({
                success: false,
                message: "No Email is given in request",
            });
        else {
            let document = await Users.findOne({ userid: req.body.email });
            if (document) {
                if (await confirmLogin(req.body.pwd, document.password))
                    res.json({
                        success: true,
                        message: "User is Valid",
                        userName: document.name,
                        token: await getJwt(document._id),
                    });
                else
                    res.json({
                        success: false,
                        message: "Invalid User Credentials",
                        userName: "SignIn",
                    });
            } else
                res.json({
                    success: false,
                    message: "Not a Valid User, Please SignUp to continue",
                    userName: "SignIn",
                });
        }
    });

    router.delete("/deleteUsers/:id", async function(req, res) {
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
                    Users.deleteOne({ _id: req.params.id }, (err, standup) => {
                        if (err) res.json({ success: false, message: "InValid Id " });
                        else res.json({ success: true, message: "User Deleted " });
                    });
                }
            } else {
                res.json({
                    success: false,
                    message: "Can't access. Please Login Again, Your Session is expired",
                    token: "",
                });
            }
        }
    });
};