import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import "react-phone-input-2/lib/style.css";
import LoginIcon from "@mui/icons-material/Login";
import PhoneNumberInput from "../../components/shared/PhoneNumberInput";
import { Link, useNavigate } from "react-router";
import CardView from "../../Layout/CardView";
import { manageUser } from "../../functions/firebase/manageUser";
import toast from "../../functions/toast";
import { phoneNumberFunctions } from "../../functions/firebase/phoneNumberFunctions";
import TextRender from "../../components/shared/TextRender";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const loadingComlpetes = () => {
    setIsLoading(false);
  };

  const handleSuccessOtp = async () => {
    loadingComlpetes();
    navigate(`/otp`);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const isExistedUser = await manageUser.phoneNumberExist(`91${phoneNumber}`);
    if (!isExistedUser) {
      toast.error("User not registered! Please signup.");
      setIsLoading(false);
      return;
    }
    phoneNumberFunctions.invisbleCaptcha("signInButton");
    phoneNumberFunctions.sendCodeToUserPhone(
      "+91" + phoneNumber,
      handleSuccessOtp,
      loadingComlpetes
    );
  };
  return (
    <CardView>
      <TextRender text="Login to your account!" />
      <PhoneNumberInput value={phoneNumber} onChange={setPhoneNumber} />
      <Box width="100%" py={3}>
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: "100%", fontWeight: "bold", fontSize: "16px" }}
          onClick={handleSubmit}
          loading={loading}
          disabled={phoneNumber.length !== 10}
          id="signInButton"
        >
          Login <LoginIcon />
        </Button>
      </Box>
      <Box>
        <TextRender
          variant="body2"
          text="Dont have an account?"
          color="textPrimary"
          fontWeight="normal"
        />
        <Typography
          py={1}
          variant="body2"
          color="text.secondary"
          width="100%"
          display="flex"
          justifyContent="center"
          fontWeight="bold"
        >
          <Link to="/sign-up">
            <Button color="secondary">
              <TextRender variant="body2" text="Sign Up" />
            </Button>
          </Link>
        </Typography>
      </Box>
    </CardView>
  );
};

export default Login;
