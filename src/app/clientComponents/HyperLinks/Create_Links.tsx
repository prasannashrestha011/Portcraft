import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoAdd } from "react-icons/io5";

const Create_Links = () => {
  return (
    <>
      <Link href={"/create"} passHref>
        <Button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-blue-700 transition-all duration-200">
          <span>Create Portfolio</span>
          <IoAdd size={14} />
        </Button>
      </Link>
      <Link href={"/resume/create"} passHref>
        <Button className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-green-700 transition-all duration-200">
          <span>Create Resume</span>
          <IoAdd size={14} />
        </Button>
      </Link>
    </>
  );
};

export default Create_Links;
