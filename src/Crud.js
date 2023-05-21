import React, { useRef, useState } from 'react'
import './Crud.css'

function Crud() {
    const list = [
        {
            id: 1, 
            title: "Sample Book 1",
            author: "Test Author 1",
            year: "2000",
            isbn:"1234-5678-9812"
        },
        {
            id: 2, 
            title: "Sample Book 2",
            author: "Test Author 2",
            year: "2010",
            isbn:"9876-5678-9812"
        },
    ]
    const [lists, setList] = useState(list)
    const [updateState, setUpdateState] = useState(-1)
    return(
        <>
        <div className='crud'>
            <div>
            <AddList setList = {setList}/>
            <form onSubmit={handleSubmit}>
            <table>
            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Year</th>
                                <th>ISBN</th>
                            </tr>
                        </thead>
                {
                    lists.map((current) => (
                        updateState === current.id ? <EditList current={current} lists={lists} setList={setList}/> :
                       
                        <tbody>
                        <tr>
                            <td>{current.title}</td>
                            <td>{current.author}</td>
                            <td>{current.year}</td>
                            <td>{current.isbn}</td>
                            <td>
                                <button className='edit' onClick={() => handleEdit(current.id)}>Edit</button>
                                <button className='delete' type='button' onClick={() => handleDelete(current.id)}>Delete</button>
                            </td>
                        </tr>
                        </tbody>
                        
                    ))
                }
            </table>
            </form>
            </div>
        </div>
        </>
    )

    function handleEdit(id) {
        setUpdateState(id)
    }
    function handleDelete(id) {
        const newlist = lists.filter((li) => li.id !== id)
        setList(newlist)
    }
    function handleSubmit(event) {
        event.preventDefault()
        const title = event.target.elements.title.value
        const author = event.target.elements.author.value
        const year = event.target.elements.year.value
        const isbn = event.target.elements.isbn.value
        const newlist = lists.map((li) => (
            li.id === updateState ? {...li, title:title, author:author, year:year, isbn:isbn} : li
        ))

        setList(newlist)
        setUpdateState(-1)
    }
}

function EditList({current, lists, setList}) {
    function handInputTitle(event) {
        const value = event.target.value;
        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, title:value} : li
        ))

        setList(newlist)
    }
    function handInputAuthor(event) {
        const value = event.target.value;
        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, author:value} : li
        ))

        setList(newlist)
    }

    function handInputYear(event) {
        const value = event.target.value;
        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, year:value} : li
        ))

        setList(newlist)
    }

    function handInputISBN(event) {
        const value = event.target.value;
        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, isbn:value} : li
        ))

        setList(newlist)
    }


    return(
        <tr>
            <td><input  style={{fontStyle:'italic'}} type="text" onChange={handInputTitle} name='title' value={current.title}/></td>
            <td><input type="text" onChange={handInputAuthor} name='author' value={current.author}/></td>
            <td><input type="text" onChange={handInputYear} name='year' value={current.year}/></td>
            <td><input type="text" onChange={handInputISBN} name='isbn' value={current.isbn}/></td>
            <td><button type='submit'>Update</button></td>
        </tr>
    )
}

function AddList({setList}) {
    const titleRef = useRef()
    const authorRef = useRef()
    const yearRef = useRef()
    const isbnRef = useRef()


    function handleSubmit(event) {
        // if(title == " "){
        //     alert("enter the title")
        // }
        event.preventDefault();
         const title = event.target.elements.title.value;
        const author = event.target.elements.author.value;
        const year = event.target.elements.year.value;
        const isbn = event.target.elements.isbn.value;
        const newlist = {
            id: 3, 
            title,
            author,
            year,
            isbn
        }
        setList((prevList)=> {
            return prevList.concat(newlist)
        })
        titleRef.current.value = ""
        authorRef.current.value = ""
        yearRef.current.value = ""
        isbnRef.current.value = ""
    }
    return(
        <>
        <h1>Book-List</h1>
        <form className='addForm' onSubmit={handleSubmit}>
           <label>Book Title: <input  type="text" name="title"  placeholder="Enter Book Title" maxLength={"25"} ref={titleRef} /><label for="name"><span className='required'>*</span></label></label><br/>
           <label>Book Author: <input type="text" name="author" placeholder="Enter Book Author" maxLength={"25"}  ref={authorRef}/></label><br/>
           <label>Publish Year: <input type="date" name="year" placeholder="Enter Year Published"  ref={yearRef}/></label><br/>
           <label>ISBN No: <input type="number" name="isbn" placeholder="Enter ISBN"  ref={isbnRef}/></label><br/>
           <button type="submit">Add</button>
        </form>
        <h5 style={{color:'red', paddingLeft:'10px'}}>* mandatory field</h5>
        </>
    )
}

export default Crud;










