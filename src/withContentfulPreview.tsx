import {EVENTS, PARAM_KEY} from "./constants";
import {useContentful} from "./useContentful";
import {mergeParam} from "./utils";
import React from "react";
import {LivePreviewRenderer} from "./LivePreviewRenderer";
import {makeDecorator, useChannel, useEffect} from "@storybook/preview-api";

type ContentfulPreviewParameters = {
  space: string,
  accessToken: string,
  environment: string,
  locale: string,
  livePreview: boolean,
  host: string,
  debugMode: boolean,
  entryId: string,
}

export const withContentfulPreview = makeDecorator({
  name: 'withContentfulPreview',
  parameterName: PARAM_KEY,
  skipIfNoParametersOrOptions: false,
  wrapper: (
    StoryFn,
    context,
    {parameters}: {
      parameters: Partial<ContentfulPreviewParameters>
    }
  ) => {
    const searchParams = new URLSearchParams(window.location.search);
    const globalContentfulPreview = context.parameters.globals[PARAM_KEY];

    const space = mergeParam([parameters.space, globalContentfulPreview.space])
    const accessToken = mergeParam([parameters.accessToken, globalContentfulPreview.accessToken])
    const locale = mergeParam([searchParams.get('locale'), parameters.locale, globalContentfulPreview.locale], 'en-US')
    const environment = mergeParam([searchParams.get('environment'), parameters.environment, globalContentfulPreview.environment], 'master')
    const livePreview = mergeParam([parameters.livePreview, globalContentfulPreview.livePreview], false)
    const host = mergeParam([parameters.host, globalContentfulPreview.host], 'api.contentful.com')
    const debugMode = mergeParam([parameters.debugMode, globalContentfulPreview.debugMode], false)
    const entryId = searchParams.get('entryId') || parameters.entryId

    const params = {
      space,
      accessToken,
      environment,
      host,
      locale
    }

    console.log({parameters, context, globalContentfulPreview, params, entryId, livePreview, debugMode, host})
    const {content, isLoading} = useContentful(entryId, params);

    const emit = useChannel({
      [EVENTS.RESULT]: (result) => {
        console.log('Received result: ', result)
      }
    });

    useEffect(() => {
      emit(EVENTS.RESULT, {
        content,
        isLoading,
      })
    }, [content, isLoading]);

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