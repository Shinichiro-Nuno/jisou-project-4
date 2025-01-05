console.log("バッチ用のテスト");

import { supabase } from "../src/lib/supabase.ts";

const batchDeleteUsersAndSkills = async () => {
  try {
    console.log("バッチ処理を開始します...");

    const { data, error } = await supabase.rpc("delete_users_and_skills");

    if (error) {
      throw new Error(`削除処理でエラーが発生しました: ${error.message}`);
    }

    console.log("削除処理が完了しました:", data);
  } catch (err) {
    console.error("バッチ処理でエラーが発生しました:", err);
    process.exit(1);
  }
};

batchDeleteUsersAndSkills().then(() => {
  console.log("バッチ処理が正常に終了しました");
  process.exit(0);
});
