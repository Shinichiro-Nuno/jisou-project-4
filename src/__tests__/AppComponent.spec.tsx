import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import App from "../App";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";

describe("title", () => {
  it("should render title", () => {
    render(
      <BrowserRouter>
        <ChakraProvider value={defaultSystem}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    );
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
