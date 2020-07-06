import React, { ReactNode } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { TreeItem, TreeView } from "@material-ui/lab";

import { IFunds } from "../services/firebase";

export const FundsTree: React.FC<{ funds: IFunds }> = function ({ funds }) {
   // TODO: replace any with a proper type
   const buildTree = function (
      object: Record<string, any>,
      idPrefix?: string
   ): ReactNode {
      return Object.entries(object).map(function (entry) {
         const id = idPrefix ? idPrefix + "-" + entry[0] : entry[0];
         return (
            <TreeItem
               key={entry[0]}
               nodeId={entry[0]}
               label={entry[1].name}
               aria-label={entry[1].name}
            >
               {entry[1].subfunds
                  ? buildTree(entry[1].subfunds, id)
                  : entry[1].share_classes
                  ? buildTree(entry[1].share_classes, id)
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
