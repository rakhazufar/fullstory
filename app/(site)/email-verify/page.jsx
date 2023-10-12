"use client";

import { Button, Typography, Paper } from "@mui/material";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import sendEmailVerify from "@libs/createActiveToken";

const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ConfirmationContainer = styled(Paper)`
  width: 80%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const EmailConfirmation = () => {
  const { data: session } = useSession();
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    console.log(session);
    if (session?.user.emailVerified) {
      redirect("/");
    }

    if (session?.user) {
      setUserEmail(session.user.email);
    }
    if (session?.user) {
      sendEmailVerify(session?.user.email, session?.user.id);
    }
  }, [session]);
  return (
    <CenteredWrapper>
      <ConfirmationContainer elevation={3}>
        <Typography variant="h5" align="center">
          Email Confirmation
        </Typography>
        <Typography variant="body1" align="center">
          We have sent email to {userEmail} to confirm the validity of our email
          address. After receiving the email follow the link provided to
          complete you registration.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Resend confirmation mail
        </Button>
      </ConfirmationContainer>
    </CenteredWrapper>
  );
};

export default EmailConfirmation;
