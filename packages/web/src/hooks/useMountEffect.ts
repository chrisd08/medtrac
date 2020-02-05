import { EffectCallback, useEffect } from "react";

export default (callback: EffectCallback): void => useEffect(callback, []);
