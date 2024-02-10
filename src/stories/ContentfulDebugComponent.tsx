import React from "react";
import {useContentfulInspectorMode} from "@contentful/live-preview/react";

type AnyEntry =
  {
    entryId: string,
    depth: number,
    breadcrumbs: string[],
  }
  & Record<string, any>;

/*
  * This component is used to debug the content of an entry.
  * The ContentfulPreview decorator assigns the following parameters:
  * - entryId: The id of the entry (required for inspector mode)
  * - entry: The entry object
  * - <fieldId>: value
 */
export function ContentfulDebugComponent({entryId, depth = 0, breadcrumbs = [], ...fields}: AnyEntry) {
  // For this example, we don't need the entry as full object
  delete fields.entry;
  const inspectorProps = useContentfulInspectorMode({entryId});
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