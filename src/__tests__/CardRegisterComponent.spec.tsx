import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, useNavigate } from "react-router";
import { CardRegister } from "@/CardRegister";
import { supabase } from "@/lib/supabase";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));

jest.mock("@/lib/supabase", () => ({
  supabase: {
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        data: [
          { id: 1, name: "React" },
          { id: 2, name: "TypeScript" },
          { id: 3, name: "GitHub" },
        ],
        error: null,
      }),
    }),
    rpc: jest.fn().mockResolvedValue({ data: null, error: null }),
  },
}));

describe("CardRegister", () => {
  const mockNavigate = jest.fn();

  beforeAll(() => {
    Object.defineProperty(window.HTMLElement.prototype, "scrollTo", {
      value: jest.fn(),
      writable: true,
    });
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);

    const mockSkills = [
      { id: 1, name: "React" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "GitHub" },
    ];

    (supabase.from as jest.Mock).mockImplementation(() => ({
      select: () => ({
        data: mockSkills,
        error: null,
      }),
    }));

    await act(async () => {
      render(
        <BrowserRouter>
          <ChakraProvider value={defaultSystem}>
            <CardRegister />
          </ChakraProvider>
        </BrowserRouter>
      );
    });
  });

  it("タイトルが表示されている", async () => {
    const titleElement = await screen.findByText("新規名刺登録");
    expect(titleElement).toBeInTheDocument();
  });

  it("全項目入力して登録ボタンを押すと/に遷移する", async () => {
    const favoriteWordInput = await screen.findByLabelText("好きな英単語 *");
    const nameInput = await screen.findByLabelText("お名前 *");
    const descriptionInput = await screen.findByLabelText("自己紹介 *");
    const githubIdInput = await screen.findByLabelText("GitHub ID");
    const qiitaIdInput = await screen.findByLabelText("Qiita ID");
    const xIdInput = await screen.findByLabelText("X ID");

    await userEvent.type(favoriteWordInput, "sampleword");
    await userEvent.type(nameInput, "テスト太郎");
    await userEvent.type(descriptionInput, "テスト太郎の自己紹介");

    const skillSelect = screen.getByRole("combobox", {
      name: "好きな技術 *",
    });
    await userEvent.click(skillSelect);
    const skillOption = await screen.findByText("React");
    await userEvent.click(skillOption);

    await userEvent.type(githubIdInput, "github-taro");
    await userEvent.type(qiitaIdInput, "qiita-taro");
    await userEvent.type(xIdInput, "x-taro");

    const registerButton = await screen.findByTestId("register-button");

    await userEvent.click(registerButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
