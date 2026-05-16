import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xvelglrzcklxmuxegyln.supabase.co";

const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2ZWxnbHJ6Y2tseG11eGVneWxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTU1NjksImV4cCI6MjA5NDMzMTU2OX0.CchYpvqtjhQL5uybbbhZZunm8IwTbiAnBaOwoJHKjUA";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
