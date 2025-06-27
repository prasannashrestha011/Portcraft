import axios from "axios";

export async function SavePortFolioData(
  cleanedHTML: string,
  userID: string,
  fileName = "portfolio.txt"
): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append("fileName", fileName);
    formData.append(
      "file",
      new Blob([cleanedHTML], { type: "text/plain" }),
      "portfolio.html"
    );
    const response = await axios.post(
      `http://localhost:3000/api/storage?userID=${userID}`,
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
