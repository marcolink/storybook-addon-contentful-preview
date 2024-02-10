import {ContentfulLivePreview} from "@contentful/live-preview";
import {ContentfulLivePreviewProvider, useContentfulLiveUpdates} from "@contentful/live-preview/react";
import React from "react";
import {PartialStoryFn as StoryFunction, Renderer, StoryContext} from "@storybook/types";

type LiveRendererProps = {
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>
  initialContent: any
  locale: string
  debugMode: boolean
}

export function LivePreviewRenderer(
  {
    StoryFn,
    context,
    initialContent,
    locale,
    debugMode
  }: LiveRendererProps) {

  if (!ContentfulLivePreview.initialized) {
    ContentfulLivePreview.init({
      locale,
      debugMode,
      enableLiveUpdates: true,
      enableInspectorMode: true,
    });
  }

  function renderStory() {
    const content = useContentfulLiveUpdates(initialContent);
    context.args = {
      ...context.args,
      ...content.fields,
      entry: content,
      entryId: content.sys.id
    }

    console.log({context})

    return <>{StoryFn(context)}</>;
  }

  return (
    <ContentfulLivePreviewProvider locale={locale}>
      {renderStory()}
    </ContentfulLivePreviewProvider>
  )
}
