import axios from "axios";

export async function SavePortFolioData(
  cleanedHTML: string,
  userID: string,
  fileName = "portfolio.txt"
): Promise<boolean> {
  if (fileName !== "portfolio.txt") {
    return false;
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
    return response.status == 200;
  } catch (err) {
    console.error(err);
    return false;
  }
}
