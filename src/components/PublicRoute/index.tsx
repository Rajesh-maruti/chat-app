import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router";

const PublicRoute = (props: { children: ReactNode }) => {
  const navigator = useNavigate();
  const loginData = useSelector((state: RootState) => state.login.value);

  useEffect(() => {
    const tokenExpireIn = Number(
      loginData?.user?.stsTokenManager?.expirationTime
    );
    const idToken = loginData?._tokenResponse?.idToken;

    if (idToken && tokenExpireIn && tokenExpireIn > Date.now()) {
      navigator("/chat");
    }
  }, [navigator, loginData]);
  // If the user is already logged in, redirect to the chat page
  // If the user is not logged in, allow access to the public route
  return <>{props.children}</>;
};

export default PublicRoute;
