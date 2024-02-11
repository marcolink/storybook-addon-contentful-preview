import {addons} from "@storybook/manager-api";
import {ADDON_ID, ADDON_NAME, PANEL_ID} from "./constants";
import {Addon_TypesEnum} from "@storybook/types";
import {Panel} from "./Panel";

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: Addon_TypesEnum.PANEL,
    title: ADDON_NAME,
    match: ({viewMode}) => viewMode === "story",
    render: Panel,
  });
});
