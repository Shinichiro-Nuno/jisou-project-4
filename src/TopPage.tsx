import { useEffect, useState } from "react";
import { Button, Heading, Input, Link, Stack, Text } from "@chakra-ui/react";
import { Field } from "./components/ui/field";
import { useNavigate } from "react-router";

export const TopPage = () => {
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id.trim()) {
      setError("IDを入力してください");

      return;
    }

    navigate(`/cards/${id}`);
  };

  useEffect(() => {
    setId("");
    setError("");
  }, []);

  return (
    <>
      <Stack gap="4">
        <Heading textAlign="center">デジタル名刺アプリ</Heading>
        <form onSubmit={handleSubmit}>
          <Stack bg="white" borderRadius="md" px="4" py="4" gap="4">
            <Field label="ID">
              <Input
                type="text"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                  setError("");
                }}
              />
              {error && (
                <Text fontSize="sm" color="red">
                  {error}
                </Text>
              )}
            </Field>
            <Button
              width="100%"
              fontWeight="bold"
              type="submit"
              bg="#319795"
              color="white"
            >
              名刺をみる
            </Button>
          </Stack>
        </form>
        <Link
          display="block"
          textAlign="center"
          onClick={() => navigate("/cards/register")}
        >
          新規登録はこちら
        </Link>
      </Stack>
    </>
  );
};
