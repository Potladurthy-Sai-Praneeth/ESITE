const bcrypt = require("bcryptjs");
import ErrorBoundary from "../userInterface/errorBoundary";
import React from "react";
import { ReactElement } from "react";
export async function confirmLogin(entered, database) {
  let ret = await bcrypt.compare(entered, database);
  return ret;
}

export async function encryptPassword(entered) {
  return await bcrypt.hash(entered, 12);
}

// export async function wrapWithErrorBoundary(
//   rootComponentElement: React.ReactElement<any, any>,
//   opts: AdapterOpts,
//   props: AdapterProps
// ) {
//   if (opts.suppressComponentDidCatchWarning && !atLeastReact16(opts.React)) {
//     return rootComponentElement;
//   }

//   const proto = rootComponentElement.type.prototype;

//   if (proto.componentDidCatch) {
//     return rootComponentElement;
//   }

//   const errorHandler = props.errorHandler;

//   if (typeof errorHandler !== "function") {
//     throw new Error(
//       `single-spa-react: an error handler for react application '${props.name}' is not a function`
//     );
//   }

//   return (
//     <ErrorBoundary onError={errorHandler}>{rootComponentElement}</ErrorBoundary>
//   );
// }
