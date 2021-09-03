import React, { useEffect, useState } from 'react';
import { Layout, message } from 'antd';
import HeaderComp from './Header';
import axios from 'axios';
const { Header, Content, Footer } = Layout;
const Home = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [books, setBooks] = useState([]);
    const [selectedMenuItem, setSelectedMenuItem] = useState('1');
    const handleMenuItemClick = (e) => {
        setIsMenuVisible(false);
        setSelectedMenuItem(e.key);
    }
    const toggleMenu = () => {
        console.log("inside toggleMenu")
        setIsMenuVisible(!isMenuVisible);
    }
    const getBooks = async () => {
        axios.get('https://ireportbackend.herokuapp.com/books')
            .then(res => {
                setBooks(res.data)
            })
            .catch(err => console.log(err))
    }
    const submitBook = async (e) => {
        e.preventDefault();
        const author = e.target.author.value;
        const title = e.target.title.value;
        if(author && title){
            axios.post('https://ireportbackend.herokuapp.com/books',
            {
                author, title
            })
            .then(res => {
                message.success(res.data);
            })
            .catch(err => console.log(err));
        }
        else{
            message.warn('Enter all fields');
        }
    }
    const showBookForm = () => {
        return (
            <form name='addbookform' onSubmit={submitBook}>
                <label>Author</label><input type='text' name='author' />
                <label>Title</label><input type='text' name='title' />
                <input type='submit'>Add book</input>
            </form>
        )
    }
    useEffect(() => {
        if (selectedMenuItem === '2') {
            getBooks();
        }
    }, [selectedMenuItem]);
    return (
        <>
            <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
                <HeaderComp isMenuVisible={isMenuVisible} toggleMenu={toggleMenu} handleMenuItemClick={handleMenuItemClick} />
            </Header>
            <Content style={{ margin: '24px 16px 0', height: '100%' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    {
                        selectedReport === '1' ?
                            showBookForm()
                            : selectedReport === '2' ?
                                books.map(book => {
                                    return (<div>{book.title} - {book.author}</div>)
                                })
                                : 'other content'
                    }
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>ismail</Footer>
        </>
    )
}
export default Home;