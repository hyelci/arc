import axios from "axios";

export async function getAccesTokenAPI() {
  const result = await axios.post(
    "https://api.arenaracingcompany.co.uk/auth",
    {},
    {
      headers: {
        Authorization: "Bearer 264c77f740cc1f02cac8f0a7e30ccdcd2f20dcf5",
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
