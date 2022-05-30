/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, waitFor,act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Login from "../userInterface/Login";
import { Provider } from "react-redux";
import { BrowserRouter as Router} from "react-router-dom";
import { store } from "../store/store";


test.skip ("checking Login for routing and input validation", async () => {
  const setSearch = jest.fn((value) => { });
   window.alert = jest.fn();
const sleep = ms => new Promise(res => setTimeout(res, ms));
  render(
    <Provider store={store}>
      <Router>
        <Login setSearch={setSearch} />
      </Router>
    </Provider>
  );
  const text = screen.getAllByRole("textbox");
  expect(text).toHaveLength(2);

  const btn = screen.getAllByRole("button");
    expect(btn).toHaveLength(2);
    
    const lgnbtn = screen.getByRole("button", { name: /log in/i });
    expect(lgnbtn).toBeDisabled();

  const emailInput = screen.queryByPlaceholderText("Email Id", {
    exact: false,
  });

  userEvent.type(emailInput, "123456@gmail.com");
  expect(screen.queryByTestId("error-msg-email")).not.toBeInTheDocument();

  userEvent.clear(emailInput);
  userEvent.type(emailInput, "123456@gmail");
  expect(screen.queryByTestId("error-msg-email")).toBeInTheDocument();

  userEvent.clear(emailInput);
  userEvent.type(emailInput, "123456gmail.com");
  expect(screen.queryByTestId("error-msg-email")).toHaveTextContent(
    "Email is not valid!"
  );

  userEvent.clear(emailInput);
 
  expect(screen.queryByTestId("error-msg-email")).toHaveTextContent(
    "Please enter the Email id."
    );
    
const passwordInput = screen.queryByPlaceholderText("Password", {
    exact: false,
});
  userEvent.type(passwordInput, "12345678");
  expect(screen.queryByTestId("error-msg-pwd")).toHaveTextContent("Atleast one Special character !@#$%^&* is required");
  userEvent.clear(passwordInput);
userEvent.type(passwordInput, "1234@");
  expect(screen.queryByTestId("error-msg-pwd")).toHaveTextContent("Password must be at least 8 characters long!");
  userEvent.clear(passwordInput);

    const checkbox = screen.getByRole("checkbox");
    userEvent.type(emailInput, "123456@gmail.com");
    userEvent.type(passwordInput, "1234@5678");
    expect(checkbox).not.toBeChecked();
  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  await (waitFor(() => expect(lgnbtn).toBeEnabled(), { timeout: 2000 }));
  await act(() => sleep(500));
  userEvent.click(lgnbtn);
  expect(window.alert).toBeCalledWith("Authentication Successful");
  expect(global.window.location.href).toContain("/Profile");
});
