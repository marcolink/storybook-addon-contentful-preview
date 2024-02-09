import {useEffect, useState} from "react";
import {assertValue} from "./utils";
import {createClient, type CreateClientParams} from "contentful";

type UseContentfulParams = {
  isPreview: boolean;
} & CreateClientParams

export function useContentful(entryId: string, clientParams: Partial<UseContentfulParams>) {
  const [error, setError] = useState<any>();
  const [content, setContent] = useState<{
    fields: Record<string, any>
  }>();

  const {
    space,
    isPreview,
    accessToken,
    environment = 'master'
  } = clientParams;

  useEffect(() => {
    const fetchData = async () => {
      try {
        assertValue(entryId, 'No entryId provided');
        assertValue(space, 'No spaceId provided');
        assertValue(accessToken, 'No accessToken provided');
        setError(undefined);
        const contentfulClient = createClient({
          environment,
          space,
          accessToken,
          host: clientParams?.isPreview
            ? 'preview.contentful.com'
            : 'api.contentful.com',
        })
        const data = await contentfulClient.getEntry(entryId, {
          include: 10,
        });
        setContent(data);
      } catch (error) {
        console.error('Error fetching content from Contentful:', error);
        setError(error);
      }
    };
    fetchData();
  }, [entryId, environment, space, accessToken, isPreview]);

  return {content, error};
}