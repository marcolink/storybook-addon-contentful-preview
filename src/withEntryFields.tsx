import {makeDecorator} from "@storybook/preview-api";
import {PARAM_KEY} from "./constants";

/*
  * This decorator is used to pass the entry fields to the story args
 */
export const withEntryFields = makeDecorator({
  name: 'withEntryFields',
  parameterName: PARAM_KEY,
  skipIfNoParametersOrOptions: false,
  wrapper: (
    storyFn,
    context,
  ) => {
    if (context.args.entry?.fields) {
      context.args = {
        ...context.args,
        ...context.args.entry.fields,
      }
    }
    return storyFn(context);
  }
})