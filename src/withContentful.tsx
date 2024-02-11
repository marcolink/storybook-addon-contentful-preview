import {PARAM_ENTRY, PARAM_KEY} from "./constants";
import {useContentful} from "./useContentful";
import {mergeParam} from "./utils";
import {makeDecorator} from "@storybook/preview-api";
import {ContentfulPreviewParameters} from "./types";

export const withContentful = makeDecorator({
  name: 'withContentful',
  parameterName: PARAM_KEY,
  skipIfNoParametersOrOptions: true,
  wrapper: (
    storyFn,
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
    const host = mergeParam([parameters.host, globalContentfulPreview.host], 'api.contentful.com')
    const entryId = searchParams.get('entryId') || parameters.entryId

    const debugMode = mergeParam([parameters.debugMode, globalContentfulPreview.debugMode], false)
    if(debugMode) {
      console.log('🎨 Decorated with withContentful')
    }

    const params = {
      space,
      accessToken,
      environment,
      host,
      locale
    }

    const {entry, isLoading} = useContentful(entryId, params);

    if (entry) {
      context.args[PARAM_ENTRY] = entry
    }

    if (isLoading) {
      return null
    }

    return storyFn(context)
  }
})