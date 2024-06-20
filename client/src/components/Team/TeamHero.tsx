import { Box } from "@mui/material/";
import Avatar from "@mui/material/Avatar";
import { User } from "../../types/user";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import emblem from "../../images/team_emblem.webp";

export const TeamHero = (props: User) => {
  return (
    <Container>
      <Box display="flex" alignItems="center" justifyContent="center" p={2}>
        <Avatar
          src={emblem}
          alt={props.name}
          style={{ width: 100, height: 100 }}
        />
        <Box ml={3}>
          <Typography variant="h3" component="h1">
            {props.name}
          </Typography>
          <Typography variant="body1">
            Country: {props.team.country.name}
          </Typography>
          <Typography variant="body1">Rank: {props.team.rank}</Typography>
        </Box>
      </Box>
      <Box p={2}>
        <Typography variant="h6">Today's Info</Typography>
        <Typography variant="body1">
          Season: {props.today.season}, Week: {props.today.week}, Day:{" "}
          {props.today.day}
        </Typography>
        <Typography variant="body1">Date: {props.today.date.value}</Typography>
      </Box>
    </Container>
  );
};
