// src/mocks/handlers.js
import { rest } from "msw";
// const baseUrl = "http://127.0.0.1:8081"


export const handlers = [

    rest.get("http://localhost:8081/api/products/:mobiles", async(req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([{
                    id: 1,
                    prodname: "Apple iPhone XR (Red, 128 GB)",
                    price: "67999",
                    content: "128 GB ROM | 15.49 cm (6.1 inch) Display 12MP Rear Camera | 7MP Front Camera A12 Bionic Chip Processor",
                    image: "https://i.imgur.com/KFojDGa.jpg",
                    popularity: "high",
                    category: "mobiles",
                },
                {
                    id: 2,
                    prodname: "Apple iPhone XS (Silver, 64 GB)",
                    price: "99900",
                    content: "64 GB ROM | 14.73 cm (5.8 inch) Super Retina HD Display 12MP + 12MP | 7MP Front Camera A12 Bionic Chip Processor",
                    image: "https://i.imgur.com/KFojDGa.jpg",
                    popularity: "moderate",
                    category: "mobiles",
                },
                {
                    id: 3,
                    prodname: "Apple iPhone XS Max (Gold, 64 GB)",
                    price: "109900",
                    content: "64 GB ROM | 16.51 cm (6.5 inch) Super Retina HD Display 12MP + 12MP | 7MP Front Camera A12 Bionic Chip Processor",
                    image: "https://i.imgur.com/KFojDGa.jpg",
                    popularity: "moderate",
                    category: "mobiles",
                },
                {
                    id: 4,
                    prodname: "OnePlus 7 Pro (Almond, 256 GB)",
                    price: "52999",
                    content: "Rear Camera|48MP (Primary)+ 8MP (Tele-photo)+16MP (ultrawide)| Front Camera|16 MP POP-UP Camera|8GB RAM|Android pie",
                    image: "https://i.imgur.com/6IUbEME.jpg",
                    popularity: "high",
                    category: "mobiles",
                },
            ])
        );
    }),
    rest.post("http://localhost:8081/api/users", async(req, res, ctx) => {
        if (!req.body.name || !req.body.userid || !req.body.password || !req.body.orders || !req.body.items) {
            return res(
                ctx.status(400),
                ctx.json({
                    success: false,
                    message: "No Input is given in request",
                }));
        } else {
            return res(
                ctx.status(200),
                ctx.json({
                    success: false,
                    user: {
                        name: req.body.name,
                        userid: req.body.userid,
                        password: req.body.password,
                        orders: req.body.orders,
                        items: req.body.items,
                        cart: ObjectId("725276jhguiy987weg178ioy"),
                        wishlist: ObjectId("725276jhguiy987weg178ioy"),
                    }
                }));

        }
    }),

    rest.post("http://localhost:8081/api/verifyUser", async(req, res, ctx) => {
        if (!req.body.email || !req.body.pwd) {
            return res(
                ctx.status(400),
                ctx.json({
                    success: false,
                    message: "No Email is given in request",
                }));
        } else {
            if ((req.body.email !== "123456@gmail.com" && req.body.pwd !== "1234@5678") || (req.body.email !== "admin@gmail.com" && req.body.pwd !== "admin@123")) {
                if (req.body.email === "123456@gmail.com") {
                    return res(
                        ctx.status(200),
                        ctx.json({
                            success: true,
                            message: "User is Valid",
                            userName: "Praneeth",
                            token: "ashxjsajh#@15428716VGvhjdvuiehkjoj0987!@@387hjd",
                        }));
                } else if (req.body.email === "admin@gmail.com") {
                    return res(
                        ctx.status(200),
                        ctx.json({
                            success: true,
                            message: "User is Valid",
                            userName: "Admin",
                            token: "ashxjsajh#@15428716VGvhjdvuiehkjoj0987!@@387hjd",
                        }));
                }
            } else {
                return res(
                    ctx.status(400),
                    ctx.json({
                        success: false,
                        message: "Invalid User Credentials",
                        userName: "SignIn",
                    }));
            }
        }

    }),
    rest.get("http://localhost:8081/api/users/123456@gmail.com", async(req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.cookie("jwt_Token", "ashxjsajh#@15428716VGvhjdvuiehkjoj0987!@@387hjd", {
                expire: new Date(Date.now() + 10 * 60 * 1000),
                httpOnly: true,
            }),
            ctx.json({
                success: true,
                standup: {
                    "_id": ObjectId("725276jhguiy987weg178ioy"),
                    "items": [{
                            "_id": "725276jhguiy987weg178ioy",
                            "id": "3",
                            "prodname": "Lenovo Ideapad Slim 3 ",
                            "price": 34999,
                            "content": "10th Gen Intel Core i3 15.6-Inch (39.62cm) FHD Thin & Light Laptop (8GB/256 GB SSD/UHD Graphics/Windows 10/MS Office/2 Year Warranty/Platinum Grey/1.7Kg), 81WB012DIN",
                            "image": "https://m.media-amazon.com/images/I/61Dw5Z8LzJL._SL1000_.jpg",
                            "popularity": "moderate",
                            "category": "laptops",
                            "quantity": 1
                        },
                        {
                            "_id": "725276jhguiy987weg178iok",
                            "id": "2",
                            "prodname": "Samsung",
                            "price": 10390,
                            "content": "23 L Solo Microwave Oven (MS23J5133AG/TL, Black)",
                            "image": "https://m.media-amazon.com/images/I/610H0eAFStL._SL1500_.jpg",
                            "popularity": "moderate",
                            "category": "microwave",
                            "quantity": 1
                        }
                    ],
                    "name": "Praneeth",
                    "userid": "123456@gmail.com",
                    "password": "hjoihouweh&*623gUYDEVhv^287yuu9u@giudgedeidukdh83hdjediow.me",
                    "orders": 2,
                    "cart": ObjectId("725276jhguiy987weg178ioy"),
                    "wishlist": ObjectId("725276jhguiy987weg178ioy"),
                }
            }));
    }),

    rest.get("http://localhost:8081/api/users", async(req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                success: true,
                standup: [{
                        "_id": ObjectId("725276jhguiy987weg178ioy"),
                        "items": [{
                                "_id": "725276jhguiy987weg178ioy",
                                "id": "3",
                                "prodname": "Lenovo Ideapad Slim 3 ",
                                "price": 34999,
                                "content": "10th Gen Intel Core i3 15.6-Inch (39.62cm) FHD Thin & Light Laptop (8GB/256 GB SSD/UHD Graphics/Windows 10/MS Office/2 Year Warranty/Platinum Grey/1.7Kg), 81WB012DIN",
                                "image": "https://m.media-amazon.com/images/I/61Dw5Z8LzJL._SL1000_.jpg",
                                "popularity": "moderate",
                                "category": "laptops",
                                "quantity": 1
                            },
                            {
                                "_id": "725276jhguiy987weg178iok",
                                "id": "2",
                                "prodname": "Samsung",
                                "price": 10390,
                                "content": "23 L Solo Microwave Oven (MS23J5133AG/TL, Black)",
                                "image": "https://m.media-amazon.com/images/I/610H0eAFStL._SL1500_.jpg",
                                "popularity": "moderate",
                                "category": "microwave",
                                "quantity": 1
                            }
                        ],
                        "name": "Praneeth",
                        "userid": "123456@gmail.com",
                        "password": "hjoihouweh&*623gUYDEVhv^287yuu9u@giudgedeidukdh83hdjediow.me",
                        "orders": 2,
                        "cart": ObjectId("725276jhguiy987weg178ioy"),
                        "wishlist": ObjectId("725276jhguiy987weg178ioy"),
                    }, {
                        "_id": ObjectId("725276jhguiy987weg178ioy"),
                        "items": [],
                        "name": "Admin",
                        "userid": "admin@gmail.com",
                        "password": "hjoihouweh&*623gUYDEVhv^287yuu9u@giudgedeidukdh83hdjediow.me",
                        "orders": 2,
                        "cart": ObjectId("725276jhguiy987weg178ioy"),
                        "wishlist": ObjectId("725276jhguiy987weg178ioy"),
                    },
                    {
                        "_id": ObjectId("725276jhguiy987weg178ioy"),
                        "items": [{
                            "_id": "725276jhguiy987weg178iok",
                            "id": "2",
                            "prodname": "Samsung",
                            "price": 10390,
                            "content": "23 L Solo Microwave Oven (MS23J5133AG/TL, Black)",
                            "image": "https://m.media-amazon.com/images/I/610H0eAFStL._SL1500_.jpg",
                            "popularity": "moderate",
                            "category": "microwave",
                            "quantity": 1
                        }],
                        "name": "Hello",
                        "userid": "09876@gmail.com",
                        "password": "hjoihouweh&*623gUYDEVhv^287yuu9u@giudgedeidukdh83hdjediow.me",
                        "orders": 2,
                        "cart": ObjectId("725276jhguiy987weg178ioy"),
                        "wishlist": ObjectId("725276jhguiy987weg178ioy"),
                    },
                ],
            }));
    }),

    rest.get("http://localhost:8081/api/products", async(req, res, ctx) => {
        console.log("in products");
        return res(
            ctx.status(200),
            ctx.json({
                success: true,
                standup: [{
                        id: 1,
                        prodname: "Apple iPhone XR (Red, 128 GB)",
                        price: "67999",
                        content: "128 GB ROM | 15.49 cm (6.1 inch) Display 12MP Rear Camera | 7MP Front Camera A12 Bionic Chip Processor",
                        image: "https://i.imgur.com/KFojDGa.jpg",
                        popularity: "high",
                        category: "mobiles",
                    },
                    {
                        id: 2,
                        prodname: "Apple iPhone XS (Silver, 64 GB)",
                        price: "99900",
                        content: "64 GB ROM | 14.73 cm (5.8 inch) Super Retina HD Display 12MP + 12MP | 7MP Front Camera A12 Bionic Chip Processor",
                        image: "https://i.imgur.com/KFojDGa.jpg",
                        popularity: "moderate",
                        category: "mobiles",
                    },
                    {
                        id: 3,
                        prodname: "Apple iPhone XS Max (Gold, 64 GB)",
                        price: "109900",
                        content: "64 GB ROM | 16.51 cm (6.5 inch) Super Retina HD Display 12MP + 12MP | 7MP Front Camera A12 Bionic Chip Processor",
                        image: "https://i.imgur.com/KFojDGa.jpg",
                        popularity: "moderate",
                        category: "mobiles",
                    },
                    {
                        id: 4,
                        prodname: "OnePlus 7 Pro (Almond, 256 GB)",
                        price: "52999",
                        content: "Rear Camera|48MP (Primary)+ 8MP (Tele-photo)+16MP (ultrawide)| Front Camera|16 MP POP-UP Camera|8GB RAM|Android pie",
                        image: "https://i.imgur.com/6IUbEME.jpg",
                        popularity: "high",
                        category: "mobiles",
                    },
                    {
                        id: 1,
                        prodname: "Apple iPhone XR (Red, 128 GB)",
                        price: "67999",
                        content: "128 GB ROM | 15.49 cm (6.1 inch) Display 12MP Rear Camera | 7MP Front Camera A12 Bionic Chip Processor",
                        image: "https://i.imgur.com/KFojDGa.jpg",
                        popularity: "high",
                        category: "mobiles",
                    },
                    {
                        id: 2,
                        prodname: "Apple iPhone XS (Silver, 64 GB)",
                        price: "99900",
                        content: "64 GB ROM | 14.73 cm (5.8 inch) Super Retina HD Display 12MP + 12MP | 7MP Front Camera A12 Bionic Chip Processor",
                        image: "https://i.imgur.com/KFojDGa.jpg",
                        popularity: "moderate",
                        category: "mobiles",
                    },
                    {
                        id: 3,
                        prodname: "Apple iPhone XS Max (Gold, 64 GB)",
                        price: "109900",
                        content: "64 GB ROM | 16.51 cm (6.5 inch) Super Retina HD Display 12MP + 12MP | 7MP Front Camera A12 Bionic Chip Processor",
                        image: "https://i.imgur.com/KFojDGa.jpg",
                        popularity: "moderate",
                        category: "mobiles",
                    },
                    {
                        id: 4,
                        prodname: "OnePlus 7 Pro (Almond, 256 GB)",
                        price: "52999",
                        content: "Rear Camera|48MP (Primary)+ 8MP (Tele-photo)+16MP (ultrawide)| Front Camera|16 MP POP-UP Camera|8GB RAM|Android pie",
                        image: "https://i.imgur.com/6IUbEME.jpg",
                        popularity: "high",
                        category: "mobiles",
                    },
                    {
                        id: 1,
                        prodname: "Apple iPhone XR (Red, 128 GB)",
                        price: "67999",
                        content: "128 GB ROM | 15.49 cm (6.1 inch) Display 12MP Rear Camera | 7MP Front Camera A12 Bionic Chip Processor",
                        image: "https://i.imgur.com/KFojDGa.jpg",
                        popularity: "high",
                        category: "mobiles",
                    },
                    {
                        id: 2,
                        prodname: "Apple iPhone XS (Silver, 64 GB)",
                        price: "99900",
                        content: "64 GB ROM | 14.73 cm (5.8 inch) Super Retina HD Display 12MP + 12MP | 7MP Front Camera A12 Bionic Chip Processor",
                        image: "https://i.imgur.com/KFojDGa.jpg",
                        popularity: "moderate",
                        category: "mobiles",
                    },
                ],
            }));
    }),
];