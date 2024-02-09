import {PartialStoryFn as StoryFunction, Renderer, StoryContext} from "@storybook/types";
import {useGlobals} from "@storybook/preview-api";
import {PARAM_KEY} from "./constants";
import {useContentful} from "./useContentful";

export const withContentfulPreview = (
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>
) => {
  const [globals] = useGlobals();
  const contentfulPreview = globals[PARAM_KEY];
  const {error, content} = useContentful('', contentfulPreview);
  console.log({error, content, context});
  return StoryFn(context);
}