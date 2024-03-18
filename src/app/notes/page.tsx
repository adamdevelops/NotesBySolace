import { createClient } from "../utils/supabase/server";

export default async function Notes() {
  const supabase = createClient();
  const { data: notes } = await supabase.from("notes").select('*');
  
console.log('data', notes)


  // return <pre>{JSON.stringify(notes, null, 2)}</pre>

  return JSON.stringify(notes)

}