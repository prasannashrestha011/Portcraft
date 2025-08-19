import { db } from "@/configs/firebase/firebase";
import { useUserStore } from "@/store/userStore";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { PortfolioMeta } from "../types/firestoreTypes";
import { deleteDocByPath } from "@/configs/firebase/actions/ClientActions";
import { toast } from "react-toastify";
import { LoadingSpinnerTransparent } from "../clientComponents/LoadingSpinner";
import Image from "next/image";
import FileCard from "../clientComponents/Cards/FileCard";
const CodeLists = () => {
  const { user } = useUserStore();

  const userID = user?.uid.toLowerCase();
  const portfoliosRef = userID
    ? collection(db, "users", userID, "portfolios")
    : null;

  const [portfolioMetaList, setPortFolioMetaList] = useState<PortfolioMeta[]>(
    [],
  );
  const notify = (message: string) =>
    toast(message, {
      theme: "dark",
    });
  // meta data list
  const loadMetaList = async () => {
    if (!portfoliosRef) return;
    const snapShots = await getDocs(portfoliosRef);
    const list: PortfolioMeta[] = [];
    if (!snapShots) return;
    snapShots.forEach((doc) => {
      list?.push({
        ...doc.data(),
      } as PortfolioMeta);
    });
    console.log(list);
    setPortFolioMetaList(list);
  };
  useEffect(() => {
    loadMetaList();
  }, [userID]);
  //
  const handleDelete = async (ref: string, fileName: string) => {
    if (!ref) return;
    const isDeleted = await deleteDocByPath(ref);
    if (!isDeleted) {
      notify(`❌ Failed to delete ${fileName}`);
      return;
    }
    notify(`✅ ${fileName} deleted`);
    setPortFolioMetaList((prev) => prev.filter((doc) => doc.ref != ref));
  };
  if (!user) {
    return <div>No code list</div>;
  }
  if (!portfolioMetaList) {
    return <LoadingSpinnerTransparent />;
  }
  if (portfolioMetaList.length === 0) {
    return (
      <div className="text-center text-gray-200 sora-regular mt-10 flex flex-col items-center justify-center ">
        <p>Get started by creating your very first portfolio!</p>
        <Image
          src={"/images/plan.png"}
          alt="plan"
          width={300}
          height={300}
          className="border"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto mt-5 h-[calc(100vh-100px)] overflow-auto pb-8 custom-scrollbar ">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2 justify-items-center  ">
        {portfolioMetaList.map((doc, idx) => (
          <FileCard
            key={idx}
            ref={doc.ref}
            snapshotURL={doc.snapshotURL}
            fileName={doc.fileName}
            createdAt={doc.createdAt}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default CodeLists;
