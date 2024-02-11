import type {Meta} from '@storybook/react';
import {StoryObj} from "@storybook/react";
import {ContentfulDebugComponent} from "./ContentfulDebugComponent";
import {withEntryFields} from "../withEntryFields";

const meta = {
  title: 'ContentfulPreview/Debug',
  component: ContentfulDebugComponent,
} satisfies Meta<typeof ContentfulDebugComponent>;

type Story = StoryObj<typeof ContentfulDebugComponent>;

/*
 * Set live preview to get live updates in contentful's preview mode
 */
export const LivePreview: Story = {
  parameters: {
    contentfulPreview: {
      entryId: '5M3xHa49MTRrkhiaascL3Q',
      livePreview: true,
    }
  }
}

/*
 * Without live preview, the component will not update when the entry changes
 */
export const NoLivePreview: Story = {
  parameters: {
    contentfulPreview: {
      entryId: '5M3xHa49MTRrkhiaascL3Q',
      livePreview: false,
    }
  }
}

/*
 * render static data (if parameter `contentfulPreview` is not set), the decorator is ignored
 */
export const Static: Story = {
  args: {
    entryId: '5M3xHa49MTRrkhiaascL3Q',
    entry: {
      sys: {
        id: '5M3xHa49MTRrkhiaascL3Q',
        type: 'Entry',
      },
      fields: {
        title: 'Title',
        description: 'Description',
      }
    }
  },
  decorators: [withEntryFields],
}

export default meta;