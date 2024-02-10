import {addons} from "@storybook/manager-api";
import {ADDON_ID, ADDON_NAME, PANEL_ID} from "./constants";
import {Addon_TypesEnum} from "@storybook/types";
import {Panel} from "./Panel";

/**
 * Note: if you want to use JSX in this file, rename it to `manager.tsx`
 * and update the entry prop in tsup.config.ts to use "src/manager.tsx",
 */

// Register the addon
addons.register(ADDON_ID, () => {
  // Register the tool
  // addons.add(TOOL_ID, {
  //   type: types.TOOL,
  //   title: ADDON_NAME,
  //   match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
  //   render: Tool,
  // });
  //
  // // Register the panel
  addons.add(PANEL_ID, {
    type: Addon_TypesEnum.PANEL,
    title:ADDON_NAME,
    match: ({ viewMode }) => viewMode === "story",
    render: Panel,
  });

  // Register the tab
  // addons.add(TAB_ID, {
  //   type: Addon_TypesEnum.TAB ,
  //   title: ADDON_NAME,
  //   //👇 Checks the current route for the story
  //   route: ({ storyId }) => `/${ADDON_ROUTE}/${storyId}`,
  //   //👇 Shows the Tab UI element in myaddon view mode
  //   match: ({ viewMode }) => viewMode === ADDON_ROUTE,
  //   render: Tab,
  // });
});
