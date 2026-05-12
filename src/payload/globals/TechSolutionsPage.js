import { buildServicePageFields } from "./_servicePageFields.js";
import { revalidate } from "../hooks/revalidate.js";

export const TechSolutionsPage = {
  slug: "tech-solutions-page",
  access: { read: () => true },
  label: "Tech Solutions page",
  admin: {
    group: "Pages",
    description: "Tech Solutions page (/tech-solutions) — web, CRM, automation, AI, stack showcase.",
    preview: () => "/tech-solutions",
  },
  hooks: { afterChange: [revalidate(["/tech-solutions"])] },
  fields: [
    ...buildServicePageFields({
      defaultPillarKey: "tech",
      defaultPillarLabel: "Tech Solutions",
      defaultPillarNum: "06",
      defaultPrefix: "Tech that compounds",
      defaultAccent: "quietly",
      defaultEnd: "in the background.",
    }),
    {
      type: "collapsible",
      label: "Terminal · AI assistant (Tech-only)",
      admin: { initCollapsed: true },
      fields: [
        { name: "tlLabel", type: "text", defaultValue: "— Live panel · engineering in flight" },
        {
          type: "row",
          fields: [
            { name: "tlHeadingPrefix", type: "text", admin: { width: "50%" } },
            { name: "tlHeadingAccent", type: "text", admin: { width: "50%" } },
          ],
        },
        { name: "tlLede", type: "textarea" },
        {
          name: "codeLines",
          type: "array",
          labels: { singular: "Line", plural: "Code lines" },
          admin: { description: "Terminal output animated line-by-line." },
          fields: [
            {
              name: "type",
              type: "select",
              defaultValue: "code",
              options: [
                { label: "Comment (// muted italic)", value: "comment" },
                { label: "Code (default)", value: "code" },
                { label: "Log (✓ green)", value: "log" },
                { label: "Accent (final result)", value: "accent" },
              ],
            },
            { name: "txt", type: "text", required: true },
          ],
        },
        { name: "terminalTitle", type: "text", defaultValue: "~/epigroww · deploy · jk-lifestyle" },
        { name: "terminalMeta", type: "text", defaultValue: "zsh · 14:32 IST" },
        {
          name: "aiConversation",
          type: "array",
          labels: { singular: "Message", plural: "AI chat messages" },
          fields: [
            {
              name: "who",
              type: "select",
              required: true,
              defaultValue: "client",
              options: [
                { label: "Client (right-aligned)", value: "client" },
                { label: "AI assistant (left-aligned, lime)", value: "ai" },
              ],
            },
            { name: "txt", type: "text", required: true },
          ],
        },
      ],
    },
    {
      type: "collapsible",
      label: "Stack showcase (Tech-only)",
      admin: { initCollapsed: true },
      fields: [
        { name: "stackLabel", type: "text", defaultValue: "— The stack" },
        {
          type: "row",
          fields: [
            { name: "stackHeadingPrefix", type: "text", admin: { width: "50%" } },
            { name: "stackHeadingAccent", type: "text", admin: { width: "50%" } },
          ],
        },
        {
          name: "stackLayers",
          type: "array",
          labels: { singular: "Layer", plural: "Stack layers" },
          fields: [
            { name: "name", type: "text", required: true },
            { name: "purpose", type: "textarea" },
            {
              name: "tech",
              type: "array",
              labels: { singular: "Tech tag", plural: "Tech tags" },
              fields: [{ name: "label", type: "text", required: true }],
            },
          ],
        },
      ],
    },
  ],
};
