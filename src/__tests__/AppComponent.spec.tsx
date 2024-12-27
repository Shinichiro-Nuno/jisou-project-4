import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import App from "../App";
import { render, screen } from "@testing-library/react";

describe("title", () => {
  it("should render title", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    );
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
