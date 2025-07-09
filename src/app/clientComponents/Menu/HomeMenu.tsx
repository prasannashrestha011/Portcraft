import { SignOut } from "@/app/login/actions";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaAngleDown } from "react-icons/fa";
interface MenuProp {
  username: string;
  photoURL: string;
}
export function HomeMenu({ username, photoURL }: MenuProp) {
  return (
    <div>
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md outline-none ml-2 hover:bg-gray-800 p-2">
          <img src={photoURL} className="w-6 rounded-full " />
          <span className="sora-regular text-sm">{username}</span>
          <FaAngleDown />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-md border border-white/5 p-3 text-sm/6 text-white transition duration-100 ease-out  focus:outline-none bg-[#121212]"
        >
          <MenuItem>
            <SignOut />
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
