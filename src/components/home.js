import React, { useEffect, useState } from 'react';
import { Layout, message, Input, Spin, Button } from 'antd';
import HeaderComp from './Header';
import axios from 'axios';
import { BookOutlined, UserOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;
const Home = () => {
    const [loading, setLoading] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [books, setBooks] = useState([]);
    const [selectedMenuItem, setSelectedMenuItem] = useState('1');
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
    const author = useFormInput('');
    const title = useFormInput('');
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
                    author.value = '';
                    title.value = '';
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
    const deleteBook = id =>{
        console.log(id)
        setLoading(true);
        axios.delete('https://ireportbackend.herokuapp.com/deletebook/'+ id)
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
                                <div className='inputContainer'><BookOutlined/> Author<Input size='small' {...author} /></div>
                                <div className='inputContainer'><UserOutlined/> Title<Input size='small' {...title} /></div>
                                <Button type='primary' onClick={submitBook}>Add book</Button>
                            </form>)
                            : selectedMenuItem === '2' ?
                                (<div className='booksContainer'>
                                    {
                                        books.map(book => {
                                            return <div className='bookRow'><span className='deleteBookButton' onClick={()=>deleteBook(book.id)}>delete</span><BookOutlined/>{book.title} <UserOutlined/>{book.author}</div>
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