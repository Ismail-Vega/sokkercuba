import React, {
  useState,
  useContext,
  ChangeEvent,
  MouseEventHandler,
} from "react";
import { enqueueSnackbar } from "notistack";
import { setTeamId, setUser } from "../../store/actions";
import { ApiRequestOptions, handleApiRequest } from "../../services";
import { AppContext } from "../../store/StoreProvider";
import { validateUpdateData } from "../../utils/validateUpdateData";

import { Box } from "@mui/material/";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { User } from "../../types/user";

export const TeamForm: React.FC = () => {
  const { dispatch } = useContext(AppContext);
  const [teamData, setTeamData] = useState<string>("");

  const handleSave = (event: ChangeEvent<HTMLInputElement>) => {
    setTeamData(event.target.value as string);
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    const validData = validateUpdateData(teamData, "user") as User | null;

    if (validData) {
      const options: ApiRequestOptions = {
        query: "/api/v1/teams",
        method: "POST",
        dispatch,
        body: validData,
      };

      const result = await handleApiRequest(options);

      const { status, success } = result;

      if (success && status === 200) {
        setTeamData("");
        setTeamId(dispatch, validData.team?.id);
        setUser(dispatch, { ...validData });

        enqueueSnackbar(
          `You have successfully created your ${validData.team.name} data into our database`,
          { variant: "success" }
        );
      }
    } else {
      enqueueSnackbar(
        `Data validation failed, please verify it is a valid sokker user data object`,
        { variant: "error" }
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AddCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add your team data here:
        </Typography>

        <Box sx={{ mt: 1, width: "100%" }}>
          <FormControl fullWidth>
            <TextField
              required
              fullWidth
              autoFocus
              id="json-input"
              name="update"
              margin="normal"
              label="Paste here"
              value={teamData}
              onChange={handleSave}
            />
          </FormControl>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
