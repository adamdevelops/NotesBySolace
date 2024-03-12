import Note from './components/note'

export default function Home() {
  const example_notes = [
    {id: 1, date:'3/11/2024', title: 'My first note!!!', author: 'Walter Dean Myers', body:'This embarks my first note of this app'},
    {id: 2, date:'3/11/2024', title: 'My second note!!!', author: 'Walter Dean Myers', body:'Here we are again with another note'},
    {id: 3, date:'3/11/2024', title: 'My third note!!!', author: 'Walter Dean Myers', body:'Thrice is the third note'}
  ]

  const noteItems = example_notes.map( note_item => 
    <Note key={note_item.id} title={note_item.title} author={note_item.author} date={note_item.date} body={note_item.body} />
  )

  return (
    <main>
      <div className="app">
        <div className="search-area">
           <button className="search-btn">Search</button>
           <input placeholder="Search for notes..." />
        </div>
        <h2>Notes by Solace</h2>
        <div className="ui-btns">
          <button>Create a Note</button>
          <button>Delete</button>
        </div>
        <div className="notes-area">
          {noteItems}
        </div>
      </div>
    </main>
  );
}
