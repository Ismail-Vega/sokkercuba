import { ChangeEvent, MouseEventHandler, useContext, useState } from "react";
import { Box } from "@mui/material/";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { enqueueSnackbar } from "notistack";
import { setAll } from "../../store/actions";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import { AppContext } from "../../store/StoreProvider";
import { updateTypes } from "../../constants/updateTypes";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { validateUpdateData } from "../../utils/validateUpdateData";
import { ApiRequestOptions, handleApiRequest } from "../../services";

export default function UpdatePage() {
  const { state, dispatch } = useContext(AppContext);
  const { teamId, username } = state;
  const [value, setValue] = useState("");
  const [updateType, setUpdateType] = useState("all");

  const handleChange = (event: SelectChangeEvent) => {
    setUpdateType(event.target.value as string);
  };

  const handleSave = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as string);
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    const isAll = updateType === "all";
    const validData = validateUpdateData(value, updateType);
    const type = isAll ? username : updateType;

    if (validData) {
      const body = isAll ? validData : { [updateType]: validData };

      const options: ApiRequestOptions = {
        query: `/api/v1/users/${username}`,
        method: "POST",
        dispatch,
        body: {},
      };

      if (isAll) {
        const { cweek, user, players } = validData;

        const userPromise = handleApiRequest({
          ...options,
          method: "PATCH",
          query: `/api/v1/teams/${teamId ?? user?.team?.id}`,
        });

        const cweekPromise = handleApiRequest({
          ...options,
          query: `/api/v1/players/:id/reports`,
        });
        const playersPromise = handleApiRequest({ ...options });
      }

      const result = await handleApiRequest(options);

      const { error, status, ...rest } = result;

      if (error || status !== 200) return;

      setValue("");
      setAll(dispatch, { ...rest });

      enqueueSnackbar(
        `You have successfully updated your ${type} data into our database`,
        { variant: "success" }
      );
    } else {
      enqueueSnackbar(
        `Data validation failed, please verify it is a valid ${type} data object`,
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
          <SaveIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update your data
        </Typography>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel id="update-select-label">Select type</InputLabel>
          <Select
            value={updateType}
            id="update-select"
            label="Update type"
            onChange={handleChange}
            labelId="update-select-label"
          >
            {Object.keys(updateTypes).map((name) => (
              <MenuItem value={name} key={name}>
                {updateTypes[name as keyof typeof updateTypes]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
              value={value}
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
}
