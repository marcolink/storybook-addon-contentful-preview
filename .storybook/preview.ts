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
        space: "621006g5gybw",
        accessToken: "UaqOlFCYE6lFHd_Cmvp2xD__UBceBcKA4j8KkFoCdac",
        isPreview: true,
      }
    }
  },
};

export default preview;
