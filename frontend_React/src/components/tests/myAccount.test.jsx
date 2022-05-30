import React from "react";
import { render, screen,waitFor,act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import MyAccount from "../userInterface/myAccount";
import { Provider } from "react-redux";
import { BrowserRouter as Router} from "react-router-dom";
import { store } from "../store/store";

test.skip ("checking My Account for routing and input validation", async () => {
  const setSearch = jest.fn((value) => {});
const sleep = ms => new Promise(res => setTimeout(res, ms));
  render(
    <Provider store={store}>
      <Router>
        <MyAccount setSearch={setSearch} />
      </Router>
    </Provider>
  );
  const text = screen.getAllByRole("textbox");
  expect(text).toHaveLength(3);

  const btn = screen.getAllByRole("button");
  expect(btn).toHaveLength(2);

  const change = screen.getByText("Login", { exact: false });
  userEvent.click(change);
  expect(global.window.location.href).toContain("/Login");

const name = screen.queryByPlaceholderText("Name", {
    exact: false,
});
  userEvent.type(name, "Hell");
  expect(screen.queryByTestId("error-msg-name")).toHaveTextContent("Name must be at least 5 characters long and max of 30 characters");
  userEvent.clear(name);
  userEvent.type(name, "Hell Boy$8721");
  expect(screen.queryByTestId("error-msg-name")).toHaveTextContent("Accepts Alphabets, space & Min 5 to Max 30 Char");
  userEvent.clear(name);
  

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

const passwordInput = screen.queryByPlaceholderText(/^Password$/, {
    exact: false,
});
  userEvent.type(passwordInput, "12345678");
  expect(screen.queryByTestId("error-msg-pwd")).toHaveTextContent("Atleast one Special character !@#$%^&* is required");
  userEvent.clear(passwordInput);
userEvent.type(passwordInput, "1234@");
  expect(screen.queryByTestId("error-msg-pwd")).toHaveTextContent("Password must be at least 8 characters long!");
  userEvent.clear(passwordInput);

  const confirmPasswordInput = screen.queryByPlaceholderText("Confirm Password", {
    exact: false,
  });
  userEvent.type(passwordInput, "1234@5678");
  userEvent.type(confirmPasswordInput, "12345678");
  expect(screen.queryByTestId("error-msg-confirmpwd")).toHaveTextContent("Password Must match");
  userEvent.clear(passwordInput);
  userEvent.clear(confirmPasswordInput);

  
  const checkbox = screen.getByRole("checkbox");
  const signUpBtn = screen.getByRole("button", { name: /sign up/i });
    expect(signUpBtn).toBeDisabled();

  userEvent.type(name, "Input");
    userEvent.type(emailInput, "123456@gmail.com");
  userEvent.type(passwordInput, "1234@5678");
  userEvent.type(confirmPasswordInput, "1234@5678");
  expect(checkbox).not.toBeChecked();
  userEvent.click(checkbox);
  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  await (waitFor(() => expect(signUpBtn).toBeEnabled(), { timeout: 2000 }));
  await act(() => sleep(500));
  userEvent.click(signUpBtn);
 
  expect(global.window.location.href).toContain("/Login");
});
