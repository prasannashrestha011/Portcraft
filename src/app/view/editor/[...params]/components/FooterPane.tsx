import React from "react";
interface FooterPaneProp {
  isSaved: boolean;
  action: () => void;
  newCode: string;
}
const FooterPane: React.FC<FooterPaneProp> = ({ newCode, isSaved, action }) => {
  return (
    <div>
      <button className="bg-red-600 hover:bg-red-400 p-2 rounded-md">
        Cancel
      </button>
      {!isSaved && (
        <button
          onClick={() => action()}
          className={`${
            !newCode ? "bg-green-100" : "bg-green-600"
          }  p-2 rounded-md ${!newCode && "bg-green-300"}`}
          disabled={!newCode}
        >
          Save
        </button>
      )}
    </div>
  );
};

export default FooterPane;
