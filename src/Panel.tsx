import React from "react";
import {AddonPanel, Code, createCopyToClipboardFunction, IconButton} from "@storybook/components";
import {useLivePreviewUrl} from "./components/useLivePreviewUrl";

interface PanelProps {
  active: boolean;
}

export function Panel(props: PanelProps) {
  const livePreviewUrl = useLivePreviewUrl();

  const copyFunction = createCopyToClipboardFunction();

  return (
    <AddonPanel {...props}>
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
    </AddonPanel>
  );
};
