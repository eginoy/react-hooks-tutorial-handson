import React , {useState,useEffect,useRef} from 'react';
import {BookDescription} from './BookDescription';
import BookSearchItem from './BookSearchItem';
import {buildSearchUrl,extractBooks} from './BookSearchService'

type BookSearchDialogProps = {
    maxResults: number;
    onBookAdd: (book: BookDescription) => void;
}

const BookSearchDialog = (props: BookSearchDialogProps) => {
    const [books,setBooks] = useState([] as BookDescription[]);
    const titleRef = useRef<HTMLInputElement>(null);
    const authorRef = useRef<HTMLInputElement>(null);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
       titleRef.current?.focus();
    },[])

    useEffect(()=>{
        if(isSearching){
            const url = buildSearchUrl(titleRef.current!.value,authorRef.current!.value,props.maxResults);
            fetch(url)
            .then(res => {
                return res.json();
            })
            .then(json => {
                setBooks(extractBooks(json));
            })
            .catch(err => {
                console.log(err);
            })
        }
        setIsSearching(false);
    },[isSearching])

    const handleSearchClick = () =>{
        if(!titleRef.current!.value && !authorRef.current!.value){
            alert('検索条件を入力してください。')
            return;
        }
        //検索処理
        setIsSearching(true);
    }

    const handleBookAdd = (book: BookDescription) => {
        props.onBookAdd(book);
    }

    const bookItems = books.map((b,idx) => {
        return (
            <BookSearchItem
            description={b}
            onBookAdd={(b) => handleBookAdd(b)}
            key={idx}
            />
        )
    })

    return (
        <div className="dialog">
            <div className="operation">
                <div className="conditions">
                    <input
                        type="text"
                        ref={titleRef}
                        placeholder="タイトルで検索"
                    />
                    <input
                        type="text"
                        ref={authorRef}
                        placeholder="著者名で検索"
                    />
                </div>
                <div className="button-like" onClick={handleSearchClick}>
                    検索
                </div>
            </div>
            <div className="search-results">
                {bookItems}
            </div>
        </div>
    );
};

export default BookSearchDialog;