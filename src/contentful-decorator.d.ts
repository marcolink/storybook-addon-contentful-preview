// chromatic.d.ts
import {ContentfulParameters} from "~/storybook-addon/withContentful";

declare module '@storybook/types' {
  interface Parameters {
    contentful?: Partial<ContentfulParameters>;
  }
}