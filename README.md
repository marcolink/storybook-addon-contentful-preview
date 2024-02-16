# Storybook Addon Contentful Preview

Preview your components with contentful data. Connect your storybook to contentful and [live preview](https://www.contentful.com/developers/docs/tutorials/general/live-preview/) your components with real
data.

[![Version](https://img.shields.io/npm/v/storybook-addon-contentful-preview.svg)](https://npmjs.org/package/storybook-addon-contentful-preview)
[![Downloads/week](https://img.shields.io/npm/dw/storybook-addon-contentful-preview.svg)](https://npmjs.org/package/storybook-addon-contentful-preview)
[![Size](https://img.shields.io/bundlephobia/min/storybook-addon-contentful-preview.svg)](https://npmjs.org/package/storybook-addon-contentful-preview)
[![Release](https://github.com/marcolink/storybook-addon-contentful-preview/actions/workflows/release.yml/badge.svg)](https://github.com/marcolink/storybook-addon-contentful-preview/actions/workflows/release.yml)
[![License](https://img.shields.io/npm/l/storybook-addon-contentful-preview.svg)](https://github.com/marcoxlink/storybook-addon-contentful-preview/blob/main/package.json)

![screen-recording.gif](images%2Fscreen-recording.gif)

## Installation

First, install the package.

```bash
npm install -D storybook-addon-contentful-preview
```

Then, register it as an addon in `.storybook/main.{js|ts}`.

```ts
export default {
  addons: ['storybook-addon-contentful-preview'],
};
```

## Usage

### Plugin
When registered, The plugin will automatically add the required decorators to your storybook.
You can then use the `contentfulPreview` parameter to connect your storybook to contentful. The decorators will be
ignored, if the `contentfulPreview` parameter is not set.

### Manual
The decorators can also be used manually, if you want to have more control over the behavior.

### Parameters

This addon contributes the following parameters to Storybook, under the `contentfulPreview` namespace:

| Name          | Type       | Description                                                                                                | Required |
|---------------|------------|------------------------------------------------------------------------------------------------------------|----------|
| `spaceId`     | `string`   | The space id of your contentful space                                                                      | Yes      |
| `accessToken` | `string`   | The access token of your contentful space                                                                  | Yes      |
| `entryId`     | `string`   | The entry id of the content you want to preview                                                            | Yes      |
| `locale`      | `string`   | The locale of the content you want to preview                                                              | No       |
| `host`        | `string`   | The host of the contentful api (defaults to `api.contentful.com`                                           | No       |
| `livePreview` | `boolean`  | Enables the live preview sdk                                                                               | No       |
| `argsMutator` | `function` | Mutator for the loaded entry data. By default, all fields will be populated as top-level args to the story | No       |

#### Define Parameters
You can set the parameters globally, by adding the `contentfulPreview` parameter to the `globals` object of your `.storybook/preview.js` file ([example](./.storybook/preview.ts)). 

```ts
import type {Preview} from "@storybook/react";

const preview: Preview = {
  parameters: {
    globals: {
      contentfulPreview: {
        space: "<space-id>",
        accessToken: "<access-token>",
        host: 'preview.contentful.com',
      }
    }
  },
};

export default preview;
```

You can also set the parameters per story, by adding the `contentfulPreview` parameter to the story ([example](./src/stories/DebugComponent.stories.tsx))

```ts
export default {
  title: 'Button',
  parameters: {
    contentfulPreview: {
      spaceId: 'your-space',
    }
  }
}
```
> The parameters set on the [story level will override the global](https://storybook.js.org/docs/writing-stories/parameters#rules-of-parameter-inheritance) parameters.


### Decorators

#### `withContentful`

When you want to preview your component with contentful data, you can use the `withContentful` decorator. This decorator
will fetch the data from contentful and pass it to your component.

```ts
import {withContentful} from 'storybook-addon-contentful-preview';

export default {
  title: 'Button',
  decorators: [withContentful],
  parameters: {
    contentfulPreview: {
      spaceId: 'your-space',
      accessToken: 'your-access-token',
      entryId: 'your-entry-id',
    }
  }
};
```

#### `withContentfulLivePreview`
When you want to preview your component with contentful data, you can use the `withContentfulLivePreview` decorator to enable the [live preview sdk](https://github.com/contentful/live-preview/). This decorator will fetch the data from contentful and pass it to your component when renderer inside the contentful UI.

```ts
import {withContentful, withLivePreview} from 'storybook-addon-contentful-preview';

export default {
  title: 'Button',
  decorators: [withLivePreview, withContentful],
  parameters: {
    contentfulPreview: {
      spaceId: 'your-space',
      accessToken: 'your-access-token',
      entryId: 'your-entry-id',
      livePreview: true,
    }
  }
};
```
> Only tested in conjunction with the `withContentful` decorator


#### `withEntryArgMutator`
  
When you want to modify the loaded entry data, you can use the `withEntryArgMutator` decorator. 
The loaded the entry will be provided as `args.contentful_entry`. 
You can use this decorator to modify the loaded entry data before it is passed to your component to match your component props.
WHen used as plugin, the default behavour is to populate all `fields` as top-level args to the story.

```ts
import {withContentful, withEntryArgMutator} from 'storybook-addon-contentful-preview';

export default {
  title: 'Button',
  decorators: [withEntryArgMutator, withContentful],
  parameters: {
    contentfulPreview: {
      spaceId: 'your-space',
      accessToken: 'your-access-token',
      entryId: 'your-entry-id',
      livePreview: true,
      // optionally, you can use the argsMutator param to modify the default behaviour
      argsMutator: (entry, args) => {
        return {
          ...args,
          // ...entry.fields  <-- default behaviour
          headline: entry.fields.title
        }
      }
    }
  }
};
```

### Contentful Preview
To preview your components inside the contentful app, it's best to use the **fullscreen** mode of storybook. 

- Open the storybook in your browser
- Open fullscreen mode
- Copy URL
- Open contentful
- Got to settings for "Contentful Preview"
- Paste URL into (add parameters)


![contentful-preview-panel.png](images%2Fcontentful-preview-panel.png)

The "Contentful Preview" panel will provide you the matching url for your components including all dynamic parameters.

## Development

### Development scripts

- `npm run start` runs babel in watch mode and starts Storybook
- `npm run build` build and package your addon code

[//]: # ()
[//]: # (## Release Management)

[//]: # ()
[//]: # (### Setup)

[//]: # ()
[//]: # (This project is configured to use [auto]&#40;https://github.com/intuit/auto&#41; for release management. It generates a)

[//]: # (changelog and pushes it to both GitHub and npm. Therefore, you need to configure access to both:)

[//]: # ()
[//]: # (- [`NPM_TOKEN`]&#40;https://docs.npmjs.com/creating-and-viewing-access-tokens#creating-access-tokens&#41; Create a token with)

[//]: # (  both _Read and Publish_ permissions.)

[//]: # (- [`GH_TOKEN`]&#40;https://github.com/settings/tokens&#41; Create a token with the `repo` scope.)

[//]: # ()
[//]: # (Then open your `package.json` and edit the following fields:)

[//]: # ()
[//]: # (- `name`)

[//]: # (- `author`)

[//]: # (- `repository`)

[//]: # ()
[//]: # (#### Local)

[//]: # ()
[//]: # (To use `auto` locally create a `.env` file at the root of your project and add your tokens to it:)

[//]: # ()
[//]: # (```bash)

[//]: # (GH_TOKEN=<value you just got from GitHub>)

[//]: # (NPM_TOKEN=<value you just got from npm>)

[//]: # (```)

[//]: # ()
[//]: # (Lastly, **create labels on GitHub**. You’ll use these labels in the future when making changes to the package.)

[//]: # ()
[//]: # (```bash)

[//]: # (npx auto create-labels)

[//]: # (```)

[//]: # ()
[//]: # (If you check on GitHub, you’ll now see a set of labels that `auto` would like you to use. Use these to tag future pull)

[//]: # (requests.)

[//]: # ()
[//]: # (#### GitHub Actions)

[//]: # ()
[//]: # (This template comes with GitHub actions already set up to publish your addon anytime someone pushes to your repository.)

[//]: # ()
[//]: # (Go to `Settings > Secrets`, click `New repository secret`, and add your `NPM_TOKEN`.)

[//]: # ()
[//]: # (### Creating a release)

[//]: # ()
[//]: # (To create a release locally you can run the following command, otherwise the GitHub action will make the release for)

[//]: # (you.)

[//]: # ()
[//]: # (```sh)

[//]: # (npm run release)

[//]: # (```)

[//]: # ()
[//]: # (That will:)

[//]: # ()
[//]: # (- Build and package the addon code)

[//]: # (- Bump the version)

[//]: # (- Push a release to GitHub and npm)

[//]: # (- Push a changelog to GitHub)
