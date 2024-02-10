import {PARAM_KEY} from "./constants";
import {useContentful} from "./useContentful";
import {mergeParam} from "./utils";
import React from "react";
import {LivePreviewRenderer} from "./LivePreviewRenderer";
import {makeDecorator} from "@storybook/preview-api";

export const withContentfulPreview = makeDecorator({
  name: 'withContentfulPreview',
  parameterName: PARAM_KEY,
  skipIfNoParametersOrOptions: false,
  wrapper: (
    StoryFn,
    context,
    {parameters}
  ) => {
    const searchParams = new URLSearchParams(window.location.search);
    const globalContentfulPreview = context.parameters.globals[PARAM_KEY];

    const space = mergeParam([parameters.space, globalContentfulPreview.space])
    const accessToken = mergeParam([parameters.accessToken, globalContentfulPreview.accessToken])
    const locale = mergeParam([searchParams.get('locale'), parameters.locale, globalContentfulPreview.locale], 'en-US')
    const environment = mergeParam([searchParams.get('environment'), parameters.environment, globalContentfulPreview.environment], 'master')
    const livePreview = mergeParam([parameters.livePreview, globalContentfulPreview.livePreview], false)
    const isPreview = mergeParam([parameters.isPreview, globalContentfulPreview.isPreview], false)
    const debugMode = mergeParam([parameters.debugMode, globalContentfulPreview.debugMode], false)
    const entryId = searchParams.get('entryId') || parameters.entryId

    const params = {
      space,
      accessToken,
      environment,
      isPreview,
      locale
    }

    console.log({parameters, context, globalContentfulPreview, params, entryId, livePreview, debugMode, isPreview})
    const {content, isLoading} = useContentful(entryId, params);

    if (content) {
      context.args = {
        ...context.args,
        ...content.fields,
        // TODO: maybe rename it as 'entry' as field name is likely to be used
        entry: content,
      }
    }
    if (isLoading) {
      return null
    }
    console.log('Live preview enabled: ', livePreview)

    if (livePreview) {
      return (
        <LivePreviewRenderer
          StoryFn={StoryFn}
          context={context}
          initialContent={content}
          locale={locale}
          debugMode={debugMode}
        />
      )
    }

    return (
      <>
        {StoryFn(context)}
      </>
    );
  }
})