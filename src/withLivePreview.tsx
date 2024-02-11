import {makeDecorator} from "@storybook/preview-api";
import {PARAM_ENTRY, PARAM_KEY} from "./constants";
import {ContentfulLivePreview} from "@contentful/live-preview";
import {mergeParam} from "./utils";
import {ContentfulLivePreviewProvider, useContentfulLiveUpdates} from "@contentful/live-preview/react";
import React from "react";

export const withLivePreview = makeDecorator({
  name: 'withLivePreview',
  parameterName: PARAM_KEY,
  skipIfNoParametersOrOptions: true,
  wrapper: (
    storyFn,
    context,
    {parameters}
  ) => {
    const searchParams = new URLSearchParams(window.location.search);
    const globalContentfulPreview = context.parameters.globals[PARAM_KEY];
    const locale = mergeParam([searchParams.get('locale'), parameters.locale, globalContentfulPreview.locale], 'en-US')
    const livePreview = mergeParam([parameters.livePreview, globalContentfulPreview.livePreview], false)

    const debugMode = mergeParam([parameters.debugMode, globalContentfulPreview?.debugMode], false)
    if(debugMode) {
      console.log('🎨 Decorated with withLivePreview')
    }

    if (livePreview && !ContentfulLivePreview.initialized) {
      ContentfulLivePreview.init({
        locale,
        debugMode,
        enableLiveUpdates: true,
        enableInspectorMode: true,
      });
    }

    const initialEntry = context.args[PARAM_ENTRY];

    function renderStory() {
      const entry = useContentfulLiveUpdates(initialEntry);
      if (entry) {
        context.args[PARAM_ENTRY] = entry
      }
      return <>{storyFn(context)}</>;
    }

    if (!livePreview) {
      return storyFn(context);
    }

    return (
      <ContentfulLivePreviewProvider locale={locale}>
        {renderStory()}
      </ContentfulLivePreviewProvider>
    )

  }
})