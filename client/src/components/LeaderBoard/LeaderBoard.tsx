/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import StyledAvatar from "./StyledAvatar";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ApiRequestOptions, handleApiRequest } from "../../services";
import { AppContext } from "../../store/StoreProvider";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { parseName, parsePositions } from "../../utils/parsePlayerData";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

function LeaderBoard() {
  const { dispatch } = useContext(AppContext);
  const [podium, setPodium] = useState<any[]>([]);
  const [editions, setEditions] = useState<any[]>([]);
  const [editionShown, setEditionShown] = useState(0);

  const players = useMemo(() => {
    const edition = editions.find((edit) => edit.id === editionShown);
    const playerData = Object.keys(edition?.groups || {}).map((key) => [
      key,
      edition.groups[key],
    ]);
    const parsedData = parsePositions(playerData);
    const firstPart = parsedData.slice(0, 3);
    const secondPart = parsedData.slice(3);
    setPodium(firstPart);

    return secondPart;
  }, [editionShown]);

  useEffect(() => {
    const loadEditions = async () => {
      const options: ApiRequestOptions = {
        query: "/api/v1/xtreme",
        method: "GET",
        dispatch,
      };
      const data = await handleApiRequest(options);

      const { error, status, ...editionsData } = data;
      if (error || status !== 200) return;

      const eData = Object.values(editionsData);
      const edition: any = data[0];

      setEditions(eData);
      setEditionShown(edition.id);
    };

    loadEditions();
  }, []);

  const handleEditionChange = (event: SelectChangeEvent) => {
    const id = editions.find(
      (edition) => edition.name === event.target.value
    ).id;

    setEditionShown(id || 0);
  };

  return (
    <>
      {!!editions?.length && (
        <Container sx={{ py: 2 }}>
          <Box sx={{ minWidth: 132 }}>
            <FormControl>
              <InputLabel id="edition-select-label">Editions</InputLabel>
              <Select
                label="Editions"
                id="edition-select"
                labelId="edition-select-label"
                onChange={handleEditionChange}
                inputProps={{ MenuProps: { disableScrollLock: true } }}
                value={
                  editions.find((edition) => edition.id === editionShown).name
                }
              >
                {editions.map(({ id, name }) => (
                  <MenuItem key={id} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Container>
      )}
      <Container sx={{ py: 8 }}>
        {players?.length && podium?.length ? (
          <>
            <Stack
              width="100%"
              direction="row"
              marginBottom={6}
              justifyContent="center"
            >
              <Stack
                gap={2}
                direction="row"
                maxHeight="160px"
                borderRadius="12px"
                position="relative"
              >
                <Item
                  key="silver"
                  elevation={12}
                  sx={{
                    gap: "6px",
                    height: "115px",
                    display: "flex",
                    alignSelf: "end",
                    alignItems: "center",
                    flexDirection: "column",
                    width: { xs: "108px", md: "132px" },
                  }}
                >
                  <Stack
                    sx={{
                      top: "0px",
                      position: "absolute",
                    }}
                  >
                    <StyledAvatar
                      size={56}
                      position={2}
                      color="primary"
                      id={podium[1].id}
                      name={podium[1].name}
                    />
                  </Stack>

                  <Stack p={1} marginTop="auto">
                    <Typography variant="subtitle2">
                      {podium[1].name}
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight="700">
                      {podium[1].score}
                    </Typography>
                    <Typography variant="caption">
                      {parseName(podium[1].team)}
                    </Typography>
                  </Stack>
                </Item>
                <Item
                  key="gold"
                  elevation={24}
                  sx={{
                    gap: "6px",
                    height: "160px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    borderRadius: "30px 30px 4px 4px",
                    width: { xs: "108px", md: "132px" },
                  }}
                >
                  <Stack
                    sx={{
                      top: "-54px",
                      position: "absolute",
                    }}
                  >
                    <StyledAvatar
                      size={64}
                      position={1}
                      color="success"
                      id={podium[0].id}
                      name={podium[0].name}
                    />
                  </Stack>
                  <Stack
                    p={1}
                    mt="20px"
                    height="100%"
                    justifyContent="space-between"
                  >
                    <Typography variant="subtitle2">
                      {podium[0].name}
                    </Typography>
                    <Typography variant="h5" color="#2e7d32" fontWeight="700">
                      {podium[0].score}
                    </Typography>
                    <Typography variant="caption">
                      {parseName(podium[0].team)}
                    </Typography>
                  </Stack>
                </Item>
                <Item
                  key="bronze"
                  elevation={12}
                  sx={{
                    gap: "6px",
                    height: "115px",
                    display: "flex",
                    alignSelf: "end",
                    alignItems: "center",
                    flexDirection: "column",
                    width: { xs: "108px", md: "132px" },
                  }}
                >
                  <Stack
                    sx={{
                      top: "8px",
                      position: "absolute",
                    }}
                  >
                    <StyledAvatar
                      size={48}
                      position={3}
                      color="warning"
                      id={podium[2].id}
                      name={podium[2].name}
                    />
                  </Stack>
                  <Stack marginTop="auto">
                    <Typography variant="subtitle2">
                      {podium[2].name}
                    </Typography>
                    <Typography variant="h6" color="#ed6c02" fontWeight="700">
                      {podium[2].score}
                    </Typography>
                    <Typography variant="caption">
                      {parseName(podium[2].team)}
                    </Typography>
                  </Stack>
                </Item>
              </Stack>
            </Stack>

            <Stack spacing={{ xs: 1, sm: 2, md: 3 }}>
              {(players || []).map((playerData: any) => {
                const { id, name, team, score, iconData, position } =
                  playerData;

                return (
                  <Item
                    key={id}
                    elevation={3}
                    sx={{ display: "flex", gap: "16px" }}
                  >
                    <StyledAvatar
                      id={id}
                      size={48}
                      name={name}
                      color="secondary"
                      position={position}
                    />

                    <Stack width="100%">
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="subtitle2">{name}</Typography>

                        <Stack
                          direction="row"
                          justifyContent="center"
                          minWidth="30px"
                        >
                          <Typography variant="subtitle2">{score}</Typography>
                        </Stack>
                      </Stack>

                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption">{team}</Typography>

                        <Stack
                          direction="row"
                          justifyContent="center"
                          minWidth="30px"
                        >
                          {!iconData.down ? (
                            <ArrowDropUpIcon color={iconData.color} />
                          ) : (
                            <ArrowDropDownIcon color={iconData.color} />
                          )}
                        </Stack>
                      </Stack>
                    </Stack>
                  </Item>
                );
              })}
            </Stack>
          </>
        ) : (
          <Stack width="100%" alignItems="center">
            <Stack sx={{ width: 300 }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Stack>
          </Stack>
        )}
      </Container>{" "}
    </>
  );
}

export default LeaderBoard;
