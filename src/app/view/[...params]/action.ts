import axios from "axios";

export async function FetchCodeFile(path: string): Promise<string> {
  if (!path) return "";
  const url = `http://localhost:3000/api/storage?path=${path}`;
  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error("Request failed");
    }
    const codeContent = response.data.message;
    return codeContent;
  } catch (err) {
    console.error(err);
    return "";
  }
}
