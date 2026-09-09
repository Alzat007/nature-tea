'use client';
import { useEffect } from 'react';
import { chapterIds } from '@/models/config';
import { products, type Product } from '@/data/tea';
type Tool = {
  name: string;
  description: string;
  inputSchema: object;
  annotations: { readOnlyHint: boolean };
  execute: (v: unknown) => unknown;
};
export default function WebMCP({
  setOpen,
  onProduct,
}: {
  setOpen: (v: boolean) => void;
  onProduct: (v: Product) => void;
}) {
  useEffect(() => {
    const doc = document as Document & {
      modelContext?: {
        registerTool: (
          t: Tool,
          o: { signal: AbortSignal },
        ) => void | Promise<void>;
      };
    };
    const mc = doc.modelContext;
    if (!mc?.registerTool) return;
    const ctrl = new AbortController();
    const tools: Tool[] = [
      {
        name: 'set_vessel_open',
        description: 'Open or close the visible tea vessel.',
        inputSchema: {
          type: 'object',
          properties: { open: { type: 'boolean' } },
          required: ['open'],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false },
        execute: async (input) => {
          const v = input as { open: unknown };
          if (typeof v?.open !== 'boolean')
            throw Error('open must be a boolean');
          setOpen(v.open);
          await new Promise((r) => setTimeout(r, 3000));
          return { open: v.open };
        },
      },
      {
        name: 'explore_tea_product',
        description:
          'Open the fullscreen detail view for a product in the collection.',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'string', enum: products.map((p) => p.id) },
          },
          required: ['id'],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false },
        execute: async (input) => {
          const id = (input as { id?: string })?.id;
          const p = products.find((x) => x.id === id);
          if (!p) throw Error('Unknown product');
          onProduct(p);
          await new Promise((r) => requestAnimationFrame(r));
          return { id: p.id, name: p.name };
        },
      },
      {
        name: 'navigate_tea_chapter',
        description: 'Move to a named chapter of the tea experience.',
        inputSchema: {
          type: 'object',
          properties: { chapter: { type: 'string', enum: chapterIds } },
          required: ['chapter'],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false },
        execute: async (input) => {
          const id = (input as { chapter?: string })?.chapter;
          if (!chapterIds.includes(id as (typeof chapterIds)[number]))
            throw Error('Unknown chapter');
          document.getElementById(id!)?.scrollIntoView({ behavior: 'instant' });
          await new Promise((r) => requestAnimationFrame(r));
          return { chapter: id };
        },
      },
    ];
    tools.forEach((t) => {
      try {
        Promise.resolve(mc.registerTool(t, { signal: ctrl.signal })).catch(
          () => {},
        );
      } catch {}
    });
    return () => ctrl.abort();
  }, [setOpen, onProduct]);
  return null;
}
