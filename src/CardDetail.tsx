import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { User } from "./types/user";
import { Box, Flex, Heading, Link, Spinner, Stack } from "@chakra-ui/react";
import { FaGithubSquare } from "react-icons/fa";
import { SiQiita } from "react-icons/si";
import { FaSquareXTwitter } from "react-icons/fa6";

type CardParams = {
  id: string;
};

export const CardDetail = () => {
  const { id } = useParams<CardParams>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserWithSkills = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("users")
          .select(
            `
            "name",
            "description",
            "github_id",
            "qiita_id",
            "x_id",
            user_skill (
              skills (
                id,
                name
              )
            )
          `
          )
          .eq("id", id)
          .single<User>();
        // console.log(data);
        console.log(JSON.stringify(data, null, 2));

        if (error) throw error;

        const user = User.createUser(data);

        setUser(user);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          console.error("データ取得エラー", err.message);
        } else {
          setError("予期せぬエラーが発生しました");
          console.error("データ取得エラー", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserWithSkills();
  }, [id]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : user ? (
        <Stack bg="white" px="4" py="2" borderRadius="md">
          <Heading>{user.name}</Heading>
          <Box>
            <Box fontWeight="bold">自己紹介</Box>
            <Box
              fontSize="sm"
              dangerouslySetInnerHTML={{ __html: user.description }}
            />
          </Box>
          <Box>
            <Box fontWeight="bold">好きな技術</Box>
            <Box fontSize="sm">
              {user.user_skill?.map((skill) => skill.skills.name).join(", ")}
            </Box>
          </Box>
          <Flex justify="space-around">
            {user.github_id && (
              <Link href={user.githubUrl} target="_blank">
                <FaGithubSquare size="24" />
              </Link>
            )}
            {user.qiita_id && (
              <Link href={user.qiitaUrl} target="_blank">
                <SiQiita size="24" />
              </Link>
            )}
            {user.x_id && (
              <Link href={user.xUrl} target="_blank">
                <FaSquareXTwitter size="24" />
              </Link>
            )}
          </Flex>
        </Stack>
      ) : (
        <Box>データがありません</Box>
      )}
    </>
  );
};
