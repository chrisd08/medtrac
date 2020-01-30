import React from "react";

export function createCtx<A>(): [() => A, React.Provider<A | undefined>] {
  const ctx = React.createContext<A | undefined>(undefined);
  function useCtx(): A {
    const c = React.useContext(ctx);
    if (!c) throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useCtx, ctx.Provider];
}
