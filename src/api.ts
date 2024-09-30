import axios from "axios";

const API_KEY = process.env.API_KEY ?? "";

export const getMultiTokensPrice = async (tokens: string[]) => {
  const res = await axios
    .get(
      `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${tokens.join(
        ","
      )}&tsyms=USD&api_key=${API_KEY}`
    )
    .then((res) => res.data)
    .catch((e) => {
      console.error(e);
      return {};
    });
  return res;
};
