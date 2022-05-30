/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "../userInterface/App";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { store } from "../store/store";

test.skip ("checking app component for carousel, footer", async () => {
  const setSearch = jest.fn(() => {
    Promise.resolve();
  });
  // const { container } =
  render(
    <Provider store={store}>
      <Router>
        <App setSearch={setSearch} />
      </Router>
    </Provider>
  );
  const container = screen.getAllByAltText(/slide/i);
  expect(container).toHaveLength(3);
 
  const card = await(waitFor(() => screen.findAllByAltText(/popular/i),{timeout:2000}));
  
  expect(card).toHaveLength(4);
 
  const foot = screen.getByText(/Equipping your creativity/i);
  
  expect(foot).toBeInTheDocument();
});
