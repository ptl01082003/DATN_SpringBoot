import React from "react";
import { render, screen } from "@testing-library/react"; // Import screen from testing-library
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText(/learn/i)).toBeInTheDocument();
});
