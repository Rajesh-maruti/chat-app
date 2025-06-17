import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { ReactNode } from "react";

const CardView = (props: { children: ReactNode }) => {
  return (
    <Box
      height="100vh"
      display="flex"
      position="fixed"
      width="calc(100vw - 64px)"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      px={4}
      style={{
        background:
          "linear-gradient(135deg, rgb(84 134 210),  rgb(239 120 120))",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fffefe",
        }}
        boxShadow={{ xs: 0, md: 3 }}
        p={1}
        maxWidth="400px"
        borderRadius={2}
        py={4}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          {props.children}
        </CardContent>
      </Box>
    </Box>
  );
};

export default CardView;
