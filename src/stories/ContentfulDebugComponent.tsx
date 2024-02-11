import React from "react";
import {useContentfulInspectorMode} from "@contentful/live-preview/react";

type BaseEntry = {
  sys: {
    id: string,
    type: string,
  },
  fields: Record<string, any>
}

type AnyEntry =
  {
    entryId: string,
    depth?: number,
    breadcrumbs?: string[],
    entry: BaseEntry
  }
  & Record<string, any>;

/*
  * This component is used to debug the content of an entry.
  * The ContentfulPreview decorator assigns the following parameters:
  * - entryId: The id of the entry (required for inspector mode)
  * - entry: The entry object
  * - <fieldId>: value
 */
export function ContentfulDebugComponent(
  {
    entryId,
    entry,
    depth = 0,
    breadcrumbs = [],
    ...fields
  }: AnyEntry) {


  const inspectorProps = useContentfulInspectorMode({entryId});

  if(entry.sys.type === 'Asset') {
    const assetId = entry.sys.id;
    return (
      <div key={assetId} style={{margin: 10, paddingLeft: depth * 20}}>
      <h4 style={{marginBottom: 0, fontFamily: 'monospace'}}>{[...breadcrumbs, entry.fields.title].join(' > ')}</h4>
      <pre style={{padding: 10, backgroundColor: '#eee'}} {...inspectorProps({fieldId: assetId, assetId})}>
          {JSON.stringify(entry.fields, null, 2)}
        </pre>
    </div>
    )
  }

  const fieldComponents = Object.entries(fields).map(([key, value]) => {

    if (!value) {
      return null;
    }

    if (Array.isArray(value)) {
      return value.map((v, i) => {
        if (typeof v === 'object' && v.sys) {
          return (
            <>
              <h2>{key}</h2>
              <ContentfulDebugComponent
                key={v.sys.id}
                depth={depth + 1}
                entry={v}
                entryId={v.sys.id}
                breadcrumbs={[...breadcrumbs, key]}
                {...v.fields}
              />
            </>
          )
        }
      })
    }

    if (value.type === 'Entry') {
      return <ContentfulDebugComponent
        key={key} entryId={value.sys.id}
        depth={depth + 1}
        entry={value}
        breadcrumbs={[...breadcrumbs, key]}
        {...value.fields}
      />
    }

    if (value.type === 'Asset') {
      console.log('ASSET')
      return <ContentfulDebugComponent
        key={key} entryId={value.sys.id}
        entry={value}
        depth={depth + 1}
        breadcrumbs={[...breadcrumbs, key]}
        {...value.fields}
      />
    }

    return (
      <div key={key} style={{margin: 10, paddingLeft: depth * 20}}>
        <h4 style={{marginBottom: 0, fontFamily: 'monospace'}}>{[...breadcrumbs, key].join(' > ')}</h4>
        <pre style={{padding: 10, backgroundColor: '#eee'}} {...inspectorProps({fieldId: key})}>
          {JSON.stringify(value, null, 2)}
        </pre>
      </div>
    );
  })
  return (
    <>
      {fieldComponents}
    </>
  );
}