import React, { useEffect, useState } from "react";
import { CircularProgress, List } from "@material-ui/core";

import { db, IFunds } from "../services/firebase";
import { FundItem } from "./FundItem";

export const FundsList: React.FC = function () {
  const [funds, setFunds] = useState<IFunds | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function observeToFunds() {
      const funds_db = db.ref("funds");

      funds_db.on("value", function (data) {
        setLoading(false);
        setFunds(data.val());
      });
    }

    void observeToFunds();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <>
      {funds && (
        <List aria-label="funds">
          {Object.entries(funds).map(([fund, { name, subfunds }]) => {
            return <FundItem fund_id={fund} name={name} subfunds={subfunds} />;
          })}
        </List>
      )}

      {/*<pre>{JSON.stringify(funds, undefined, 2)}</pre>*/}
    </>
  );
};
