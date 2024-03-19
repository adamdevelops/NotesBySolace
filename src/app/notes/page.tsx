import NoteItem from "../components/noteItem";
import { createClient } from "../utils/supabase/server";

export default async function Notes() {
  const supabase = createClient();
  const { data: notes } = await supabase.from("notes").select();
  
  console.log('data', JSON.stringify(notes))

  // const renderNotes = () => {
  //   return (
  //     notes.map((note_item: any) => 
  //       <NoteItem key={note_item.id} note={note_item} handleClickOpen={handleClickOpen} title={note_item.title} author={note_item.author} date={note_item.date} body={note_item.body} />
  //     )
  //   )
  // }


 return JSON.stringify(notes)

}