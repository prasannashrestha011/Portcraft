import axios from "axios";
interface ReturnProp {
  status: boolean;
  path: string;
}
export async function SavePortFolioData(
  cleanedHTML: string,
  userID: string,
  filePath: string = "defaultfilepath.txt",
  fileName: string = "portfolio.txt",
): Promise<ReturnProp> {
  try {
    console.log("NEW CODE ", cleanedHTML);
    const formData = new FormData();
    formData.append("fileName", fileName);
    formData.append("filePath", filePath);
    formData.append("file", new Blob([cleanedHTML], { type: "text/plain" }));
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/storage?userID=${userID}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    console.log(response.data);
    return { status: response.status == 200, path: response.data.path };
  } catch (err) {
    console.error(err);
    return { status: false, path: "" };
  }
}
