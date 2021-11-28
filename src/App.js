import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';

function App() {

 /* useState tanımlaması */
const [country, setCountry] = useState([]);

const countryGet = () => {
  axios.get('https://restcountries.com/v2/all')
  .then((response)=> {
    setCountry(response.data);
  })
}


  /* Tek seferlik API isteği ile bütün ülkeleri çekip, listele. */
useEffect(() => {
    setTimeout(() => {
    countryGet();
  }, 0)
}, []);


/* Arama fonksiyonunda eğer hiçbir harf yazılı değilse veya yazılıp silinmişse bütün ülkeler otomatik olarak tekrar listelenir, kelime girildiğinde filtreleme işlemi başlar */
function searchCountry(event) {
  const eventString = event.target.value
  const convertNumber = eventString.split(' ').filter(function(n) { return n !== '' }).length;
  if(convertNumber === 0){
    setTimeout(() => {
      countryGet();
    }, 0)
  }
  else{
  setTimeout(() => {
  axios.get(`https://restcountries.com/v2/capital/${event.target.value}`)
  .then((response)=> {
    /* Eğer aratılan ülke kayıtlı değilse boş bırak. */
       if(response.data.status === 404){
        setCountry([])
        return
      }
        else{
        setCountry(response.data);
      }
   })
  }, 0)
 }
}


  return (
    <div className="App">
      <header className="App-header">
        <h1>Fintech Country Filter <span>made by Osman Hakan</span></h1>
      <div className="row d-flex justify-content-center">
      <div className="col-md-6">
      <div className="input-group">
        <input type="search" id="search" className="form-control rounded" placeholder="Search" aria-label="Search"
         aria-describedby="search-addon" onChange={searchCountry}/>
      </div>
        <div className="list">
    <div className="countries">
   <table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Region</th>
      <th scope="col">Capital</th>
      <th scope="col">Flag</th>
    </tr>
  </thead>
  <tbody>

  {country.map((value) => {
      return (
          <tr >
              <td>{value.name}</td>
              <td>{value.region}</td>
              <td>{value.capital}</td>
              <td><img src={value.flag} alt={value.name}/></td>
          </tr>
        );
      })}
  </tbody>
</table>
</div>
         </div>
        </div>
        </div>
      </header>
    </div>
  );
}

export default App;
