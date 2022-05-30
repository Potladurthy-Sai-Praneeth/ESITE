/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, waitFor,act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Admin from "../userInterface/admin";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import ProtectedRoute from "../userInterface/protectroute";
import { store } from "../tests/store/store";

test.skip("Checking Routing from Admin to AdminProduct", async () => {

    const setSearch = jest.fn(() => { });
    const sleep = ms => new Promise(res => setTimeout(res, ms));

    render(
        <Provider store={store} >
            <Router>
                <ProtectedRoute component = { Admin } setSearch = { setSearch }/> 
            </Router> 
        </Provider>
    );

    await waitFor(() => {
        const btn1 = screen.getByRole("button", { name: "Products" });
        expect(btn1).toBeInTheDocument(),
            
        userEvent.click(btn1),
        expect(window.location.href).toContain("/AdminProduct")
            , { timeout: 2000 }
    });

    const btn2 = screen.getByRole("button", { name: "Users" });
    expect(btn2).toBeInTheDocument();
    expect(btn2).toBeEnabled();
    userEvent.click(btn2);
    expect(window.location.href).toContain("/AdminUser");
});
