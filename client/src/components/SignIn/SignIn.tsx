import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Box } from "@mui/material/";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Navigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { ApiRequestOptions, handleApiRequest } from "../../services";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import { AppContext } from "../../store/StoreProvider";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import {
  setAll,
  setErrorMsg,
  setLogin,
  setTeamId,
  setUser,
  setUsername,
} from "../../store/actions";
import FormControlLabel from "@mui/material/FormControlLabel";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function SignIn() {
  const { state, dispatch } = useContext(AppContext);
  const { loggedIn } = state;
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (loggedIn) return <Navigate to="/" />;

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const options: ApiRequestOptions = {
      query: "/api/auth/login",
      method: "POST",
      dispatch,
      body: {
        email,
        password,
      },
    };

    const response = await handleApiRequest(options);

    const { success, teamId, accessToken, status } = response;
    if (status !== 200 || !success) return;

    setLogin(dispatch, true);
    setUsername(dispatch, email);

    if (teamId && accessToken) {
      setTeamId(dispatch, teamId);

      const teamReqOptions: ApiRequestOptions = {
        query: `/api/v1/teams/${teamId}`,
        method: "GET",
        dispatch,
        headers: { authorization: `Bearer ${accessToken}` },
      };

      const { data, success: successReq } = await handleApiRequest(
        teamReqOptions
      );

      if (data && successReq) {
        setUser(dispatch, { ...data });
      }
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: "100%" }}
        >
          <FormControl fullWidth>
            <TextField
              required
              fullWidth
              autoFocus
              id="email"
              name="email"
              margin="normal"
              label="Email"
              autoComplete="Email"
              inputProps={{
                type: "email",
              }}
            />

            <TextField
              required
              fullWidth
              id="password"
              margin="normal"
              name="password"
              label="Password"
              autoComplete="password"
              type={showPassword ? "text" : "password"}
              sx={{ backgroundColor: "rgb(232,240,254)" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              label="Remember me"
              control={
                <Checkbox
                  color="primary"
                  checked={checked}
                  onChange={handleChange}
                />
              }
            />
          </FormControl>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
        <Grid container>
          <Grid item typography="body2">
            Don't have an account?{" "}
            <Link
              variant="body1"
              component="button"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
