import { FireStoreAdminActions } from "../firebase/actions/AdminAction";
import DropBoxClass from "./config";
import { DropBoxResult } from "./type";
export async function ReadFiles(path: string): Promise<string> {
  if (!path) {
    console.log("Path not provided");
    return "";
  }
  try {
    const dbx = DropBoxClass.Init();
    const response = await dbx.filesDownload({ path });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = response.result as any;
    const blob = result.fileBinary;
    const text = Buffer.from(blob).toString("utf-8");
    return text;
  } catch (err) {
    console.log(err);
    return "";
  }
}
export async function UploadFiles(
  userID: string,
  fileName: string,
  fileContent: string
): Promise<DropBoxResult> {
  try {
    const dbx = DropBoxClass.Init();
    const timestampRegex = /_\d{13}\.txt$/;
    const uniqueId = timestampRegex.test(fileName)
      ? fileName
      : `${fileName}_${Date.now()}.txt`;
    const response = await dbx.filesUpload({
      path: `/users/${userID}/portfolios/${uniqueId}`,
      contents: fileContent,
      mode: { ".tag": "overwrite" },
    });
    const { name, path_lower } = response.result;
    const result: DropBoxResult = {
      name: name,
      lower_path: path_lower!,
    };
    await FireStoreAdminActions.UploadFileRefs(
      userID,
      uniqueId,
      fileName,
      path_lower!
    );
    return Promise.resolve(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err && typeof err === "object") {
      console.error("Error message:", err.message);

      if ("error" in err && err.error && typeof err.error === "object") {
        console.error("Dropbox error summary:", err.error.error_summary);
        console.error("Full error object:", JSON.stringify(err.error, null, 2));
      }
    }
    return Promise.reject(null);
  }
}
//uploading user's profile image
export async function UploadImageFile(
  fullPath: string,
  fileContent: Buffer
): Promise<string> {
  try {
    const dbx = DropBoxClass.Init();

    // 1. Upload (overwrite if exists)
    const response = await dbx.filesUpload({
      path: `${fullPath}.png`,
      contents: fileContent,
      mode: { ".tag": "overwrite" },
    });

    const filePath = response.result.path_lower!;

    let shareableUrl = "";

    // 2. Try to create a shared link
    try {
      const linkResponse = await dbx.sharingCreateSharedLinkWithSettings({
        path: filePath,
        settings: {
          access: { ".tag": "viewer" },
          allow_download: true,
          audience: { ".tag": "public" },
          requested_visibility: { ".tag": "public" },
        },
      });
      shareableUrl = linkResponse.result.url;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // 3. If shared link already exists, fetch it
      if (err?.error?.error_summary?.includes("shared_link_already_exists")) {
        const links = await dbx.sharingListSharedLinks({
          path: filePath,
          direct_only: true,
        });

        if (links.result.links.length > 0) {
          shareableUrl = links.result.links[0].url;
        } else {
          throw new Error("Shared link exists but cannot be retrieved.");
        }
      } else {
        throw err;
      }
    }

    // 4. Convert to raw image display link
    const directDisplayUrl = shareableUrl
      .replace("www.dropbox.com", "dl.dropboxusercontent.com")
      .replace("?dl=0", "");

    return Promise.resolve(directDisplayUrl);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Final Dropbox error:", err?.message);
    return Promise.reject("");
  }
}
