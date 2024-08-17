import { createClient } from '@supabase/supabase-js';

// To be more secure store keys in .env file
const supabaseURL = "https://wovulvxnyqruyqoospov.supabase.co";
const supabaseAnonkey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvdnVsdnhueXFydXlxb29zcG92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM3NjM3NDEsImV4cCI6MjAzOTMzOTc0MX0.2ccYbwKJEq_UVhux4PjwlmMZYY_XQZznkeARHLuA-Ms";

export const supabase = createClient(supabaseURL, supabaseAnonkey)