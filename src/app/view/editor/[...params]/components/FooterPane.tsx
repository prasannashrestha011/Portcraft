import { BezelButton } from "@/app/clientComponents/Buttons/Bezel";
import React from "react";
interface FooterPaneProp {
  isSaved: boolean;
  action: () => void;
  oldCode: string;
  newCode: string;
}
const FooterPane: React.FC<FooterPaneProp> = ({
  newCode,
  oldCode,
  isSaved,
  action,
}) => {
  const removeBlankLines = (str: string) =>
    str
      .split("\n")
      .filter((line) => line.trim() !== "")
      .join("\n");

  if (removeBlankLines(oldCode) === removeBlankLines(newCode)) {
    return <></>;
  }
  return (
    <div className="flex gap-2">
      {!isSaved && <BezelButton onClick={() => action()}>Save</BezelButton>}
    </div>
  );
};

export default FooterPane;
