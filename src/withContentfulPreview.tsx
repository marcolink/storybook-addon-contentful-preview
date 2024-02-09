import {PartialStoryFn as StoryFunction, Renderer, StoryContext} from "@storybook/types";
import {PARAM_KEY} from "./constants";
import {useContentful} from "./useContentful";
import {mergeParam} from "./utils";

export const withContentfulPreview = (
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>
) => {
  const searchParams = new URLSearchParams(window.location.search);
  const globalContentfulPreview = context.parameters.globals[PARAM_KEY];
  const contentfulPreview = context.parameters[PARAM_KEY];

  const space = mergeParam([contentfulPreview.space, globalContentfulPreview.space])
  const accessToken = mergeParam([contentfulPreview.accessToken, globalContentfulPreview.accessToken])
  const entryId = searchParams.get('entryId') || contentfulPreview.entryId
  const isPreview = mergeParam([contentfulPreview.isPreview, globalContentfulPreview.isPreview])
  const locale = mergeParam([searchParams.get('locale'), contentfulPreview.locale, globalContentfulPreview.locale], 'en-US')
  const environment = mergeParam([searchParams.get('environment'), contentfulPreview.environment, globalContentfulPreview.environment], 'master')

  const params = {
    space,
    accessToken,
    environment,
    isPreview,
    locale
  }

  // console.log({context, globalContentfulPreview, contentfulPreview, params, entryId})
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
  return StoryFn(context);
}