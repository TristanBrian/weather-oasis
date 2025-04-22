
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lkzguwassjnydgnayokq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxremd1d2Fzc2pueWRnbmF5b2txIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNDU0MTYsImV4cCI6MjA2MDkyMTQxNn0.np3EFOfauyn6DqxwAtB_mgLv2qbgovyLtsL9lJ7CYXE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
