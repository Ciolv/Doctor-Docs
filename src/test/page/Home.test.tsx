import React from "react";
import { render, screen } from "@testing-library/react";
import { Home } from "../../ts/page/Home";

test("renders learn react link", () => {
  render(<Home />);
  const linkElement = screen.getByText(/Edit/i);
  expect(linkElement).toBeInTheDocument();
});
