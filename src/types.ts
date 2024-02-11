import {Args} from "@storybook/types";

export type ResultEventState =  {
  content?: any,
  error?: any,
  isLoading: boolean
}

export type BaseEntry = {
  sys: {
    id: string,
    type: string,
  },
  fields: Record<string, any>
}

export type ContentfulPreviewParameters = {
  space: string,
  accessToken: string,
  environment: string,
  locale: string,
  livePreview: boolean,
  host: string,
  debugMode: boolean,
  entryId: string,
  argsMutator: (args: Args) => Args
}