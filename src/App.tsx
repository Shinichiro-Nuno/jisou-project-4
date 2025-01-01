import { Route, Routes } from "react-router";
import { CardList } from "./CardList";
import { CardDetail } from "./CardDetail";
import { supabase } from "./lib/supabase";
import { CardRegister } from "./CardRegister";
import { Toaster } from "./components/ui/toaster";

function App() {
  const testConnection = async () => {
    const { data, error } = await supabase.auth.getSession();
    console.log("接続テスト", { data, error });
  };

  testConnection();

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<CardList />} />
        <Route path="/cards/:id" element={<CardDetail />} />
        <Route path="/cards/register" element={<CardRegister />} />
      </Routes>
    </>
  );
}

export default App;
