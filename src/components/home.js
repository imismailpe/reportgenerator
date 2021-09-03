import React, { useEffect, useState } from 'react';
import { Layout, message, Input, Spin } from 'antd';
import HeaderComp from './Header';
import axios from 'axios';
const { Header, Content, Footer } = Layout;
const Home = () => {
    const [loading, setLoading] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [books, setBooks] = useState([]);
    const [selectedMenuItem, setSelectedMenuItem] = useState('1');
    const handleMenuItemClick = (e) => {
        setIsMenuVisible(false);
        setSelectedMenuItem(e.key);
    }
    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    }
    const getBooks = async () => {
        setLoading(true);
        axios.get('https://ireportbackend.herokuapp.com/books')
            .then(res => {
                setBooks(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                message.error(`${err}`);
                setLoading(false);
            })
    }
    const submitBook = async (e) => {
        e.preventDefault();
        if (author.value && title.value) {
            setLoading(true);
            axios.post('https://ireportbackend.herokuapp.com/addbook',
                {
                    author: author.value, title: title.value
                })
                .then(res => {
                    message.success(res.data.message);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    message.error(`${err}`);
                    setLoading(false);
                });
        }
        else {
            message.warn('Enter all fields');
        }
    }
    useEffect(() => {
        if (selectedMenuItem === '2') {
            getBooks();
        }
    }, [selectedMenuItem]);
    const useFormInput = (initialValue) => {
        const [value, setValue] = useState(initialValue)
        function handleChange(e) {
            setValue(e.target.value)
        }
        return {
            value,
            onChange: handleChange
        }
    }
    const author = useFormInput('')
    const title = useFormInput('')
    const deleteBook = id =>{
        console.log(id)
        setLoading(true);
        axios.get('https://ireportbackend.herokuapp.com/deletebook/'+ id)
            .then(res => {
                message.success(res.data.message);
                getBooks();
            })
            .catch(err => {
                message.error(`${err}`);
                setLoading(false);
            })
    }
    return (
        <>
            <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
                <HeaderComp isMenuVisible={isMenuVisible} toggleMenu={toggleMenu} handleMenuItemClick={handleMenuItemClick} />
            </Header>
            <Content style={{ margin: '24px 16px 0', height: '100%' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    {
                        loading?<Spin/>
                        :selectedMenuItem === '1' ?
                            (<form name='addbookform' onSubmit={submitBook} className='bookForm'>
                                <label>Author</label><Input {...author} />
                                <label>Title</label><Input {...title} />
                                <button type='submit'>Add book</button>
                            </form>)
                            : selectedMenuItem === '2' ?
                                (<div className='booksContainer'>
                                    {
                                        books.map(book => {
                                            return <div className='bookRow'>{book.title} - {book.author}<span className='deleteBookButton' onClick={()=>deleteBook(book.id)}>delete</span></div>
                                        })
                                    }
                                </div>)
                                : 'other content'
                    }
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>ismail</Footer>
        </>
    )
}
export default Home;