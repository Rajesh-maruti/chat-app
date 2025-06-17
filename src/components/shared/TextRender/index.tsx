import { SxProps, Theme, Typography } from "@mui/material";
import { ReactNode } from "react";

const TextRender = (props: {
  style?: SxProps<Theme> | undefined;
  text: ReactNode | string;
  variant?: "h5" | "h6" | "body1" | "body2";
  color?: "primary" | "secondary" | "textPrimary" | "textSecondary";
  fontWeight?: "normal" | "bold" | "bolder" | "lighter";
  pb?: number;
}) => {
  return (
    <Typography
      pb={props.pb}
      textAlign="center"
      variant={props.variant || "h5"}
      color={props.color || "secondary"}
      fontWeight={props.fontWeight || "bold"} // Default to bold
      sx={{
        textShadow: "2px 2px 5px rgba(106, 45, 45, 0.2)",
        opacity: 0.9,
        ...props.style,
      }}
    >
      {props.text}
    </Typography>
  );
};

export default TextRender;
