/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import { useUser } from '../lib/customHooks';
import axios from 'axios'
import { API_ROUTES } from '../utils/constants';
import { getTokenFromLocalStorage } from '../lib/common';
import FormData from 'form-data'
import Form from './Form'
import '../../src/index.css'
import SearcIcon from '../search.svg'

const TableHeader = () => {
  return(
      <thead>
          <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Edit</th>
          </tr>
      </thead>
  )
}
const TableBody = ({contactData, editContact}) => {
  const [tableState, setTableState] = useState('')
  const initialState = {
      name: '',
      phone_number: ''
  }
  const [state, setState] = useState(initialState)


  return <tbody>{contactData.map((row, index) => {
      
      return(
        
          <tr key={index}>
              <td>{tableState===row.id ? <input
              type="text"
              name= "name"
              id="name"
              onChange={(e) => setState(prev => ({
                  ...prev, name: e.target.value
              }))}
              defaultValue={row.name}/>  : row.name}
              </td>
              <td>{tableState===row.id ? <input
              type="text"
              name= "phone_number"
              id="phone_number"
              onChange={(e) => setState(prev => ({
                  ...prev, phone_number: e.target.value
              }))}
              defaultValue={row.phone_number}/>  : row.phone_number}
              </td>
              <td>{tableState===row.id ? <button onClick={() => {
                  editContact(state, row.id)
                  setTableState('')
              }}>Save</button>: <button onClick={() => setTableState(row.id)}>Edit</button>}
                  
              </td>
          </tr>
      )
  })}</tbody>
  
}
const SearchBar = ({search, searchTerm, setSearchTerm}) => {
  return(
    <div className="search">
        <input
         placeholder="Search for contact"
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
         />
         <img 
         src={SearcIcon}
         alt="search"
         onClick={() => search(searchTerm)}
         />
    </div>
)
}

const Contacts = () => {
    const [data, setData] = useState([])
    const {user, authenticated} = useUser();
    const [contact, setContact] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')

    const token = getTokenFromLocalStorage();
    
    const getData =  () => {
      const config = {
        method: 'GET',
        url: API_ROUTES.GET_ALL_DATA,
        headers: { 
          Authorization: `Bearer ${token}`
        }
      };
      axios(config)
      .then(function (response) {
        setData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    
      
    }
    const editContact = ({name, phone_number}, id) => {
      const data = new FormData();
  
      data.append('name', name);
      data.append('phone_number', phone_number);
      data.append('contact_id', id);
  
      const config = {
        method: 'PUT',
        url: API_ROUTES.PUT_EDIT_CONTACT,
        headers: { 
          Authorization: `Bearer ${token}`
        },
        data : data
      };
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        window.location.reload()
      })
      .catch(function (error) {
        console.log(error);
      });
  
    }
    const handleSubmit = ({name, phone_number}) => {
      const data = new FormData();
  
      data.append('name', name);
      data.append('phone_number', phone_number);
      const config = {
        method: 'POST',
        url: API_ROUTES.POST_ADD_CONTACT,
        headers: { 
          Authorization: `Bearer ${token}`
        },
        data : data
      };
  
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setData([...data, [name, phone_number]])
        window.location.reload()
      })
      .catch(function (error) {
        console.log(error);
      }); 
    }
    const search = (name) => {
      const  config = {
        method: 'GET',
        url: API_ROUTES.SEARCH_CONTACT + name,
        headers: { 
            Authorization: `Bearer ${token}`
        },
      };
      axios(config)
      .then(function (response) {
        setContact([response.data])
        console.log(response.data.name)
      })
      .catch(function (error) {
        console.log(error);
      });
      
    }
    React.useEffect(() => {getData()},[])
    if(!user || !authenticated){
        return (
            <div className="p-16 bg-gray-800 h-screen">
                <div className="text-2xl mb-4 font-bold text-white">Contacts</div>
                <div className="ml-2 w-8 h-8 border-l-2 rounded-full animate-spin border-white" />
            </div>
        )
    }
    return (
      <React.Fragment>
        <SearchBar search={search} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <table>
          <TableHeader/>
          <TableBody contactData={contact.length > 0 ? contact : data} editContact={editContact}/>
        </table>
          <Form handleSubmit={handleSubmit}/>
      </React.Fragment>
  )
    
}

export default Contacts;
