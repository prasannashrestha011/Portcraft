import {
  BezelButton,
  BezelDeleteButton,
} from "@/app/clientComponents/Buttons/Bezel";
import React from "react";
interface FooterPaneProp {
  isSaved: boolean;
  action: () => void;
  newCode: string;
}
const FooterPane: React.FC<FooterPaneProp> = ({ newCode, isSaved, action }) => {
  console.log(newCode);
  return (
    <div className="flex gap-2">
      <BezelDeleteButton className="mr-2">Cancel</BezelDeleteButton>

      {!isSaved && <BezelButton onClick={() => action()}>Save</BezelButton>}
    </div>
  );
};

export default FooterPane;
