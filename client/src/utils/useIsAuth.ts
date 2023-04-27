import { useMeQuery } from "../generated/graphql";

import { useNavigate } from "react-router-dom";
import { Pages } from "../routes.js";
import { useEffect } from "react";

export const useIsAuth = () => {
  const navigate = useNavigate();
  const [{ data, fetching }] = useMeQuery();

  useEffect(() => {
    // Check if data is getting fetched and when fetched checking if user object is there or not, for login check.
    if (!fetching && !data?.me) {
      navigate(Pages.LOGIN);
    }
  }, [data, fetching]);
};
