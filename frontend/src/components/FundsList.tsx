import React, { useEffect, useState } from "react";
import { List } from "@material-ui/core";

import { db, IFunds } from "../services/firebase";
import { FundItem } from "./FundItem";
import { Loading } from "./Loading";

export const FundsList: React.FC = function () {
  const [loading, setLoading] = useState(true);
  const [funds, setFunds] = useState<IFunds | undefined>(undefined);

  useEffect(() => {
    function observeFunds() {
      const funds_db = db.ref("funds");

      funds_db.on("value", function (dataSnapshot) {
        const data: IFunds = dataSnapshot.val();

        setLoading(false);
        setFunds(data);
      });
    }

    void observeFunds();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      {funds && (
        <List aria-label="funds">
          {Object.entries(funds).map(([fund_id, { name, subfunds }]) => {
            return (
              <FundItem
                key={fund_id}
                fund_id={fund_id}
                name={name}
                subfunds={subfunds}
              />
            );
          })}
        </List>
      )}

      {/*<pre>{JSON.stringify(funds, undefined, 2)}</pre>*/}
    </>
  );
};
