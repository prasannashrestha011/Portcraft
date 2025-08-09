import axios from "axios";

export async function FetchCodeFile(path: string): Promise<string> {
  if (!path) return "";
  const url = `${process.env.NEXT_PUBLIC_ROOT_URL}/api/storage?path=${path}`;
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
export async function FetchPublicCodeFile(path: string): Promise<string> {
  if (!path) return "";
  const url = `${process.env.NEXT_PUBLIC_ROOT_URL}/api/storage/public?path=${path}`;
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
