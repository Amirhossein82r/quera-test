import { Fetch } from "../fetch";
import { FetchResult, HeadersInterface } from "../fetch.interface";
import config from "../../services/config.json";

const GetUser = async (id: string): Promise<FetchResult | undefined> => {
  try {
    const url: string = `${config.api_v1}/users/${id}`;
    const metaData: HeadersInterface = {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    const result: FetchResult = await Fetch(url, metaData);
    return result;
  } catch (error) {
    console.log("Error", error);
  }
};

export default GetUser;
