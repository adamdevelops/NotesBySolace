

export default function NoteItem(params) {

    return(
       <div className="note">
        <h6 className="note-title">{params.title}</h6>
        <span className="note-details">by {params.author} {params.date}</span>
        
        <p className="note-body">{params.body}</p>

        <button onClick={handleClickOpen('edit', params.note)}>Edit Note</button>
        <button className="delete-btn" onClick={handleClickOpen('delete', params.note)}>Delete Note</button>
       </div> 
    );
}