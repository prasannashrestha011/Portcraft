import axios from "axios";
interface ReturnProp {
  status: boolean;
  path: string;
}
export async function SavePortFolioData(
  cleanedHTML: string,
  userID: string,
  fileName = "portfolio.txt"
): Promise<ReturnProp> {
  if (fileName !== "portfolio.txt") {
    return { status: false, path: "" };
  }
  console.log("FILENAME TO BE SVE ", fileName);
  try {
    const formData = new FormData();
    formData.append("fileName", fileName);
    formData.append(
      "file",
      new Blob([cleanedHTML], { type: "text/plain" }),
      "portfolio.html"
    );
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/storage?userID=${userID}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return { status: response.status == 200, path: response.data.path };
  } catch (err) {
    console.error(err);
    return { status: false, path: "" };
  }
}
