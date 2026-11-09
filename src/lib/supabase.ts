import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type User = {
  id: string;
  email: string;
  display_name: string;
  created_at: string;
};

export type Song = {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: number;
  cover_url: string;
  created_at: string;
};

export type StreamSession = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  is_live: boolean;
  current_song_id: string | null;
  listeners: number;
  started_at: string;
  ended_at: string | null;
};
