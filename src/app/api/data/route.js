import { NextResponse } from "next/server";
import { createClient } from "../../utils/supabase/server";

export async function GET() {
    var data = {
        message: 'result from get'
    }

    const supabase = createClient();
    const { data: notes } = await supabase.from("notes").select();

    return NextResponse.json({ notes })
}

// for method POST
export async function POST(req, res) {
    var data = {
        message: 'result from post',
    }

    const { note } = await req.json();

    console.log('new_note in post', note)
    
    // const supabase = createClient();
    // const { supaData } = await supabase.from("notes").upsert([note]);

    try {
        const { data, error } = await supabase
          .from('notes')
          .upsert([note]);
        
        if (error) {
          throw error;
        }
  
        console.log('Data upserted:', data);
        // Optionally, update state or do something else on success
      } catch (error) {
        console.error('Error upserting data:', error.message);
      }

    return NextResponse.json({ supaData })
}