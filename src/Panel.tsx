import React from "react";
import {AddonPanel} from "@storybook/components";
import {PanelContent} from "./components/PanelContent";

interface PanelProps {
  active: boolean;
}

export function Panel(props: PanelProps) {
  return (
    <AddonPanel {...props}>
      <PanelContent/>
    </AddonPanel>
  );
};
