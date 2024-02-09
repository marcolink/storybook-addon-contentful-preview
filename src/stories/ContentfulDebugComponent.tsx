import React from "react";
import {useContentfulInspectorMode} from "@contentful/live-preview/react";

type AnyEntry =
  {
    entryId: string
  }
  & Record<string, any>;

/*
  * This component is used to debug the content of an entry.
  * The ContentfulPreview decorator assigns the following parameters:
  * - entryId: The id of the entry to be debugged
  * - entry: The entry object
  * - '[fieldId]': value
 */
export function ContentfulDebugComponent({entryId, ...fields}: AnyEntry) {
  // For this example, we don't need the entry as full object
  delete fields.entry;
  const inspectorProps = useContentfulInspectorMode({entryId});
  const fieldComponents = Object.entries(fields).map(([key, value]) => {
    return (
      <pre key={key} {...inspectorProps({fieldId: key})}>
      {JSON.stringify(value, null, 2)}
    </pre>
    );
  })
  return (
    <>
      {fieldComponents}
    </>
  );
}