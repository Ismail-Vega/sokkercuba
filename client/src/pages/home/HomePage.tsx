import { useContext } from "react";
import { AppContext } from "../../store/StoreProvider";
import { TeamHero, TeamForm } from "../../components/Team";

export const HomePage = () => {
  const { state } = useContext(AppContext);
  const { user, loggedIn } = state;

  if (!loggedIn) return <>Home Page welcome!</>;
  if (user) return <TeamHero {...user} />;

  return <TeamForm />;
};
