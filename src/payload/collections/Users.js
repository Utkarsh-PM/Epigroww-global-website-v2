/**
 * Admin users. Auth-enabled collection — anyone here can log into /admin.
 */
export const Users = {
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
