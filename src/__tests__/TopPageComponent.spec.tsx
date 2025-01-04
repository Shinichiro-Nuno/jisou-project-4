import { TopPage } from "@/TopPage";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router";

describe("TopPage", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ChakraProvider value={defaultSystem}>
          <TopPage />
        </ChakraProvider>
      </BrowserRouter>
    );
  });

  it("タイトルが表示されている", async () => {
    const titleElement = await screen.findByText("デジタル名刺アプリ");
    expect(titleElement).toBeInTheDocument();
  });

  it("IDを入力してボタンを押すと/cards/:idに遷移する", async () => {
    const idInput = await screen.findByLabelText("ID");
    await userEvent.type(idInput, "test");
    const button = await screen.findByRole("button", { name: "名刺をみる" });

    await userEvent.click(button);
    expect(window.location.pathname).toBe("/cards/test");
  });

  it("IDを入力しないでボタンを押すとエラーメッセージが表示される", async () => {
    const button = await screen.findByRole("button", { name: "名刺をみる" });

    await userEvent.click(button);
    const errorMessage = await screen.findByText("IDを入力してください");
    expect(errorMessage).toBeInTheDocument();
  });

  it("新規登録はこちらを押すと/cards/registerに遷移する", async () => {
    const link = await screen.findByRole("link", { name: "新規登録はこちら" });

    await userEvent.click(link);
    expect(window.location.pathname).toBe("/cards/register");
  });
});
