'use client'
import { useState, ChangeEvent } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Note from './components/note'

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;
  const [inputTitleText, setTitleText] = useState('');
  const [inputAuthorText, setAuthorText] = useState('');
  const [inputBodyText, setBodyText] = useState('');


  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Create a New Note!!</DialogTitle>
      <form>
        <label>Title</label>
        <input placeholder="Enter in a title" value={inputTitleText}  />
        <label>Author</label>
        <input placeholder="Put your name here" value={inputAuthorText}  />
        <label>Contents</label>
        <textarea placeholder="Enter in the contents of your note to say" value={inputBodyText}  />
      </form>
    </Dialog>
  );
}

export default function Home() {
  const example_notes = [
    {id: 1, date:'3/11/2024', title: 'My first note!!!', author: 'Walter Dean Myers', body:'This embarks my first note of this app'},
    {id: 2, date:'3/11/2024', title: 'My second note!!!', author: 'Walter Dean Myers', body:'Here we are again with another note'},
    {id: 3, date:'3/11/2024', title: 'My third note!!!', author: 'Walter Dean Myers', body:'Thrice is the third note'}
  ]

  const noteItems = example_notes.map( note_item => 
    <Note key={note_item.id} title={note_item.title} author={note_item.author} date={note_item.date} body={note_item.body} />
  )

  const [notes, setNotes] = useState<any>(noteItems);
  const [inputText, setInputText] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  function handleTextareaChange(e: any){
    setInputText(e.target.value)
  }

  function submit(e: any){
    console.log('input', inputText)
    const newnote = { id: 4, title: inputText, author: 'John Steinbeck', date:'3/11/2024', body:'A new note embarks this app' }
    setNotes((notes: any) => [...notes, newnote])
    console.log('notes', notes)
    e.preventDefault();        
  }

  return (
    <main>
      <div className="app">
        <div className="search-area">
            <form onSubmit={submit}>
              <button className="search-btn">Search</button>
              <input placeholder="Search for notes..." value={inputText} onChange={handleTextareaChange} />
            </form>
           
        </div>
        <h2>Notes by Solace</h2>
        <div className="ui-btns">
          <button className="create-btn">Create a Note</button>
          <button className="delete-btn">Delete</button>
        </div>
        <div className="notes-area">
          {noteItems}
        </div>
      </div>

    </main>
  );
}
