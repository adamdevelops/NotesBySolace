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

  let actionTitle = ''


  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  if(selectedValue === "create"){
    actionTitle = "Create a New Note!!"
  } else if(selectedValue === "edit"){
    actionTitle = "Edit a Note!!"
  } else{
    actionTitle = "Delete a Note!!"
  }


  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="action-dialog">
        <DialogTitle>{actionTitle}</DialogTitle>
        <form>
          <div>
            <label>Title</label>
            <br />
            <input placeholder="Enter in a title"  />
          </div>
          <div>
            <label>Author</label>
            <br />
            <input placeholder="Put your name here"  />
          </div>
          <div>
            <label>Contents</label>
            <br />
            <textarea placeholder="Enter in the contents of your note to say"  />
          </div>    
        </form>
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
  const [inputText, setInputText] = useState<string>('');
  // State for dialog box
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
    setSelectedValue('create')
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  function renderNotes(){
    return (
      notes.map((note_item: any) => 
        <Note key={note_item.id} title={note_item.title} author={note_item.author} date={note_item.date} body={note_item.body} />
      )
    )
  } 

  function handleTextareaChange(e: any){
    setInputText(e.target.value)
  }

  function submit(e: any){
    const newnote = { id: 4, title: inputText, author: 'John Steinbeck', date:'3/11/2024', body:'A new note embarks this app' }
    setNotes((notes: any) => [...notes, newnote])
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
          <button className="create-btn" onClick={handleClickOpen}>Create a Note</button>
          <button className="delete-btn">Delete</button>
        </div>
        <div className="notes-area">
          {renderNotes()}
        </div>
      </div>

      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />

    </main>
  );
}
