import { firestore } from "@/configs/firebase/firebase";
import { useUserStore } from "@/store/userStore";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { PortfolioMeta } from "../types/firestoreTypes";
import FileCard from "../clientComponents/Cards/FileCard";
const CodeLists = () => {
  const { user } = useUserStore();

  const userID = user?.uid;
  const portfoliosRef = userID
    ? collection(firestore, "users", userID, "portfolios")
    : null;

  const [portfolioMetaList, setPortFolioMetaList] = useState<PortfolioMeta[]>(
    []
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
            fileName={doc.fileName.split("_")[0]}
            createdAt={doc.createdAt}
          />
        ))}
      </ul>
    </div>
  );
};

export default CodeLists;
