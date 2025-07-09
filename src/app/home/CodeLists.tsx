import { db } from "@/configs/firebase/firebase";
import { useUserStore } from "@/store/userStore";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { PortfolioMeta } from "../types/firestoreTypes";
import FileCard from "../clientComponents/Cards/FileCard";
import { deleteDocByPath } from "@/configs/firebase/actions/ClientActions";
const CodeLists = () => {
  const { user } = useUserStore();

  const userID = user?.uid.toLowerCase();
  const portfoliosRef = userID
    ? collection(db, "users", userID, "portfolios")
    : null;

  const [portfolioMetaList, setPortFolioMetaList] = useState<PortfolioMeta[]>(
    [],
  );
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
  const handleDelete = async (ref: string) => {
    if (!ref) return;
    await deleteDocByPath(ref);
    setPortFolioMetaList((prev) => prev.filter((doc) => doc.ref != ref));
  };
  useEffect(() => {
    loadMetaList();
  }, [user]);
  if (!user) {
    return <div>No code list</div>;
  }
  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 mx-auto w-10/12   p-2 ">
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
