// chromatic.d.ts
import {ContentfulParameters} from "~/storybook-addon/withContentful";
import {PARAM_KEY} from "./constants";

declare module '@storybook/types' {
  interface Parameters {
    [PARAM_KEY]?: Partial<ContentfulParameters>;
  }
}