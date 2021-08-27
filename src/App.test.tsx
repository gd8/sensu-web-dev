import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// TODO: Doesn't currently pass due to missing context. Feel free fix and add
// some tests, if that's your thing.
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
