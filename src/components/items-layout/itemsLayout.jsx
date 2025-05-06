import useUpdateDelete from "../../hooks/useUpdateDelete";
import { Data } from "./data/data";
import { DataDropped } from "./data/data-dropped";
import { Signature } from "./signature/signature";
import { Text } from "./text/text";
import { TextDropped } from "./text/text-dropped";

export const ItemsLayout = ({ id, content, setIsResizing }) => {
  const { deleteItem } = useUpdateDelete();

  return (
    <div className="">
      {!id.includes("-") ? (
        id.includes("data") ? (
          <Data dataId={id} />
        ) : id.includes("text") ? (
          <Text textId={id} />
        ) : id.includes("signature") ? (
          <Signature signId={id} />
        ) : ( <div>{id}</div>)
      ) : id.includes("stamp") ? (
        <div className="w-32">
          <button
            onClick={() => deleteItem(id)}
            className="absolute top-1 right-1 text-red-500"
          >
            X
          </button>
          <img src={content} className="w-10 h-10" />
        </div>
      ) : id.includes("data") ? (
        <DataDropped dataId={id} setIsResizing={setIsResizing} />
      ) : (
        <TextDropped textId={id} content={content} />
      )}
    </div>
  );
};
