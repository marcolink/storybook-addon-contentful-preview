// chromatic.d.ts
import {PARAM_KEY} from "./constants";
import {ContentfulPreviewParameters} from "./types";

declare module '@storybook/types' {
  interface Parameters {
    [PARAM_KEY]?: Partial<ContentfulPreviewParameters>;
  }
}