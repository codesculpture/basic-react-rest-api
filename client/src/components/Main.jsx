import axios from 'axios';
import {useRef, useState } from 'react';
import { Input, Button, Table } from 'antd';
import './Main.css';

const { Search } = Input;
const Main = () => {
    const [load, setload] = useState(false);
    const [datas, setdatas] = useState([]);
    const [inpval, setinpval] = useState('');
    const [error, seterror] = useState('');
    const srchbtn = useRef();

    const columns = [{
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
    },
    {
        title: 'Color',
        key: 'color',
        dataIndex: 'color'
    }, 
    {
        title: 'Skill',
        key: 'skill',
        dataIndex: 'skill'
    }
]

    const showall = () => {
        setload(true);
        seterror('');
        srchbtn.current.disabled = true;
        console.log(process.env.REACT_APP_SERVER_URL);
                axios.get(process.env.REACT_APP_SERVER_URL+'/animals').then(res =>{

            if(res.status !== 200) return seterror('Server in Error');
        
            setload(false);

            srchbtn.current.disabled = false;
        
            setdatas(res.data);


        })

    }
    const onSearch = (value) => {
        if(value === ''){
            return seterror('To Search Type Something🙄')
        }
        seterror('');
        console.log(value);
        axios.get(`${process.env.REACT_APP_SERVER_URL}/animals/${inpval}`).then(res =>{
            if(res.data === 'undefined'){
                return seterror('No Matches')
            }
            else{
        seterror('');
        setinpval('');
        setdatas([res.data]);

            }
        })
    }
    const handleChange = (e) => setinpval(e.target.value);

    return (
            <div className="container">
                <div className='title'>Api Animals</div>
                <Search
                className="inp"
      placeholder="Search Animal "
      allowClear
      enterButton="Search"
      size="large"
      style={{width: '50%'}}
      value={inpval}
      onChange={handleChange}
      onSearch={onSearch}
      />
      {datas.length !== 3 && <Button onClick={() => showall()} ref={srchbtn} primary className='srch-btn'> {load ? 'Loading' : 'Show All'}</Button>}
       
       {datas.length > 0 && <Table className="table" columns={columns} pagination={false} dataSource={datas}/>}
       {error && <text className="error">{error}</text>}
       <div style={{'text-align': 'center', padding: '20px'}}>Made With 💖 by <a style={{'text-decoration': 'none', color: 'blue'}} target="_blank" href="https://github.com/codesculpture/">Aravind</a></div>
       <div style={{'text-align': 'center', padding: '0px'}}>For More Info<a style={{'text-decoration': 'none', color: 'blue'}} target="_blank" href="https://github.com/codesculpture/basic-rest-api-react/"> Click to Github</a></div>


       </div>

    )
}

export default Main;
