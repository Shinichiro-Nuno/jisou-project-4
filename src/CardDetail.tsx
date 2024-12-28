import { useParams } from "react-router";

type CardParams = {
  id: string;
};

export const CardDetail = () => {
  const { id } = useParams<CardParams>();
  return (
    <>
      <h1>CardDetail</h1>
      <p>id: {id}</p>
    </>
  );
};
