import { Box, Typography } from "@mui/material";
import { FC, ReactElement } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage: FC = (): ReactElement => {
  const error = useRouteError();
  return (
    <>
      {isRouteErrorResponse(error) ? (
        <Box>
          <Typography variant="h1">Oops</Typography>
          <Typography variant="body1">Sorry, an unexpected error has occurred</Typography>
        </Box>
      ) : null}
    </>
  );
};

export default ErrorPage;
