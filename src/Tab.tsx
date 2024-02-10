import React from "react";
import { useParameter } from "@storybook/manager-api";
import { PARAM_KEY } from "./constants";
import { TabContent } from "./components/TabContent";

interface TabProps {
  active: boolean;
}

export function Tab ({ active }: TabProps)  {
  // https://storybook.js.org/docs/react/addons/addons-api#useparameter
  const paramData = useParameter<string>(PARAM_KEY, "");

  return active ? <TabContent code={paramData} /> : null;
};
