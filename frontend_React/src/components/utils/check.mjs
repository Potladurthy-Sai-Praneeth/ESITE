import fetch from "node-fetch";
let entireCart = [{
        _id: "625bb339cac0e255bc8153ee",
        productId: "00000000cac0e255bc8153ec",
        quantity: 0,
        price: 0,
    },
    {
        _id: "625bf1018e2ee43a74f11f86",
        productId: "6202887bfa382c334c376310",
        price: 127990,
        quantity: 1,
    },
    {
        _id: "625bf1158e2ee43a74f11f87",
        productId: "6202887bfa382c334c37632f",
        price: 2290,
        quantity: 2,
    },
];
let cart = [];
let inter = [];
inter = entireCart.map(async(el) => {
    if (el.price === 0 || el.quantity === 0) return;
    else {
        return await fetch(`http://localhost:8081/api/product/${el.productId}`)
            .then((resp) => resp.json())
            .then(async(inp) => {
                cart.push(inp.standup);
                return await inp.standup;
            });
    }
});
setTimeout(() => {
    console.log(inter);
    console.log(cart);
}, 1000);