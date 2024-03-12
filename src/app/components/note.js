

export default function Note(params) {

    return(
       <div className="note">
        <h6 className="note-title">{params.title}</h6>
        <span className="note-details">by {params.author} {params.date}</span>
        
        <p className="note-body">{params.body}</p>
       </div> 
    );
}