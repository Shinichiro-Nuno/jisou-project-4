# プロジェクト名（デジタル名刺作成）

## 概要

勉強会で名刺交換をする中で、書いてある内容がそれぞれ違うため話題が生まれにくく、持っている人持っていない人がいることに目をつけて誰もがその場で登録できるオンライン名刺システムを開発することにしました

オンライン名刺はその日まで有効で、次の日にはみれなくなるようにしようと考えました

実装はスマホの画面サイズで行ってください

## 機能

- TOP ページ
  - ID を入力してボタンを押すと名刺詳細ページに移動
- 新規名刺登録画面
  - 名刺登録フォームを入力してボタンを押すと名刺を登録出来る
  - オプションは入力しなくても登録可能
  - 登録したあとは TOP ページに戻る
- 名刺詳細ページ
  - 登録した名刺の詳細が見れる
  - 各リンクを押すとそのリンク先に移動
- GitHub Actions のクーロンジョブ
  - 毎日 6:00 に前日の users と user_skill テーブルのレコードを削除

## 使用技術

### フロントエンド

- React
- TypeScript
- Vite
- Chakra UI V3

### バックエンド

- Supabase

### インフラ

- Firebase Hosting

### その他

- Jest
- React Testing Library
- GitHub Actions

## セットアップ

```bash
git clone [リポジトリURL]
cd [プロジェクト名]
npm install
npm run dev
```

## 環境変数

```
VITE_SUPABASE_URL=xxxxx
VITE_SUPABASE_ANON_KEY=xxxxx

# バッチ処理で使用
SUPABASE_URL=xxxxx
SUPABASE_ANON_KEY=xxxxx
```

## テスト実行

```bash
make test（npm run test）
```

## バッチファイル実行（前日の users と user_skill テーブルのレコードを削除）

```bash
npm run batch
```

## デプロイ

```bash
make deploy（npm run build && firebase deploy）
```
