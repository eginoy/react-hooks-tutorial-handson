import React,{useState} from "react";
import "./App.css";
import { BookToRead } from "./BookToRead";
import {BookDescription} from './BookDescription'
import BookRow from  './BookRow';
import Modal from 'react-modal';
import BookSearchDialog from './BookSearchDialog'

Modal.setAppElement('#root');

const customStyle = {
  overlay:{
    backgroundColor: "rgba(0,0,0,0.8)"
  },
  content:{
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: 0,
    transform: "translate(-50%,-50%)"
  }
}

const dummyBooks: BookToRead[] = [
  {
    id: 1,
    title: "はじめてのReact",
    authors: "ダミー",
    memo: ""
  },
  {
    id: 2,
    title: "React Hooks入門",
    authors: "ダミー",
    memo: ""
  },
  {
    id: 3,
    title: "実践Reactアプリケーション開発",
    authors: "ダミー",
    memo: ""
  }
];

const App = () => {
  const [books,setBooks] = useState([] as BookToRead[]);
  const [modalIsOpen,setModalIsOpen] = useState(false);

  const handleAddClick = () => {
    setModalIsOpen(true);
  }

  const handleModalClose = () => {
    setModalIsOpen(false);
  }

  const handleMemoChange = (id:number,memo:string) =>{
    const newBooks = books.map(b => {
      return b.id === id
      ? {...b, memo: memo}
      : b;
    })
    setBooks(newBooks);
  }

  const handleDeleteClick = (id: number) => {
    const newBooks = books.filter(b => b.id !== id);
    setBooks(newBooks);
  }

  const handleBookAdd = (book: BookDescription) => {
    const newBook: BookToRead = {...book,id: Date.now(), memo: ''}
    const newBooks = [...books,newBook];
    setBooks(newBooks);
    setModalIsOpen(false);
  }

  const bookRows = books.map(b => {
    return (
      <BookRow
        book={b}
        key={b.id}
        onMemoChange={(id,memo) => handleMemoChange(id,memo)}
        onDelete={(id) => handleDeleteClick(id)}
      />
    )
  })
  return (
    <div className="App">
      <section className="nav">
        <h1>読みたい本リスト</h1>
        <div className="button-like" onClick={handleAddClick}>本を追加</div>
      </section>
      <section className="main">
        {bookRows}
      </section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        style={customStyle}
      >
        <BookSearchDialog maxResults={20} onBookAdd={(b) => handleBookAdd(b)} />
      </Modal>
    </div>
  );
};

export default App;
