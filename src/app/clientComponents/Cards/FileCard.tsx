import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import moment from "moment";
import Link from "next/link";
interface MediaProp {
  fileName: string;
  fileURL?: string;
  snapshotURL: string;
  createdAt: Date;
  ref: string;
  onDelete: (ref: string) => void;
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
        maxWidth: 345,
        bgcolor: "#1a1a1a",
        border: "1px solid #333",
        borderRadius: 2,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
          borderColor: "#555",
        },
      }}
    >
      <CardContent
        sx={{ pb: 1 }}
        className="flex flex-col justify-center items-center"
      >
        <Typography>
          <img
            src={snapshotURL || "https://placehold.co/600x400?text=No+Preview"}
            className="w-64"
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
          {moment.utc(createdAt).fromNow()}
        </Typography>
      </CardContent>
      <CardActions sx={{ pt: 0, pb: 2, px: 2 }}>
        <Link href={`/view/editor/${ref}`} passHref>
          <Button
            size="small"
            sx={{
              color: "#60a5fa",
              textTransform: "none",
              fontSize: "0.875rem",
              "&:hover": {
                bgcolor: "rgba(96, 165, 250, 0.1)",
                color: "#93c5fd",
              },
            }}
          >
            Edit
          </Button>
        </Link>
        <Link href={`/view/${ref}`} passHref>
          <Button
            size="small"
            sx={{
              color: "#60a5fa",
              textTransform: "none",
              fontSize: "0.875rem",
              "&:hover": {
                bgcolor: "rgba(96, 165, 250, 0.1)",
                color: "#93c5fd",
              },
            }}
          >
            Preview
          </Button>
        </Link>

        <Button onClick={() => onDelete(ref)}>Delete</Button>
      </CardActions>
    </Card>
  );
}
