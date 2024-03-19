'use client'
import { useState, ChangeEvent, useEffect, useRef } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import NoteItem from './components/noteItem'
import { Note } from './interfaces/Note';
import TextField from '@mui/material/TextField/TextField';

export interface SimpleDialogProps {
  open: boolean;
  selectedAction: string;
  note: any;
  onClose: (value: string) => void;
  submitNewNote: (value: Note) => void;
  editNote: (value: Note) => void;
  deleteNote: (value: number) => void;
}

let initial_note = {
  id: 0,
  title: '',
  author: '',
  body: '',
  date: ''
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedAction, note, open, submitNewNote, editNote, deleteNote} = props;
  const [inputNote, setInputNote] = useState<Note>(initial_note)
  const [errorMsg, setErrorMsg] = useState<string>("")


  let actionTitle = ''

  useEffect(() => {
    setInputNote(note)
  }
  , [note])

  // Minimum length of chars allowed
  const MIN_LENGTH = 20;

  const onChangeNote = (e: any) => {

    if(e.target.name === "author"){
      setInputNote((prevState: any) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    } else{
        if(e.target.value.length <= MIN_LENGTH){
          setErrorMsg(
            "Please enter in more than 20 characters"
          )
        } else{
          setErrorMsg(
            ""
          )      
          setInputNote((prevState: any) => ({
              ...prevState,
              [e.target.name]: e.target.value
          }));
        }    
    }

    
  }

  const getTodaysDate = () => {
    const date = new Date();
    console.log(
      new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        timeStyle: 'long',
        timeZone: 'America/New_York',
      }).format(date)
    );
    
    const todayDate = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'full',
      timeStyle: 'long',
      timeZone: 'America/New_York',
    }).format(date)

    return todayDate
  }

  

  const handleClose = () => {
    console.log('cancel')
    setInputNote(initial_note)
    onClose(selectedAction);
  };

  const createNewNote = (e: any) => {
    let date = new Date()

    let newNote = {
      id: 0,
      title: inputNote.title,
      author: inputNote.author,
      body: inputNote.body,
      date: getTodaysDate()
    }

    console.log('newNote being created', newNote)

    submitNewNote(newNote)
    e.preventDefault()
  }

  const editExistingNote = (e: any) => {
    let date = new Date()


    let editedNote = {
      id: inputNote.id,
      title: inputNote.title,
      author: inputNote.author,
      body: inputNote.body,
      date: getTodaysDate()
    }

    console.log('editExistingNote', editedNote)

    editNote(editedNote)
    e.preventDefault()
  }

  const deleteExistingNote = (e: any) => {
    let id = inputNote.id
    deleteNote(id)
    e.preventDefault()
  }

  if(selectedAction === "create"){
    actionTitle = "Create a New Note!!"
  } else if(selectedAction === "edit"){
    actionTitle = "Edit a Note!!"    
  } else{
    actionTitle = "Delete a Note!!"
  }



  const errorMsgValidation = (e: any) => {

    if(e.target.value.length < MIN_LENGTH){
      setErrorMsg(
        "The input has not met the minimum number of characters"
      );
    }
  }


  const renderForm = () => {
    if(selectedAction == "create" || selectedAction == "edit"){
      let action_btn;

      if(selectedAction === "create"){
        action_btn = <button onClick={createNewNote}>Create Note</button>
      } else{
        action_btn = <button onClick={editExistingNote}>Edit Note</button>         
      }

      return(
        <form >
          <div className="form-fields">
            <TextField id="standard-basic" label="Title" name="title" placeholder="Please enter the title of the note" error={inputNote.title.length <= MIN_LENGTH} helperText= {errorMsg} defaultValue={inputNote.title} onChange={onChangeNote} inputProps={{ minlength: 20, maxlength: 300}} />
          </div>
          <div className="form-fields">
            <TextField id="standard-basic" label="Author" name="author" placeholder="Please enter the author of the note" defaultValue={inputNote.author} onChange={onChangeNote} />
          </div>
          <div className="form-fields">
          <TextField
            id="filled-multiline-static"
            name="body" 
            placeholder="Please enter the contents of the note"
            error={inputNote.body.length <= MIN_LENGTH}
            helperText= {errorMsg}
            label="Contents"
            multiline
            rows={4}
            defaultValue={inputNote.body} 
            onChange={onChangeNote}
            inputProps={{ minlength: 20, maxlength: 300 }}
          />
          </div>
          <div className="dialog-btn-area">
            {action_btn}
            <button onClick={handleClose}>Cancel</button>
          </div>
          
        </form>
      )
    } else {
          return(
            <div className="dialog-btn-area">
              <p className="note-body">Do you want to delete this note?</p>
              <button onClick={deleteExistingNote}>Delete</button>
              <button onClick={handleClose}>Cancel</button>
            </div>
          )
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
  
  let initial_note = {
    id: 0,
    title: '',
    author: '',
    body: '',
    date: ''
  }

  let example_notes = [
    {id: 1, date:'3/11/2024', title: 'My first note!!!', author: 'Walter Dean Myers', body:'This embarks my first note of this app'},
    {id: 2, date:'3/11/2024', title: 'My second note!!!', author: 'Walter Dean Myers', body:'Here we are again with another note'},
    {id: 3, date:'3/11/2024', title: 'My third note!!!', author: 'Walter Dean Myers', body:'Thrice is the third note'},
    {id: 4, date:'3/11/2024', title: 'My 4 note!!!', author: 'Walter Dean Myers', body:'Thrice is the third note'},
    {id: 5, date:'3/11/2024', title: 'My 5 note!!!', author: 'Walter Dean Myers', body:'Thrice is the third note'},
    {id: 6, date:'3/11/2024', title: 'My 6 note!!!', author: 'Walter Dean Myers', body:'Thrice is the third note'},
  ]
  

  const [notes, setNotes] = useState<any>([]);
  // Search field state
  const [searchInputText, setSearchInputText] = useState<string>('');
  const prevNotesRef = useRef<any>([])
  // Keep track of unused ID to assign to new notes
  const [nextId, setNextId] = useState<number>(5)

  // State for dialog box
  const [open, setOpen] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [selectedNote, setSelectedNote] = useState<Note>(initial_note);

  useEffect(() => {
    if(notes.length === 0){
      // fetchNotes()
      fetchSupaNotes()
    }    
  }, [notes]);

  const fetchNotes = () => {
    fetch("/api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set the request headers to indicate JSON format
      },
    })
      .then((res) => res.json()) // Parse the response data as JSON
      .then((data) => {
        console.log('data', data)
        setNotes(data)
      }); // Update the state with the fetched data
  }
  
  async function fetchSupaNotes() {
    fetch("/api/data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set the request headers to indicate JSON format
      },
    })
      .then((res) => res.json()) // Parse the response data as JSON
      .then((data) => {
        console.log('data from Supabase', data)
        setNotes(data.notes)
      }); // Update the state with the fetched data

    // try {
    //   const response = await fetch("/notes", {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json", // Set the request headers to indicate JSON format
    //     },
    //   });
    //   const jsonData = await response.json();
    //   console.log('jsonData', jsonData)
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    // }
  }

  // Handle click to open dialog box
  const handleClickOpen = (action: string, note?: any ) => {
    setOpen(true);
    setSelectedAction(action)

    // Set state for selected note to pass to dialog if note is not undefined
    if(note != undefined){
      setSelectedNote(note)
    }    
  };

  // Handle click to close dialog box
  const handleClose = () => {
    setOpen(false);
    setSelectedAction('');
    setSelectedNote(initial_note)
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

  // Called when searching notes via search bar
  function searchNotes(){
    let filtered_notes = notes.filter((note: any) => note.title.includes(searchInputText) || note.body.includes(searchInputText));
    // Set prevNotes to equal the current notes, then change displayed notes to filtered search notes
    prevNotesRef.current = notes
    setNotes(filtered_notes)

    event?.preventDefault()
  }

  // Called when hitting X button in search bar to revert displayed notes before search
  function clearSearch () {
    setSearchInputText('')
    setNotes(prevNotesRef.current)
    event?.preventDefault()
  }

  // Function to reset the task
  const handleNoteReset = () => setSelectedNote((note: any) => initial_note);
  
  function submitNewNote(new_note: Note){    
    // console.log('note', new_note)
    new_note.id = nextId;
    // setNotes((notes: any) => [...notes, new_note])
    setNextId(nextId + 1)
    // handleClose()
    // event?.preventDefault()

    event?.preventDefault();
    // fetch("http://localhost:3000/api", {
    //   method: "POST",
    //   body: JSON.stringify({ note: new_note }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .catch((error) => {
    //     // Log any errors
    //     console.error("Error: ", error);
    //   }).then((res) => {
    //     fetchSupaNotes() // Fetch notes to set state

    //     handleClose();
    //   });
      

      fetch("/api/data", {
        method: "POST",
        body: JSON.stringify({ note: new_note }),
        headers: {
          "Content-Type": "application/json", // Set the request headers to indicate JSON format
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        fetchSupaNotes();

        handleClose()
      })
      .catch(error => {
        console.error('Error:', error);
      });    

  }

  function editNote(editedNote: Note){
    // const nextNote = notes.map((note: any, i: number) => {
    //     if (i+1 === editedNote.id) {
    //         // Edit chosen item
    //         console.log('edit the item')
    //         let editItem = note;
    //         editItem = {
    //           id: editedNote.id,
    //           title: editedNote.title,
    //           author: editedNote.author,
    //           body: editedNote.body,
    //           date: editedNote.date
    //         }
    //         return editItem;
    //     } else {
    //         // The rest haven't changed
    //         return note;
    //     }
    //   });
    // setNotes(nextNote);
    // handleClose()

    console.log('editedNote', editedNote)

    fetch("http://localhost:3000/api", {
      method: "PATCH",
      body: JSON.stringify({ id: editedNote.id, note: editedNote }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      fetchNotes() // Fetch notes to set state
      setSelectedNote(initial_note); // Reset the task state
      handleClose(); // Hide the edit form
    });
  }

  function deleteNote(deletedNote: number){
    // let updatednotes = notes.filter((note: Note) => note.id != selectedNote.id)

    // setNotes(updatednotes)
    // handleClose()

    console.log('deletedNote', deletedNote)

    fetch("http://localhost:3000/api", {
      method: "DELETE",
      body: JSON.stringify({ id: deletedNote }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        fetchNotes() // Fetch notes to set state
        handleClose();
      })
      .catch((error) => console.error("Error: ", error)); // Log any errors
  }

  return (
    <main>
      <div className="app">
        <h2 className="header-title">Notes by Solace</h2>
        <div className="ui-area">
          <div className="ui-btns">
            <button className="create-btn" onClick={() => handleClickOpen('create')}>Create a Note</button>
          </div>
          <div className="search-area">
            <button className="search-btn" onClick={searchNotes}>Search</button>
            <input placeholder="Search for notes..." value={searchInputText} onChange={handleTextareaChange} />
            <button className="clear-search-btn" onClick={clearSearch}>X</button>
          </div>           
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
