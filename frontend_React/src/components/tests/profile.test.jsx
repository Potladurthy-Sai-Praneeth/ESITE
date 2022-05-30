import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import ProtectedRoute from "../userInterface/protectroute";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../tests/store/store";
import Profile from "../userInterface/profile";

test.skip("checking Profile Page for logged In User", async() => {
    const setSearch = jest.fn(() => { });
    const sleep = ms => new Promise(res => setTimeout(res, ms));
    render(
        <Provider store={store} >
            <Router>
                <ProtectedRoute component = { Profile } setSearch = { setSearch }/> 
            </Router> 
        </Provider>
    );
    await waitFor(() => {
        expect(screen.getByText("Praneeth")).toBeInTheDocument(),
            expect(screen.getByText("123456@gmail.com")).toBeInTheDocument(),
            expect(screen.queryAllByAltText("Generic placeholder")).toHaveLength(2)
            , { timeout: 2000 }
    });

});

test.skip("checking Profile Page for logged In User with no items", async() => {
    const setSearch = jest.fn(() => { });
    const sleep = ms => new Promise(res => setTimeout(res, ms));
    render(
        <Provider store={store} >
            <Router>
                <ProtectedRoute component = { Profile } setSearch = { setSearch }/> 
            </Router> 
        </Provider>
    );

    //Test 

    await waitFor(() => {
        expect(screen.getByText("Praneeth")).toBeInTheDocument(),
            expect(screen.getByText("123456@gmail.com")).toBeInTheDocument(),
            expect(screen.queryByText("No Orders Yet")).toBeInTheDocument()
            , { timeout: 2000 }
    });

});

test.skip("checking Profile Page for Admin", async() => {
    const setSearch = jest.fn(() => { });
    const sleep = ms => new Promise(res => setTimeout(res, ms));
    render(
        <Provider store={store} >
            <Router>
                <ProtectedRoute component = { Profile } setSearch = { setSearch }/> 
            </Router> 
        </Provider>
    );

    const btn = screen.getByRole("button", { name: /view items/i });

    await waitFor(() => {
        expect(btn).toBeInTheDocument(),
            expect(btn).toBeEnabled(),
            userEvent.click(btn),
            expect(global.window.location.href).toContain("/Admin")
            , { timeout: 2000 }
    });

});
