import { Box } from "@mui/material/";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

const AppFallback = () => (
  <Stack spacing={1}>
    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="circular" width={40} height={40} />
    </Box>
    <Skeleton variant="rectangular" width={210} height={60} />
    <Skeleton variant="rounded" width={210} height={60} />
  </Stack>
);

export default AppFallback;
