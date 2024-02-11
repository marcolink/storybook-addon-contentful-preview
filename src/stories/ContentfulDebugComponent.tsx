import React, {PropsWithChildren} from "react";
import {useContentfulInspectorMode} from "@contentful/live-preview/react";
import {BaseEntry} from "../types";

type AnyEntry =
  {
    depth?: number,
    breadcrumbs?: string[],
    contentful_entry: BaseEntry
  }
  & Record<string, any>;


const EntryTypeIcons = {
  Entry: '📄',
  Asset: '🖼️',
} as const

const FieldTypeIcons = {
  Symbol: '🔤',
  Text: '🔤',
  RichText: '📝',
  Number: '🔢',
  Integer: '🔢',
  Date: '📅',
  Boolean: '🔘',
  Location: '📍',
  Object: '🔵',
  Array: '🔵',
  Link: '🔗',
  Asset: '🖼️',
  Entry: '📄',
  Unknown: '❓',
} as const


/*
  * This component is used to debug the content of an entry.
  * The ContentfulPreview decorator assigns the following parameters:
  * - contentful_entry: The entry object
  * - <fieldId>: value
 */
export function ContentfulDebugComponent(
  {
    contentful_entry,
    depth = 0,
    breadcrumbs = [],
    ...fields
  }: AnyEntry) {

  const inspectorProps = useContentfulInspectorMode({entryId: contentful_entry.sys.id});

  if (contentful_entry.sys.type === 'Asset') {
    const assetId = contentful_entry.sys.id;
    return (
      <div key={assetId} style={{margin: 10, paddingLeft: depth * 20}}>
        <div {...inspectorProps({fieldId: assetId, assetId})}>
          <SectionHeader
            title={EntryTypeIcons.Asset + ' ' + [...breadcrumbs, contentful_entry.fields.title].join(' > ')}
          />
          <CodeBlock>
            {JSON.stringify(contentful_entry.fields.file.url, null, 2)}
          </CodeBlock>
        </div>
      </div>
    )
  }

  const fieldComponents = Object.entries(fields).map(([field, value]) => {


    if (!value) {
      return null;
    }

    if (Array.isArray(value)) {
      return value.map((v, i) => {
        if (typeof v === 'object' && v.sys) {

          // @ts-ignore
          const icon = EntryTypeIcons.hasOwnProperty(v.sys.type) ? EntryTypeIcons[v.sys.type] : FieldTypeIcons.Unknown;
          return (
            <Section depth={depth}>
              <SectionHeader title={icon + ' ' + [...breadcrumbs, field].join(' > ')}/>
              <ContentfulDebugComponent
                key={v.sys.id}
                depth={depth + 1}
                contentful_entry={v}
                breadcrumbs={[...breadcrumbs, field]}
                {...v.fields}
              />
            </Section>
          )
        }
      })
    }

    if (value.type === 'Entry') {
      return <ContentfulDebugComponent
        key={field} entryId={value.sys.id}
        depth={depth + 1}
        contentful_entry={value}
        breadcrumbs={[...breadcrumbs, field]}
        {...value.fields}
      />
    }

    if (value.type === 'Asset') {
      return <ContentfulDebugComponent
        key={field} entryId={value.sys.id}
        contentful_entry={value}
        depth={depth + 1}
        breadcrumbs={[...breadcrumbs, field]}
        {...value.fields}
      />
    }

    return (
      <Section key={field} depth={depth}>
        <div {...inspectorProps({fieldId: field})}>
          <SectionHeader title={[...breadcrumbs, field].join(' > ')}/>
          <CodeBlock>
            {JSON.stringify(value, null, 2)}
          </CodeBlock>
        </div>
      </Section>
    );
  })
  return (
    <>
      {fieldComponents}
    </>
  );
}

type SectionProps = PropsWithChildren<{
  depth: number,
}>

function Section({depth, children}: SectionProps) {
  return (
    <div style={{paddingLeft: depth * 20}}>
      {children}
    </div>
  )
}

function CodeBlock({children}: PropsWithChildren<{}>) {
  return (
    <pre style={{padding: 10, backgroundColor: '#eee'}}>
    {children}
  </pre>
  )
}

function SectionHeader({title}: { title: string }) {
  return (
    <h4 style={{marginBottom: 0, fontFamily: 'monospace'}}>{title.toUpperCase()}</h4>
  )
}