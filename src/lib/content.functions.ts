import { createServerFn } from "@tanstack/react-start";

export interface NewsPostInput {
  id?: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  category?: string;
  author?: string;
  image_url?: string | null;
  featured?: boolean;
  read_time?: string;
  published?: boolean;
}

export interface TutorialInput {
  id?: string;
  slug: string;
  title: string;
  description?: string;
  video_url: string;
  thumbnail_url?: string | null;
  category?: string;
  level?: string;
  duration?: string;
  instructor?: string;
  featured?: boolean;
  published?: boolean;
}

function checkAdmin(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || password !== expected) {
    throw new Error("Unauthorized");
  }
}

export const listNewsPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("news_posts")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const listTutorials = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("tutorial_videos")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const saveNewsPost = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string; post: NewsPostInput }) => input)
  .handler(async ({ data }) => {
    checkAdmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { id, ...fields } = data.post;
    if (id) {
      const { data: row, error } = await supabaseAdmin
        .from("news_posts")
        .update(fields)
        .eq("id", id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return row;
    }
    const { data: row, error } = await supabaseAdmin
      .from("news_posts")
      .insert(fields)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteNewsPost = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string; id: string }) => input)
  .handler(async ({ data }) => {
    checkAdmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("news_posts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const saveTutorial = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string; tutorial: TutorialInput }) => input)
  .handler(async ({ data }) => {
    checkAdmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { id, ...fields } = data.tutorial;
    if (id) {
      const { data: row, error } = await supabaseAdmin
        .from("tutorial_videos")
        .update(fields)
        .eq("id", id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return row;
    }
    const { data: row, error } = await supabaseAdmin
      .from("tutorial_videos")
      .insert(fields)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteTutorial = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string; id: string }) => input)
  .handler(async ({ data }) => {
    checkAdmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("tutorial_videos").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const verifyAdminPassword = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string }) => input)
  .handler(async ({ data }) => {
    try {
      checkAdmin(data.password);
      return { ok: true };
    } catch {
      return { ok: false };
    }
  });
