import { Route, Routes } from "react-router";
import { CardList } from "./CardList";
import { CardDetail } from "./CardDetail";
import { supabase } from "./lib/supabase";

function App() {
  const testConnection = async () => {
    const { data, error } = await supabase.auth.getSession();
    console.log("接続テスト", { data, error });
  };

  testConnection();

  return (
    <>
      <Routes>
        <Route path="/" element={<CardList />} />
        <Route path="/cards/:id" element={<CardDetail />} />
      </Routes>
    </>
  );
}

export default App;
