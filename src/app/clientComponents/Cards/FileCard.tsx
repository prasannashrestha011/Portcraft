import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import moment from "moment";
import Link from "next/link";
import { BezelButton, BezelDeleteButton } from "../Buttons/Bezel";
import { Pen, Trash } from "lucide-react";
interface MediaProp {
  fileName: string;
  fileURL?: string;
  snapshotURL: string;
  createdAt: Date;
  ref: string;
  onDelete: (ref: string, fileName: string) => void;
}
export default function FileCard({
  fileName,
  snapshotURL,
  createdAt,
  ref,
  onDelete,
}: MediaProp) {
  return (
    <Card
      sx={{
        maxWidth: 290,
        bgcolor: "#1a1a1a",
        border: "1px solid #333",
        borderRadius: 2,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
          borderColor: "#555",
          p: 0,
          m: 0,
        },
      }}
    >
      <CardContent className="flex flex-col justify-center items-start">
        <Typography>
          <img
            src={snapshotURL || "https://placehold.co/600x400?text=No+Preview"}
            className="w-full"
          />
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: "#ffffff",
            fontWeight: 500,
            fontSize: "1rem",
            lineHeight: 1.3,
            mb: 1,
          }}
        >
          {fileName}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#888",
            fontSize: "0.85rem",
          }}
        >
          Edited {moment.utc(createdAt).fromNow()}
        </Typography>
      </CardContent>
      <CardActions sx={{ pt: 0, pb: 2, px: 2 }}>
        <Link href={`/view/editor/${ref}`} passHref>
          <BezelButton className="py-2 px-3 text-xs font-bold ">
            <Pen size={12} />
            <span>Edit</span>
          </BezelButton>
        </Link>
        <BezelDeleteButton onClick={() => onDelete(ref, fileName)}>
          <Trash size={12} />
          <span>Delete</span>
        </BezelDeleteButton>
        <Link
          href={`/view/${ref}`}
          passHref
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Preview
        </Link>
      </CardActions>
    </Card>
  );
}
