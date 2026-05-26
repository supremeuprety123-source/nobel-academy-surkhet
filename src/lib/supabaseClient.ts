import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cjxbjuwjqjupljxfwgpb.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqeGJqdXdqcWp1cGxqeGZ3Z3BiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3NzUyOTIsImV4cCI6MjA5NTM1MTI5Mn0.TwCXOPLyP8IN2oUqci48SMkuhfG9gjciFKOCoRgJH0Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);