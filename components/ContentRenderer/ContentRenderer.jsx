'use client';

import React from 'react';

const ContentRenderer = ({ content }) => {
  if (!content) return null;

  const parseContent = (htmlString) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
      const children = Array.from(doc.body.childNodes || []);

      if (children.length === 0) {
        return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />;
      }

      const hasDescendantLara = (el) => {
        try {
          return el.querySelector && el.querySelector('[data-lara-block]');
        } catch (e) {
          return null;
        }
      };

      const getAttributes = (el) => {
        const props = {};
        if (!el.attributes) return props;
        Array.from(el.attributes).forEach((attr) => {
          if (attr.name === 'class') props.className = attr.value;
          else if (attr.name === 'style') props['data-style'] = attr.value; // preserve raw style if needed
          else props[attr.name] = attr.value;
        });
        return props;
      };

      const renderNode = (node, idxPrefix = '') => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent;
          if (!text || text.trim() === '') return null;
          return <span key={`t-${idxPrefix}` } dangerouslySetInnerHTML={{ __html: text }} />;
        }

        if (node.nodeType !== Node.ELEMENT_NODE) return null;

        const el = node;

        // If this element itself is a lara block, parse props and render accordingly
        if (el.hasAttribute && el.hasAttribute('data-lara-block')) {
          const blockType = el.getAttribute('data-lara-block');
          let props = {};
          try {
            const raw = el.getAttribute('data-props') || '{}';
            props = JSON.parse(raw);
          } catch (e) {
            console.warn('Failed to parse data-props for content block; falling back to element content.');
            props = { content: el.innerHTML };
          }

          switch (blockType) {
            case 'text':
              return (
                <div
                  key={`b-${idxPrefix}`}
                  className="mb-4"
                  style={{
                    textAlign: props.align || 'left',
                    color: props.color || '#666666',
                    fontSize: props.fontSize || '16px',
                    lineHeight: props.lineHeight || '1.6',
                    ...props.layoutStyles
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: props.content || '' }} />
                </div>
              );

            case 'heading': {
              const HeadingTag = props.level || 'h2';
              return (
                <HeadingTag
                  key={`b-${idxPrefix}`}
                  className="my-4 font-bold"
                  style={{
                    textAlign: props.align || 'center',
                    color: props.color || '#333333',
                    fontSize: props.fontSize || '32px',
                    fontWeight: props.fontWeight || 'bold',
                    lineHeight: props.lineHeight || '1.2',
                    letterSpacing: props.letterSpacing || '0',
                    ...props.layoutStyles
                  }}
                >
                  {props.text}
                </HeadingTag>
              );
            }

            case 'image':
              // avoid rendering <img> with empty src which can trigger browser reloads
              const src = (props.src || '').toString().trim() || null;
              return (
                <div key={`b-${idxPrefix}`} className="my-6" style={{ textAlign: props.align || 'center', ...props.layoutStyles }}>
                  {src ? (
                    <img
                      src={src}
                      alt={props.alt || 'Image'}
                      width={props.customWidth ? parseInt(props.customWidth) : undefined}
                      height={props.customHeight ? parseInt(props.customHeight) : undefined}
                      style={{ width: props.width || '100%', height: props.height || 'auto', maxWidth: props.layoutStyles?.maxWidth || '100%' }}
                      className="rounded-lg mx-auto"
                    />
                  ) : (
                    // if no valid src, render an empty placeholder (no image tag)
                    <div className="w-full h-40 bg-gray-100 rounded-lg mx-auto" />
                  )}
                  {props.alt && <p className="text-center text-sm text-gray-500 mt-2">{props.alt}</p>}
                </div>
              );

            case 'list': {
              const ListTag = props.ordered ? 'ol' : 'ul';
              return (
                <div key={`b-${idxPrefix}`} className="my-4">
                  <ListTag className={props.ordered ? 'list-decimal pl-5' : 'list-disc pl-5'} style={{ color: props.color || '#666666', fontSize: props.fontSize || '16px', lineHeight: props.lineHeight || '1.6', ...props.layoutStyles }}>
                    {props.items?.map((item, i) => (
                      <li key={i} className="mb-2"><div dangerouslySetInnerHTML={{ __html: item }} /></li>
                    ))}
                  </ListTag>
                </div>
              );
            }

            case 'table':
              return (
                <div key={`b-${idxPrefix}`} className="my-6 overflow-x-auto">
                  <table className="min-w-full border border-gray-300" dangerouslySetInnerHTML={{ __html: el.innerHTML }} />
                </div>
              );

            default:
              return <div key={`b-${idxPrefix}`} dangerouslySetInnerHTML={{ __html: el.outerHTML }} />;
          }
        }

        // If element contains nested lara blocks, recreate element and render children recursively
        if (hasDescendantLara(el)) {
          const Tag = el.tagName ? el.tagName.toLowerCase() : 'div';
          const attrs = getAttributes(el);
          const children = Array.from(el.childNodes || []).map((child, i) => renderNode(child, `${idxPrefix}-${i}`));
          return React.createElement(Tag, { key: `el-${idxPrefix}`, ...attrs }, children);
        }

        // No nested lara blocks: safe to render raw HTML
        return <div key={`raw-${idxPrefix}`} dangerouslySetInnerHTML={{ __html: el.outerHTML }} />;
      };

      const rendered = children.map((c, i) => renderNode(c, `${i}`));
      return rendered.filter(Boolean);
    } catch (error) {
      console.error('Error parsing content:', error);
      return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />;
    }
  };

  return <div className="content-renderer">{parseContent(content)}</div>;
};

export default ContentRenderer;