import { isEmpty, omit } from "lodash/fp";
import { dataMachine } from "./dataMachine";
import { httpClient } from "../utils/asyncUtils";
import { backendPort } from "../utils/portUtils";

export const publicTransactionsMachineLimited = dataMachine("publicTransactions").withConfig({
  services: {
    fetchData: async (ctx, event: any) => {
      const payload = omit("type", event);
      const resp = await httpClient.get(`http://localhost:${backendPort}/transactions/public?limit=1`, {
        params: !isEmpty(payload) ? payload : undefined,
      });
      return resp.data;
    },
  },
});
