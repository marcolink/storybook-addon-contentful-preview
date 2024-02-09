import {PartialStoryFn as StoryFunction, Renderer, StoryContext} from "@storybook/types";
import {PARAM_KEY} from "./constants";
import {useContentful} from "./useContentful";

export const withContentfulPreview = (
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>
) => {
  const contentfulPreview = context.parameters.globals[PARAM_KEY];
  const entryId = context.parameters[PARAM_KEY].entryId
  const {content, isLoading} = useContentful(entryId, contentfulPreview);
  if (content) {
    context.args = {
      entry: content,
      ...context.args,
      ...content.fields
    }
  }

  if (isLoading) {
    return null
  }

  return StoryFn(context);
}