import { Button } from "@chakra-ui/react";
import { Route, Routes } from "react-router";
import { CardList } from "./CardList";
import { CardDetail } from "./CardDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CardList />} />
        <Route path="/cards/:id" element={<CardDetail />} />
      </Routes>
      {/* <h1>Hello World</h1> */}
      {/* <Button>Click</Button> */}
    </>
  );
}

export default App;
