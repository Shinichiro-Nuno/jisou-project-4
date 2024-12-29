import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { User } from "./types/user";
import { Box, Link, Spinner, Stack } from "@chakra-ui/react";

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
        <Stack>
          <Box>名前: {user.name}</Box>
          <Box>自己紹介: {user.description}</Box>
          <Box>
            スキル:
            {user.user_skill?.map((skill) => skill.skills.name).join(", ")}
          </Box>
          <Box>
            GitHub:{" "}
            {user.github_id && (
              <Link href={user.githubUrl} target="_blank">
                {user.github_id}
              </Link>
            )}
          </Box>
          <Box>
            Qiita:{" "}
            {user.qiita_id && (
              <Link href={user.qiitaUrl} target="_blank">
                {user.qiita_id}
              </Link>
            )}
          </Box>
          <Box>
            X:{" "}
            {user.x_id && (
              <Link href={user.xUrl} target="_blank">
                {user.x_id}
              </Link>
            )}
          </Box>
        </Stack>
      ) : (
        <Box>データがありません</Box>
      )}
    </>
  );
};
