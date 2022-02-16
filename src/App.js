import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';

function App() {

 /* useState tanımlaması */
const [country, setCountry] = useState([]);
const [searchedCountries, setSearchedCountries] = useState([]);
const [filterType, setFilterType] = useState('name');


/* API'yi bir kere kullanarak hem filtreleme state'ine hem de ana state'e verileri geçir */
const countryGet = () => {
  axios.get('https://restcountries.com/v2/all')
  .then((response)=> {
    setCountry(response.data);
    setSearchedCountries(response.data);
  })
}


  /* Tek seferlik API isteği ile bütün ülkeleri çekip, listele ve state'lere aktar. */
useEffect(() => {
    setTimeout(() => {
    countryGet();
  }, 0)
}, []);


/* Arama fonksiyonunda eğer hiçbir harf yazılı değilse veya yazılıp silinmişse bütün ülkeler otomatik stateden çekilip tekrar listelenir, kelime girildiğinde filtreleme işlemi başlar */
function searchCountry(event) {
  const eventString = event.target.value

  const convertNumber = eventString.split(' ').filter(function(n) { return n !== '' }).length;
  if(convertNumber === 0){
    setTimeout(() => {
      setCountry(country)
    }, 50)
  }
  else if(filterType === 'capital'){
    const filtered = searchedCountries?.filter(country => {
      return country.capital?.toLowerCase().includes(eventString?.toLowerCase())
     })
     setCountry(filtered);
 }
 else if(filterType === 'name'){
  const filtered = searchedCountries?.filter(country => {
    return country.name?.toLowerCase().includes(eventString?.toLowerCase())
   })
   setCountry(filtered);
 }
}


  return (
    <div className="App">
      <header className="App-header">
        <h1>Fintech Country Filter <span>made by Osman Hakan</span></h1>
        <h2>Now you are searching with <span>{filterType}.</span></h2>
      <div className="row d-flex justify-content-center">
      <div className="col-md-6">
      <div className="input-group">
      <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Change Search Type
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" onClick={(e) => setFilterType('name')}>Search with country name</a>
    <a class="dropdown-item" onClick={(e) => setFilterType('capital')}>Search with country capital</a>
  </div>
</div>
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
    {country?.map((value) => {
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
