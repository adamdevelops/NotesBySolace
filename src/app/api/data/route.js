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


    let randomnote = {
        id: 7,
        title: '!!!!!This is my test note!!!!!!!!!!This is my test note!!!!!!!!!!This is my test note!!!!!',
        author: 'ada,',
        body: '!!!!!This is my test note!!!!!!!!!!This is my test note!!!!!!!!!!This is my test note!!!!!!!!!!This is my test note!!!!!!!!!!This is my test note!!!!!!!!!!This is my test note!!!!!',
        date: 'Monday, March 18, 2024 at 10:51:38 PM EDT'
      }
    
    const supabase = createClient();
    const { supaData } = await supabase.from("notes").upsert(randomnote).select();

    return NextResponse.json({ supaData })
}