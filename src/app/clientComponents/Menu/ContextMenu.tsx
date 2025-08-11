import React from "react";
import { Menu, Item, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

const MENU_ID = "my_context_menu";

export default function ParticipantActionContextMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    show({ event: event.nativeEvent });
  };

  return (
    <div onContextMenu={handleContextMenu}>
      {children}

      <Menu
        id={MENU_ID}
        className="!p-0 min-w-[60px]"
        style={{ width: "60px" }}
      >
        <Item
          className=" !py-0 text-xs whitespace-nowrap "
          onClick={() => alert("Clicked Remove")}
        >
          Remove
        </Item>
      </Menu>
    </div>
  );
}
