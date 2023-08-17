import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {

    const context = useContext(noteContext);
    const { deleteNote } = context;

    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
        <div className="card my-3">
            <div className="card-header fw-bold d-flex align-items-center justify-content-between" style={{backgroundColor:"#4682A9", color:"#f5f5f5"}}>
                {note.title}
                <div className="icons">
                <i className="fa-solid fa-trash mx-2" style={{color:"#f5f5f5"}} onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Note", 'success');}}/>
                <i className="fa-solid fa-pen-to-square mx-2" style={{color:"#f5f5f5"}} onClick={()=>{updateNote(note)}}/>
                </div>
            </div>
            <div className="card-body" >
                <p className="card-text">{note.description}</p>
                <span className="card-text" style={{color:"grey", fontSize:"12px"}}>#{note.tag}</span>
            </div>
        </div>
        </div>
    )
}

export default Noteitem
 
