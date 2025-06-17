import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import MessageContainer from "../../components/MessageContainer";
import { Box, Typography } from "@mui/material";
import UserContainer from "../../components/UserContainer";
import { useCallback, useEffect } from "react";
import useUpdateOnlineStatus from "../../hooks/useUpdateOnlineStatus";
import useMessageStatus from "../../functions/firebase/useMessageStatus";
import {
  MessageOverviewType,
  setAllMessageStatus,
} from "../../store/reducerSlices/messageStatusSlice";
import { updateActiveUser } from "../../store/reducerSlices/activeUserSlice";

const ChatPage = () => {
  const activeUser = useSelector((state: RootState) => state.activeUser);
  useUpdateOnlineStatus();
  const dispatch = useDispatch();
  const userList = useSelector((state: RootState) => state.userList.value);
  const { getMessageStatus } = useMessageStatus();

  const handleUpdateSttausForAllUsers = useCallback(async () => {
    const messageStatus: { [key: string]: MessageOverviewType } = {};
    const data = (
      await Promise.all(
        userList.map((each) => getMessageStatus(each.phoneNumber))
      )
    ).filter((each) => each);

    data.forEach((each) => {
      messageStatus[each.uid] = each;
    });
    dispatch(setAllMessageStatus(messageStatus));
  }, [dispatch, getMessageStatus, userList]);

  useEffect(() => {
    handleUpdateSttausForAllUsers();
  }, [dispatch, getMessageStatus, handleUpdateSttausForAllUsers, userList]);

  useEffect(() => {
    const handleBack = (e: PopStateEvent) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();
      dispatch(updateActiveUser(null));
    };

    window.addEventListener("popstate", handleBack);
    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [dispatch]);

  return (
    <Box
      height="100%"
      sx={{
        position: { xs: "fixed", md: "relative" },
        top: { xs: "0" },
        left: { xs: "0" },
        right: { xs: "0" },
        bottom: { xs: "0" },
      }}
      width="100%"
      overflow="hidden"
    >
      <Grid container>
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={activeUser.value ? { display: { xs: "none", md: "block" } } : {}}
        >
          <Box
            borderRight="1px solidrgba(240, 240, 240, 0.79)"
            height="100vh"
            position={{ xs: "fixed", md: "unset" }}
            width={{ xs: "100%", md: "unset" }}
            sx={{ backgroundColor: "#f0f0f0" }}
          >
            <UserContainer />
          </Box>
        </Grid>
        <Grid
          size={{ xs: 12, md: 8 }}
          sx={!activeUser.value ? { display: { xs: "none", md: "block" } } : {}}
        >
          {activeUser.value ? (
            <MessageContainer activeUser={activeUser.value} />
          ) : (
            <Box height="100vh" sx={{ display: { xs: "none", md: "block" } }}>
              <Box
                p={0}
                height="50px"
                width="100%"
                sx={{ backgroundColor: "#e7e7e7" }}
              ></Box>
              <Box
                height="calc(100vh - 50px)"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography>Select User to continue on chat.</Typography>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatPage;
