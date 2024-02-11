import {PARAM_ENTRY, PARAM_KEY} from "./constants";
import {isContentfulObject, mergeParam} from "./utils";
import {makeDecorator} from "@storybook/preview-api";
import {Args} from "@storybook/types";
import {BaseEntry, ContentfulPreviewParameters} from "./types";

export function defaultArgsMutator(entry: BaseEntry, args: Args): Args {
  return {
    ...args,
    ...entry.fields,
  }
}

/*
  * This decorator is used to pass the entry fields to the story args
 */
export const withArgsMutator = makeDecorator({
  name: 'withArgsMutator',
  parameterName: PARAM_KEY,
  skipIfNoParametersOrOptions: false,
  wrapper: (
    storyFn,
    context,
    {parameters = {}}: {
      parameters: Partial<Pick<ContentfulPreviewParameters, 'argsMutator' | 'debugMode'>>
    }
  ) => {
    const globalContentfulPreview = context.parameters.globals[PARAM_KEY];
    const debugMode = mergeParam([parameters.debugMode, globalContentfulPreview?.debugMode], false)
    if(debugMode) {
      console.log('🎨 Decorated with withArgsMutator')
    }
    if (isContentfulObject(context.args[PARAM_ENTRY])) {
      const argsMutator = parameters?.argsMutator || defaultArgsMutator
      context.args = argsMutator(context.args[PARAM_ENTRY], context.args)
    }
    return storyFn(context);
  }
})