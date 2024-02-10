import type {Meta} from '@storybook/react';
import {StoryObj} from "@storybook/react";
import {ContentfulDebugComponent} from "./ContentfulDebugComponent";

const meta = {
  title: 'ContentfulPreview/Debug',
  component: ContentfulDebugComponent,
  parameters: {
    contentfulPreview: {
      entryId: '5v9JHfguPgi4whd7zCJbkP',
      livePreview: true,
    },
  }
} satisfies Meta<typeof ContentfulDebugComponent>;

type Story = StoryObj<typeof ContentfulDebugComponent>;

export const Primary: Story = {}
export const NoLivePreview: Story = {
  parameters: {
    contentfulPreview: {
      livePreview: false,
    }
  }
}

export default meta;