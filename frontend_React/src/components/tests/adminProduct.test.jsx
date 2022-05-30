/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, waitFor,act, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import AdminProduct from "../userInterface/adminProduct";
import AdminUser from "../userInterface/adminUser";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import ProtectedRoute from "../userInterface/protectroute";
import { store } from "../tests/store/store";

test.skip("Checking  AdminProduct Page to find products", async () => {

 const setSearch = jest.fn(() => { });
    const sleep = ms => new Promise(res => setTimeout(res, ms));

    render(
        <Provider store={store} >
            <Router>
                <ProtectedRoute component = { AdminProduct } setSearch = { setSearch }/> 
            </Router> 
        </Provider>
    );

    const table = await(waitFor(() => screen.findByRole("table"),{timeout:2000}));
    expect(table).toBeInTheDocument();
    const rows = await(waitFor(() => screen.findAllByRole("row"),{timeout:2000}));
    expect(rows).toHaveLength(11);
});

test.skip("Checking  AdminUser Page to find users", async () => {

 const setSearch = jest.fn(() => { });
    const sleep = ms => new Promise(res => setTimeout(res, ms));

    render(
        <Provider store={store} >
            <Router>
                <ProtectedRoute component = { AdminUser } setSearch = { setSearch }/> 
            </Router> 
        </Provider>
    );

    await act(() => sleep(500));

    const table = await screen.findByRole("table");
        expect(table).toBeInTheDocument();
    await waitFor(async () =>
    {         const rows = await screen.findAllByRole("row");
        
        expect(rows).toHaveLength(4);
    }, { timeout: 2000 })
    
});
