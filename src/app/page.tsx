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
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedAction, open, submitNewNote } = props;
  const [inputTitleText, setInputTitleText] = useState('');
  const [inputAuthorText, setInputAuthorText] = useState('');
  const [inputBodyText, setInputBodyText] = useState('');

  let actionTitle = ''


  const handleClose = () => {
    onClose(selectedAction);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  const createNewNote = (e: any) => {
    let date = new Date()

    let newNote = {
      id: 4,
      title: inputTitleText,
      author: inputAuthorText,
      body: inputBodyText,
      date: date.toString()
    }

    console.log(newNote)

    submitNewNote(newNote)
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
    if(selectedAction === "create"){
      return(
        <form onSubmit={createNewNote}>
          <div>
            <label>Title</label>
            <br />
            <input placeholder="Enter in a title" onChange={(e) => setInputTitleText(e.target.value)}  />
          </div>
          <div>
            <label>Author</label>
            <br />
            <input placeholder="Put your name here" onChange={(e) => setInputAuthorText(e.target.value)} />
          </div>
          <div>
            <label>Contents</label>
            <br />
            <textarea placeholder="Enter in the contents of your note to say" onChange={(e) => setInputBodyText(e.target.value)} />
          </div>
          <button>Create Note</button>    
        </form>
      )
    } else {
        if(selectedAction === "delete"){
          return(
            <div>
              <p className="note-body">Do you want to delete this note?</p>
              <button>Delete</button>
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
  // State for dialog box
  const [open, setOpen] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [selectedNote, setSelectedNote] = useState('');


  const handleClickOpen = (action: string, note?: any ) => {
    setOpen(true);
    setSelectedAction(action)

    // Set state for selected note to pass to dialog if note is not undefined
    if(note != undefined){
      setSelectedNote(note)
    }    
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedAction(value);
  };

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

  function submitNewNote(note: Note){    
    setNotes((notes: any) => [...notes, note])
  }

  return (
    <main>
      <div className="app">
        <div className="search-area">
            <form >
              <button className="search-btn">Search</button>
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
        note = {selectedNote}
      />

    </main>
  );
}
