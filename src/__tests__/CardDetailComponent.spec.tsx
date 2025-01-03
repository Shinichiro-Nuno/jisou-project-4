import { CardDetail } from "@/CardDetail";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: () => ({ id: "1" }),
  useNavigate: jest.fn(),
}));

const mockData = {
  data: {
    id: "1",
    name: "テスト太郎",
    description: "<h1>テスト太郎の自己紹介</h1>",
    github_id: "github-taro",
    qiita_id: "qiita-taro",
    x_id: "x-taro",
    user_skill: [
      {
        skills: {
          id: 1,
          name: "React",
        },
      },
    ],
  },
};

jest.mock("@/lib/supabase", () => ({
  supabase: {
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn(() => Promise.resolve(mockData)),
        }),
      }),
    }),
  },
}));

describe("CardDetail", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);

    render(
      <BrowserRouter>
        <ChakraProvider value={defaultSystem}>
          <CardDetail />
        </ChakraProvider>
      </BrowserRouter>
    );
  });

  it("名前が表示されている", async () => {
    const nameElement = await screen.findByText("テスト太郎");
    expect(nameElement).toBeInTheDocument();
  });

  it("自己紹介が表示されている", async () => {
    const descriptionElement = await screen.findByText("テスト太郎の自己紹介");
    expect(descriptionElement).toBeInTheDocument();
  });

  it("好きな技術が表示されている", async () => {
    const skillElement = await screen.findByText("React");
    expect(skillElement).toBeInTheDocument();
  });

  it("GitHubのリンクが表示されている", async () => {
    const githubIcon = await screen.findByTestId("github-icon");
    expect(githubIcon).toBeInTheDocument();

    const githubLink = await screen.findByRole("link", { name: "GitHub" });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/github-taro"
    );
  });

  it("Qiitaのリンクが表示されている", async () => {
    const qiitaIcon = await screen.findByTestId("qiita-icon");
    expect(qiitaIcon).toBeInTheDocument();

    const qiitaLink = await screen.findByRole("link", { name: "Qiita" });
    expect(qiitaLink).toBeInTheDocument();
    expect(qiitaLink).toHaveAttribute("href", "https://qiita.com/qiita-taro");
  });

  it("Xのリンクが表示されている", async () => {
    const xIcon = await screen.findByTestId("x-icon");
    expect(xIcon).toBeInTheDocument();

    const xLink = await screen.findByRole("link", { name: "X" });
    expect(xLink).toBeInTheDocument();
    expect(xLink).toHaveAttribute("href", "https://x.com/x-taro");
  });

  it("戻るボタンをクリックすると/に遷移する", async () => {
    const backButton = await screen.findByRole("button", { name: "戻る" });

    await userEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
