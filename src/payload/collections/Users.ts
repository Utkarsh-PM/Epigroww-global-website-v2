import type { CollectionConfig } from "payload";

/**
 * Admin users. Auth-enabled collection — anyone here can log into /admin.
 * Seeded with utkarsh@epigrowwglobal.com on first boot.
 */
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "System",
  },
  fields: [
    {
      name: "name",
      type: "text",
      admin: { description: "Display name shown in the admin." },
    },
    {
      name: "role",
      type: "select",
      defaultValue: "editor",
      options: [
        { label: "Admin (full access)", value: "admin" },
        { label: "Editor (content only)", value: "editor" },
      ],
    },
  ],
};
