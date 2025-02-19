import { Modal, Stack } from "@mui/material";

export default function BasicModal(props) {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      sx={{
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        alignItems: "center",
        justifyContent: "center",
        height: "100dvh",
        display: "flex",
        width: "100vw",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          p: { xs: 1, md: 2 },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {props.children}
      </Stack>
    </Modal>
  );
}
