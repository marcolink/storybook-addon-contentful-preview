import type {Meta} from '@storybook/react';
import {StoryObj} from "@storybook/react";
import {ContentfulDebugComponent} from "../components/ContentfulDebugComponent";
import {withEntryArgMutator} from "../withEntryArgMutator";

const meta = {
  title: 'ContentfulPreview/Debug',
  component: ContentfulDebugComponent,
} satisfies Meta<typeof ContentfulDebugComponent>;

type Story = StoryObj<typeof ContentfulDebugComponent>;

/*
 * render static data (if parameter `contentfulPreview` is not set),
 */
export const Static: Story = {
  decorators: [withEntryArgMutator],
  args: {
    contentful_entry: {
      sys: {
        id: '5M3xHa49MTRrkhiaascL3Q',
        type: 'Entry',
      },
      fields: {
        title: 'Title',
        description: 'Description',
      }
    }
  }
}

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


//
// export const StaticLivePreview: Story = {
//   decorators: [withArgsMutator, withLivePreview],
//   args: {
//     entryId: '5M3xHa49MTRrkhiaascL3Q',
//     contentful_entry: {
//       sys: {
//         id: '5M3xHa49MTRrkhiaascL3Q',
//         type: 'Entry',
//       },
//       fields: {
//         title: 'Title',
//         description: 'Description',
//       }
//     }
//   }
// }

export default meta;