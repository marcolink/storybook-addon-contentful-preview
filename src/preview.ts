/**
 * A decorator is a way to wrap a story in extra “rendering” functionality. Many addons define decorators
 * in order to augment stories:
 * - with extra rendering
 * - gather details about how a story is rendered
 *
 * When writing stories, decorators are typically used to wrap stories with extra markup or context mocking.
 *
 * https://storybook.js.org/docs/react/writing-stories/decorators
 */
import type {ProjectAnnotations, Renderer} from "@storybook/types";
import {PARAM_KEY} from "./constants";
import {withContentfulPreview} from "./withContentfulPreview";

/**
 * Note: if you want to use JSX in this file, rename it to `preview.tsx`
 * and update the entry prop in tsup.config.ts to use "src/preview.tsx",
 */

const preview: ProjectAnnotations<Renderer> = {
  decorators: [withContentfulPreview],
  globals: {
    [PARAM_KEY]: {
      // Example of setting a default value for a global parameter
      // space: "spaceId",
      // accessToken: "accessToken",
      environment: "master",
      locale: "en-US",
      livePreview: true,
      host: 'cdn.contentful.com',
      debugMode: false,
    },
  },
};

export default preview;
