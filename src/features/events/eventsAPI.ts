import axios from "axios";

export async function getAccesTokenAPI() {
  const result = await axios.post(
    "https://api.arenaracingcompany.co.uk/auth",
    {},
    {
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_ARC_TOKEN,
      },
    }
  );
  return result.data;
}

export async function getEventsDataAPI(month: number, accessToken: string) {
  const result = await axios.get(
    "https://api.arenaracingcompany.co.uk/event/month/1318/" + month,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );
  return result.data;
}
