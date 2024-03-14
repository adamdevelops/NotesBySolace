'use client'
import { useState, ChangeEvent } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import NoteItem from './components/noteItem'
import { Note } from './interfaces/Note';

export interface SimpleDialogProps {
  open: boolean;
  selectedAction: string;
  note: any;
  onClose: (value: string) => void;
  submitNewNote: (value: Note) => void;
  editNote: (value: Note) => void;
  deleteNote: (value: Note) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedAction, open, submitNewNote, editNote, deleteNote} = props;
  const [note, setNote] = useState(props.note)
  const [inputTitleText, setInputTitleText] = useState('');
  const [inputAuthorText, setInputAuthorText] = useState('');
  const [inputBodyText, setInputBodyText] = useState('');

  let actionTitle = ''


  const handleClose = () => {
    setInputTitleText('')
    setInputAuthorText('')
    setInputBodyText('')
    onClose(selectedAction);
  };

  const createNewNote = (e: any) => {
    let date = new Date()

    let newNote = {
      id: 0,
      title: inputTitleText,
      author: inputAuthorText,
      body: inputBodyText,
      date: date.toString()
    }

    console.log(newNote)

    submitNewNote(newNote)
    e.preventDefault()
  }

  const editExistingNote = (e: any) => {
    let date = new Date()

    let editedNote = {
      id: 0,
      title: inputTitleText,
      author: inputAuthorText,
      body: inputBodyText,
      date: date.toString()
    }

    console.log(editedNote)

    editNote(editedNote)
    e.preventDefault()
  }

  if(selectedAction === "create"){
    actionTitle = "Create a New Note!!"
  } else if(selectedAction === "edit"){
    actionTitle = "Edit a Note!!"
  } else{
    actionTitle = "Delete a Note!!"
  }

  const renderForm = () => {
    if(selectedAction === "create" || "edit"){
      let action_btn;

      if(selectedAction === "create"){
        action_btn = <button onClick={createNewNote}>Create Note</button>
      } else{
        action_btn = <button onClick={editExistingNote}>Edit Note</button>

        // setInputTitleText(note.title)
        // setInputAuthorText(note.author)
        // setInputBodyText(note.body)
      }

      return(
        <form >
          <div>
            <label>Title</label>
            <br />
            <input placeholder="Enter in a title" defaultValue={inputTitleText} onChange={(e) => setInputTitleText(e.target.value)}  />
          </div>
          <div>
            <label>Author</label>
            <br />
            <input placeholder="Put your name here" defaultValue={inputAuthorText} onChange={(e) => setInputAuthorText(e.target.value)} />
          </div>
          <div>
            <label>Contents</label>
            <br />
            <textarea placeholder="Enter in the contents of your note to say" defaultValue={inputBodyText} onChange={(e) => setInputBodyText(e.target.value)} />
          </div>
          <div className="dialog-btn-area">
            {action_btn}
            <button onClick={handleClose}>Cancel</button>
          </div>
          
        </form>
      )
    } else {
        if(selectedAction === "delete"){
          return(
            <div className="dialog-btn-area">
              <p className="note-body">Do you want to delete this note?</p>
              <button onClick={deleteNote}>Delete</button>
              <button onClick={handleClose}>Cancel</button>
            </div>
          )
        }
    }
  }


  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="action-dialog">
        <DialogTitle>{actionTitle}</DialogTitle>
        {renderForm()}
      </div>      
    </Dialog>
  );
}

export default function Home() { 

  const [notes, setNotes] = useState<any>(
    [
      {id: 1, date:'3/11/2024', title: 'My first note!!!', author: 'Walter Dean Myers', body:'This embarks my first note of this app'},
      {id: 2, date:'3/11/2024', title: 'My second note!!!', author: 'Walter Dean Myers', body:'Here we are again with another note'},
      {id: 3, date:'3/11/2024', title: 'My third note!!!', author: 'Walter Dean Myers', body:'Thrice is the third note'}
    ]
  );
  const [searchInputText, setSearchInputText] = useState<string>('');
  const [nextId, setNextId] = useState<number>(4)
  // State for dialog box
  const [open, setOpen] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [selectedNote, setSelectedNote] = useState<any>(undefined);


  const handleClickOpen = (action: string, note?: any ) => {
    setOpen(true);
    setSelectedAction(action)

    // Set state for selected note to pass to dialog if note is not undefined
    if(note != undefined){
      setSelectedNote(note)
    }    
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAction('');
    event?.preventDefault()
  };

  // Used to render notes in state
  const renderNotes = () => {
    return (
      notes.map((note_item: any) => 
        <NoteItem key={note_item.id} note={note_item} handleClickOpen={handleClickOpen} title={note_item.title} author={note_item.author} date={note_item.date} body={note_item.body} />
      )
    )
  } 

  function handleTextareaChange(e: any){
    setSearchInputText(e.target.value)
  }

  function searchNotes(){
    let filtered_notes = notes.filter((note: any) => note.includes(searchInputText));

    console.log('filtered_notes', filtered_notes)
    event?.preventDefault()
  }

  function submitNewNote(new_note: Note){    
    console.log('note', new_note)
    new_note.id = nextId;
    setNotes((notes: any) => [...notes, new_note])
    setNextId(nextId + 1)
    event?.preventDefault()
  }

  function editNote(editedNote: Note){
    console.log('id to edit', editedNote)

    // const nextNote = notes.map((note: any, i: number) => {
    //     if (i+1 === editedNote.id) {
    //         // Edit chosen item
    //         let editItem = note;
    //         editItem.title = editedNote.title
    //         return editItem;
    //     } else {
    //         // The rest haven't changed
    //         return note;
    //     }
    //   });
    //   setNotes(nextNote);
  }

  function deleteNote(deletedNote: Note){
    let updatednotes = notes.filter((note: Note) => note.id != selectedNote.id)

    setNotes(updatednotes)
    handleClose()
  }

  return (
    <main>
      <div className="app">
        <div className="search-area">
            <form >
              <button className="search-btn" onClick={searchNotes}>Search</button>
              <input placeholder="Search for notes..." value={searchInputText} onChange={handleTextareaChange} />
            </form>
           
        </div>
        <h2>Notes by Solace</h2>
        <div className="ui-btns">
          <button className="create-btn" onClick={() => handleClickOpen('create')}>Create a Note</button>
        </div>
        <div className="notes-area">
          {renderNotes()}
        </div>
      </div>

      <SimpleDialog
        selectedAction={selectedAction}
        open={open}
        onClose={handleClose}
        submitNewNote = {submitNewNote}
        editNote={editNote}
        deleteNote = {deleteNote}
        note = {selectedNote}
      />

    </main>
  );
}
