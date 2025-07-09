import { BezelButton } from "@shadeui/ui";
import React from "react";
interface FooterPaneProp {
  isSaved: boolean;
  action: () => void;
  newCode: string;
}
const FooterPane: React.FC<FooterPaneProp> = ({ newCode, isSaved, action }) => {
  return (
    <div>
      <BezelButton label="Cancel" color="danger" className="mr-2" />

      {!isSaved && (
        <BezelButton
          label="Save"
          onClick={() => action()}
          disabled={!newCode}
        />
      )}
    </div>
  );
};

export default FooterPane;
