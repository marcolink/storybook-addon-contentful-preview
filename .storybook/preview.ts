import type {Preview} from "@storybook/react";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
    },
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    globals: {
      contentfulPreview: {
        space: process.env.STORYBOOK_SPACE_ID,
        accessToken: process.env.STORYBOOK_PREVIEW_TOKEN,
        host: process.env.STORYBOOK_HOST,
        // debugMode: true,
      }
    }
  },
};

export default preview;
