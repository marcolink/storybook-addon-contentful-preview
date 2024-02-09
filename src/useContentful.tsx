import {useEffect, useState} from "@storybook/preview-api";
import {assertValue} from "./utils";
import {createClient, type CreateClientParams} from "contentful";

type UseContentfulParams = {
  isPreview: boolean;
  locale: string;
} & CreateClientParams

export function useContentful(entryId: string, clientParams: Partial<UseContentfulParams>) {
  const [content, setContent] = useState<{
    fields: Record<string, any>
  }>(null);

  const [isLoading, setIsLoading] = useState(true);

  const {
    space,
    isPreview,
    accessToken,
    environment = 'master',
    locale = 'en-US'
  } = clientParams;

  useEffect(() => {
    const fetchData = async () => {
      assertValue(entryId, 'No entryId provided');
      assertValue(space, 'No spaceId provided');
      assertValue(accessToken, 'No accessToken provided');
      setIsLoading(true);
      const contentfulClient = createClient({
        environment,
        space,
        accessToken,
        host: isPreview
          ? 'preview.contentful.com'
          : 'api.contentful.com',
      })
      const data = await contentfulClient.getEntry(entryId, {
        include: 10,
        locale: locale
      });
      setContent(data);
      setIsLoading(false);
    };
    fetchData();
  }, [entryId, environment, space, accessToken, isPreview]);

  return {content, isLoading};
}