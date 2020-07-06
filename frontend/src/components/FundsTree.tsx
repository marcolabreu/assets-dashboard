import React, { ReactNode, useEffect, useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { TreeItem, TreeView } from "@material-ui/lab";

import { db, IFunds } from "../services/firebase";
import { Loading } from "./Loading";

export const FundsTree: React.FC = function () {
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

   // TODO: replace any with proper typing
   const buildTree = function (object: Record<string, any>): ReactNode {
      return Object.entries(object).map(function (node) {
         return (
            <TreeItem key={node[0]} nodeId={node[0]} label={node[1].name}>
               {node[1].subfunds
                  ? buildTree(node[1].subfunds)
                  : node[1].share_classes
                  ? buildTree(node[1].share_classes)
                  : null}
            </TreeItem>
         );
      });
   };

   return (
      <>
         {funds && (
            <TreeView
               defaultCollapseIcon={<ExpandMoreIcon />}
               defaultExpanded={["root"]}
               defaultExpandIcon={<ChevronRightIcon />}
            >
               {buildTree(funds)}
            </TreeView>
         )}

         {/*<pre>{JSON.stringify(funds, undefined, 2)}</pre>*/}
      </>
   );
};
