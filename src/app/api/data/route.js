import { createClient } from "../../utils/supabase/server";

export async function GET() {
    var data = {
        message: 'result from get'
    }

    const supabase = createClient();
    const { data: notes } = await supabase.from("notes").select();

    return Response.json({ notes })
}

// for method POST
export async function POST() {
    var data = {
        message: 'result from post'
    }

    return Response.json({ data })
}