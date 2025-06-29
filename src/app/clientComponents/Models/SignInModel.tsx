import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { OauthSignInMethod } from "@/utility/OauthAction";
import { useUserStore } from "@/store/userStore";
import { FcGoogle } from "react-icons/fc";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  bgcolor: "white",
  alignItems: "center",
  justifyContent: "center",
  gap: 3,
  p: 4,
  borderRadius: "0.5rem",
};
interface ModelProp {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function SignInModel({ open, setOpen }: ModelProp) {
  const handleClose = () => setOpen(false);
  const { setUser } = useUserStore();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography sx={{ color: "black" }}>
              Sign In required to save the code
            </Typography>
            <Typography
              id="transition-modal-description"
              className="border border-gray-300 rounded-md"
            >
              <Button
                className="flex gap-4 "
                onClick={() => OauthSignInMethod({ setUser })}
              >
                <FcGoogle size={28} />
                Sign In with Google
              </Button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
