import React from "react";
import {styled} from "@storybook/theming";
import {Button, Code, createCopyToClipboardFunction, IconButton} from "@storybook/components";
import {useLivePreviewUrl} from "./useLivePreviewUrl";

export const RequestDataButton = styled(Button)({
  marginTop: "1rem",
});

interface PanelContentProps {}

/**
 * Checkout https://github.com/storybookjs/storybook/blob/next/code/addons/jest/src/components/Panel.tsx
 * for a real world example
 */
export const PanelContent: React.FC<PanelContentProps> = () => {
  const livePreviewUrl = useLivePreviewUrl();
  const copyFunction = createCopyToClipboardFunction();

  return (
    <div style={{padding: 20}}>
      <h3>Welcome</h3>
      <p>
        The Contentful Live Preview Addon allows you to use your storybook instance as contentful preview url.
      </p>
      <h3>Setup</h3>
      <p>
        Set this url as your preview url in your contentful space settings for the content type that represents data
        for this component..
      </p>
      <Code contentEditable={false}>
        {livePreviewUrl}
      </Code>
      <IconButton onClick={() => copyFunction(livePreviewUrl)}>Copy</IconButton>
    </div>
  )
}

