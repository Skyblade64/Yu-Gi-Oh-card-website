import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import React, {useEffect } from 'react';



//api call go brrr
let user = null




export default function App(data){
  
  const trade = async(name,super_id,card_id)=>{
    let partner = document.getElementById(super_id).value

    var url = "http://ec2-3-21-233-165.us-east-2.compute.amazonaws.com/~skyblade/collectionremove.php?name=&id="+super_id;
    url = url.split(' ').join('_');
    const data2 = await (fetch(url)).then(display_coolection())


    var url = "http://ec2-3-21-233-165.us-east-2.compute.amazonaws.com/~skyblade/addcollection.php?name="+name+"&id="+card_id+"&user="+partner;
    url = url.split(' ').join('_');

    
    const data = await (fetch(url)).then(display_coolection())


  }
  function login(){

    console.log(document.getElementById("username").value)
    user = document.getElementById("username").value
    display_coolection()
    display_cart()
  }

  function logout(){

    //console.log(document.getElementById("username").value)
    user = null;
    display_coolection()
    display_cart()
  }


  function linkTcgplayer(name){ //send to tcg player
    let url = name.split(' ').join('+');
    
    window.location.href = "https://www.tcgplayer.com/search/all/product?q="+url+"&view=grid"; 
  }

  function linkAmazon(name){ //send to amazon
    let url = name.split(' ').join('+');
    
    window.location.href = "https://www.amazon.com/s?k="+url+"&ref=nb_sb_noss"; 
  }

  function linkCardMarket(name){
    let url = name.split(' ').join('+');
    
    window.location.href = "https://www.cardmarket.com/en/YuGiOh/Products/Search?searchString="+url; 
  }

  const removeFromCart = async(super_id)=>{
   
    var xmlhttp = new XMLHttpRequest();
    var url = "http://ec2-3-21-233-165.us-east-2.compute.amazonaws.com/~skyblade/cartremove.php?id="+super_id;
    url = url.split(' ').join('_');
    const data = await (fetch(url)).then(display_cart()).then(display_cart()).then(display_cart()).then(display_cart())
    console.log(url);
    // xmlhttp.onreadystatechange = function() {
    //   if (this.readyState == 4 && this.status == 200) {
    //       }                        
    //     };
    //     xmlhttp.open("POST", url, true);
    //     xmlhttp.send();
                 
        
    }

  const display_cart = async()=>{ //display our cart of cards
    let other_data=[]
    try {
      var url = "http://ec2-3-21-233-165.us-east-2.compute.amazonaws.com/~skyblade/getcart.php?user="+user;
        console.log(url)
          const data = await (await fetch(url)).json().then()
          // console.log(url)
          //console.log(data)
        other_data=data
              
          setCart(data)
          // console.log(cart)
        }
        catch (err) {
        console.log(err.message)
        }
        finally {
          let tcgg = 0
          let amazon =0
          let cardmarket = 0
          let min=0
          //console.log(other_data.length)
          // console.log(data)
          // console.log(other_data.tcg_player_price)
          for (let i = 0; i<other_data.length;i++){
           //console.log(other_data[i])
            // console.log(card.tcg_player_price)
            tcgg+=other_data[i].tcg_player_price
            amazon+=other_data[i].amazon_price
            cardmarket+=other_data[i].cardmarket_price
            min += Math.min(other_data[i].tcg_player_price,other_data[i].amazon_price,other_data[i].cardmarket_price)
          }
          setTcgTotal(tcgg)
          setAmazonTotal(amazon)
          setCarkmarketTotal(tcgg)
          setTotal(min)
          console.log(tcg_total)
       }
        

      }

  
  const add_cart = async (name, id,tcg,amazon,cardmartet)=>{
    console.log("id is ",id)
   
    var xmlhttp = new XMLHttpRequest();
    var url = "http://ec2-3-21-233-165.us-east-2.compute.amazonaws.com/~skyblade/addcart.php?name="+name+"&id="+id+"&user="+user+"&tcg="+tcg+"&amazon="+amazon+"&cardmarket="+cardmartet;
    url = url.split(' ').join('_');
    const data = await (fetch(url)).then(display_cart()).then(display_cart()).then(display_cart())
    console.log(url);
   
    
    // xmlhttp.onreadystatechange = function() {
    //   if (this.readyState == 4 && this.status == 200) {
    //       }                        
    //     };
    //     xmlhttp.open("POST", url, true);
    //     xmlhttp.send();
                 
        
    }

const display_coolection = async()=>{ //display our collection of cards
  try {
    console.log(user)
    var url = "http://ec2-3-21-233-165.us-east-2.compute.amazonaws.com/~skyblade/getcollection.php?user="+user;
      
        const data = await (await fetch(url)).json()
        //  console.log(url)
        //  console.log(data)
            
            
        setCollection(data)
        console.log(collection)
      }
      catch (err) {
      console.log(err.message)
      }
}



const add_collection = async (name, id)=>{

 
  var xmlhttp = new XMLHttpRequest();
  var url = "http://ec2-3-21-233-165.us-east-2.compute.amazonaws.com/~skyblade/addcollection.php?name="+name+"&id="+id+"&user="+user;
  url = url.split(' ').join('_');
  const data = await (fetch(url)).then(display_coolection())
  console.log(url);
  // xmlhttp.onreadystatechange = function() {
  //   if (this.readyState == 4 && this.status == 200) {
  //       }                        
  //     };
  //     xmlhttp.open("POST", url, true);
  //     xmlhttp.send();
               
      
  }
  

  const recommend = async (name, id)=>{

 
    var xmlhttp = new XMLHttpRequest();
    var url = "http://ec2-3-21-233-165.us-east-2.compute.amazonaws.com/~skyblade/addreccomendation.php?name="+name+"&id="+id+"&user="+user;
    url = url.split(' ').join('_');
    const data = await (fetch(url)).then(display_coolection())
    //console.log(url);
    // xmlhttp.onreadystatechange = function() {
    //   if (this.readyState == 4 && this.status == 200) {
    //       }                        
    //     };
    //     xmlhttp.open("POST", url, true);
    //     xmlhttp.send();
                 
        
    }

//Set our search results
const  fill_search= async(data)=>{
  var url = "http://ec2-3-21-233-165.us-east-2.compute.amazonaws.com/~skyblade/getrecc.php";
  const recs = await (await fetch(url)).json()//.then(display_coolection())
  var url2 = "http://ec2-3-21-233-165.us-east-2.compute.amazonaws.com/~skyblade/allcollection.php";
  const ownedcards = await (await fetch(url)).json()//.then(display_coolection())
  //console.log(recs)
  //displayResults = null
  console.log(data)
  let cards = data.data
  //var keys = Object.keys(data)
  //console.log('test')
  //let cards = data[keys]
  //console.log("data type ",type(cards))
  //console.log(cards)
  
  let results = []
  for (const card of cards) {
    //console.log(card)
//    console.log(card[11])
    let name = card.name
    //console.log(name)
//    console.log(card.name)
    let desc = card.desc
    //console.log(desc)
    //console.log(card.card_images)
    let images = card.card_images[0].image_url
    //console.log(images)
    let prices = card.card_prices[0]
    let id = card.id
    //let prices = card.card_prices
    //console.log(prices)
    let recomendations =[]
    let owned = []
    

    for (const own of ownedcards){
      if (own.card_id===id){
        console.log(own.user)
        console.log(owned)
        // console.log(own.user in recomendations)
        // console.log("test" in recomendations)
        if(!(own.user in owned)){
           owned.push(own.user)
        }
      }
    }


    for (const rec of recs){
      if (rec.card_id===id){
        // console.log(rec.user)
        // console.log(recomendations)
        // console.log(rec.user in recomendations)
        // console.log("test" in recomendations)
        if(!(rec.user in recomendations)){
           recomendations.push(rec.user)
        }
      }
    }
    owned = [...new Set(owned)]
    recomendations = [...new Set(recomendations)]
    var cardDict = {};
    cardDict['name'] = name
    //console.log('test5')
    cardDict['effect'] = desc
    //console.log('test6')
    cardDict['img'] = images
    cardDict['id'] = id
    //console.log('test7')
    cardDict['cardmarket_price'] = prices.cardmarket_price
    cardDict['tcg_player_price'] = prices.tcgplayer_price
    cardDict['amazon_price'] = prices.amazon_price
    cardDict['recomendations'] =recomendations
    cardDict['owned'] =owned
    //console.log(cardDict)
//    let cardDict = {'name':name,'effect':effect,'img':img,'prices':prices}
    //console.log('test 88')
    //console.log(cardDict)
    // setSearch((displayResults) =>{
    //   console.log('test4')
    //   console.log(displayResults)
    //   return [
    //     ...displayResults,
    //     cardDict]
    //   })
    results.push(cardDict)
  }
  setSearch(results)
  // console.log(results)
}





  const handleClick = async () => {
    let name = document.getElementById('cardname').value
    let attribute = document.getElementById('attribute').value
    let frame = document.getElementById('frame').value
    let set = document.getElementById('set').value
//    console.log(name)
    let url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?'
    if (name!=""){
      url += "name="+name
    }
    if (attribute!='all'){
      url+='&attribute=' + attribute
    }
    if (frame!='all'){
      url+='&type=' + frame
    }
    if (set!=''){
      // set = set.split(' ').join("%")
      url+='&cardset=' + set
    }
    //url = url.split(' ').join('_');
    console.log(url)
    try {

        const data = await (await fetch(url)).json()
        console.log(url)
        console.log(data)
        
        
        setData(data)
        fill_search(data)
        console.log(displayResults)


    } catch (err) {
        //console.log(err.message)
    }

  }
//  setSearch([...search, {name:name, image:image, effect:effect},])
  const [newItem, setNewItem] = useState("")
  const [searchResults, setData] = useState(null);
  const [displayResults, setSearch] = useState([{name:"Dark Magician", recomendations:["test"],owned:["test"],img:"46986414.jpg"}])
  const [collection, setCollection] = useState([{name:"Dark Magician",img:"46986414.jpg"}])
  const [cart, setCart] = useState([{name:"Dark Magician",img:"46986414.jpg"}])
  const [tcg_total, setTcgTotal] = useState(0)
  const [amazon_total, setAmazonTotal] = useState(0)
  const [cardmarket_total, setCarkmarketTotal] = useState(0)
  const [total, setTotal] = useState(0)
  const [load, isLoading] = useState(0)

  return <>
  <form className = "login"> 
    <div className = "logindiv">
    <label htmlFor='username'>Username</label> 
    <input id = "username"></input>
    <button type="button" onClick={login} className='search'>Log in</button>
    <button type="button" onClick={logout} className='search'>Log out</button>
    </div>
    </form>
  <form className = "search"> 
    <div className = "searchdiv">
    <label htmlFor='cardname'>Card Name</label>
    <input id = "cardname"></input>
    <label>
       Attribute:
       <select id = 'attribute'>
           <option value="all">All</option>
           <option value="light">Light</option>
           <option value="dark">Dark</option>
           <option value="water">Water</option>
           <option value="fire">fire</option>
           <option value="earth">Earth</option>
           <option value="wind">Wind</option>
           <option value="divine">Divine</option>
           <option value="laugh">Laugh</option>
       </select>
   </label>

   <label>
       Card Frame:
       <select  id ='frame'>
           <option value="all">All</option>
           <option value="normal monster">Normal monster</option>
           <option value="effect monster">Effect monster</option>
           <option value="synchro monster">Synchro monster</option>
           <option value="xyz monster">XYZ monster</option>
           <option value="Pendulum Normal Monster">Pendulum Normal Monster</option>
           <option value="Pendulum Effect Monster">Pendulum Effect Monster</option>
           <option value="link monster">Link monster</option>
           <option value="spell card">Spell</option>
           <option value="trap card">Trap</option>
       </select>
   </label>
    <label htmlFor='set'>Set</label>
    <input id = "set"></input>
    </div>
    <button type="button" onClick={handleClick} className='search'>Search</button>
  </form>
  <h1 className='header'>Search Results</h1>
  <ul className='list'>
    {displayResults.map(result =>

      <li key={result.id}>
        <img className = "thumbnail" src={result.id+".jpg"} alt="logo" />
        <label id= {result.name}>
          {result.name}
          <p>Amazon Price: {result.amazon_price} tcg_player_price Price: {result.tcg_player_price} Cardmarket price: {result.cardmarket_price}</p>
          
          {result.recomendations.map(rec =>
          <p>Reccomended by: {rec}</p>
            )}
            {result.owned.map(own =>
          <p>Owned by: {own}</p>
            )}
          <button  onClick={e => add_collection(result.name,result.id,result.effect)} className='btn btn-danger'>Add to Collection</button>
          <button  onClick={e => add_cart(result.name,result.id,result.tcg_player_price,result.amazon_price,result.cardmarket_price)} className='btn btn-danger'>Add to Cart</button>
          

        </label>
      </li>

      )}
  
  </ul>

  <h1 className='header'>collection</h1>
  <ul className='list'>
    {collection.map(result =>

      <li key={result.super_id}>
        <img className = "thumbnail" src={result.card_id+".jpg"} alt="logo" />
        <label id= {result.name}>
          {result.name}
        </label>
        <button  onClick={e => recommend(result.name,result.card_id,result.effect)} className='btn btn-danger'>Reccomend Card</button>
        <label htmlFor={result.super_id}>Card Name</label>
        <input id = {result.super_id}></input>
        <label></label>
        <button  onClick={e => trade(result.name,result.super_id,result.card_id)} className='btn btn-danger'>Trade Card</button>

      </li>

      )}
  
  </ul>

  <h1 className='header'>cart</h1>
  <ul className='list'>
    {cart.map(result =>
    

      <li key={result.super_id}>
        <img className = "thumbnail" src={result.id+".jpg"} alt="logo" />
        <label id= {result.name}>
          {result.name}
          <p>Amazon Price: {result.amazon_price} tcg_player_price Price: {result.tcg_player_price} Cardmarket price: {result.cardmarket_price}</p>
        </label>
        <button onClick={e => linkTcgplayer(result.name)} className='btn btn-danger'>Go to TCG Player</button>
        <button onClick={e => linkAmazon(result.name)} className='btn btn-danger'>Go to Amazon</button>
        <button onClick={e => linkCardMarket(result.name)} className='btn btn-danger'>Go to Cardmarket</button>
        <button onClick={e => removeFromCart(result.super_id)} className='btn btn-danger'>Remove from cart</button>
      </li>

      )}
      <p>total tcg:{tcg_total} total amazon:{amazon_total} total cardmarket:{cardmarket_total} total:{total}</p>
  
  </ul>
  </>
  return "hi";
}
/*
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}
*/

//export default App
