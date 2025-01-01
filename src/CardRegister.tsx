import {
  Box,
  Button,
  createListCollection,
  Heading,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { IoIosArrowDown } from "react-icons/io";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router";

export const CardRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit = async (formData: FormData) => {
    try {
      const { error } = await supabase.rpc("register_user_with_skill", {
        p_favorite_word: formData.favoriteWord,
        p_name: formData.name,
        p_description: formData.introduction,
        p_github_id: formData.githubId,
        p_qiita_id: formData.qiitaId,
        p_x_id: formData.xId,
        p_skill_id: formData.skill,
      });

      if (error) {
        console.error("Supabase RPCエラー", error);
        toaster.create({
          title: "登録に失敗しました",
          type: "error",
        });
        return;
      }

      toaster.create({
        title: "登録が完了しました",
        type: "success",
      });

      reset();

      navigate("/");
    } catch (err) {
      console.error("キャッチされたエラー", err);
      toaster.create({
        title: "登録に失敗しました",
        type: "error",
      });
    }
  };

  type FormData = {
    favoriteWord: string;
    name: string;
    introduction: string;
    skill: number;
    githubId: string;
    qiitaId: string;
    xId: string;
  };

  type SkillItem = {
    label: string;
    value: string;
  };

  type SkillCollection = {
    items: SkillItem[];
  };

  const [skills, setSkills] = useState<{ id: number; name: string }[]>([]);
  const skillCollection: SkillCollection = createListCollection({
    items: skills.map((skill) => ({
      label: skill.name,
      value: skill.id.toString(),
    })),
  });

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase.from("skills").select("id, name");

      if (error) {
        console.error("スキルの取得に失敗しました:", error);
        return;
      }

      setSkills(data || []);
    };

    fetchSkills();
  }, []);

  return (
    <>
      <Heading textAlign="center" mb="2">
        新規名刺登録
      </Heading>
      <Box bg="white" borderRadius="md" px="4" py="4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <Field
              label="好きな英単語 *"
              invalid
              errorText={errors.favoriteWord?.message}
            >
              <Input
                type="text"
                {...register("favoriteWord", {
                  required: "必須項目です",
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: "英語の文字列のみ使用できます",
                  },
                })}
              />
            </Field>
            <Field label="お名前 *" invalid errorText={errors.name?.message}>
              <Input
                type="text"
                {...register("name", { required: "必須項目です" })}
              />
            </Field>
            <Field
              label="自己紹介 *"
              invalid
              errorText={errors.introduction?.message}
            >
              <Textarea
                {...register("introduction", { required: "必須項目です" })}
              />
            </Field>
            <Field
              label="好きな技術 *"
              invalid
              errorText={errors.skill?.message}
            >
              <Controller
                name="skill"
                control={control}
                rules={{ required: "必須項目です" }}
                render={({ field }) => (
                  <SelectRoot
                    value={field.value ? [field.value] : []}
                    onValueChange={(value: { value: string[] }) => {
                      field.onChange(value.value[0]);
                    }}
                    collection={skillCollection}
                  >
                    <SelectTrigger>
                      <Box
                        display="flex"
                        alignItems="center"
                        width="100%"
                        justifyContent="space-between"
                      >
                        {/* @ts-expect-error: Temporarily ignoring type error for placeholder */}
                        <SelectValueText placeholder="Select option" />
                        <IoIosArrowDown />
                      </Box>
                    </SelectTrigger>
                    <SelectContent>
                      {skillCollection.items.map((skill) => (
                        // @ts-expect-error: item does not match expected type
                        <SelectItem key={skill.value} item={skill.value}>
                          {skill.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                )}
              />
            </Field>
            <Field label="GitHub ID">
              <Input type="text" {...register("githubId")} />
            </Field>
            <Field label="Qiita ID">
              <Input type="text" {...register("qiitaId")} />
            </Field>
            <Field label="X ID">
              <Input type="text" {...register("xId")} />
            </Field>
            <Box>* は必須項目です</Box>
            <Button
              width="100%"
              fontWeight="bold"
              type="submit"
              bg="#3182CE"
              color="white"
            >
              登録
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
};
