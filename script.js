let place=document.querySelector(".place");
let temp=document.querySelector(".temp");
let humidity=document.querySelector(".humidity");
let day=document.querySelector(".day");
let emoji=document.querySelector(".weatherEmoji");
let error=document.querySelector(".error");
let card=document.querySelector(".card");
let btn=document.querySelector(".btn");
let input=document.querySelector(".input");
const key = "YOUR_OPENWEATHER_API_KEY"; 
const imageKey = "YOUR_UNSPLASH_API_KEY";
input.addEventListener("keydown",(event)=>{
    if(event.key=="Enter") work();
})
btn.addEventListener("click",()=>{
   work();
})
const work=()=>{
    let city=input.value;
    input.value="";
    if(city){
        getData(city);
    }
    else{
        card.style.display="none";
        error.style.display="flex"
    }
}
const getData=async(city)=>{
    let URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    let response=await fetch(URL);
    if(!response.ok){
        card.style.display="none";
        error.style.display="flex";
        return;
    }
    let readableData=await response.json();
    updateData(readableData);   
    updateImage(city);
}
const updateData=(data)=>{
    card.style.display="flex";
    error.style.display="none";
    place.textContent=data.name;
    day.textContent=data.weather[0].description;
    humidity.textContent=data.main.humidity+" %";
    temp.textContent=Math.round(data.main.temp-273.15)+"°C";
    let emojiId=data.weather[0].icon;
    if(emojiId=="11d"||emojiId=="11n") emoji.textContent="⛈️";
    else if(emojiId=="09d"||emojiId=="09n") emoji.textContent="🌦️";
    else if(emojiId=="10d"||emojiId=="10n") emoji.textContent="🌧️";
    else if(emojiId=="13d"||emojiId=="13n") emoji.textContent="🌨️";
    else if(emojiId=="50d"||emojiId=="50n") emoji.textContent="🍃";
    else if(emojiId=="01d"||emojiId=="01n") emoji.textContent="☀️";
    else if(emojiId=="02d"||emojiId=="02n") emoji.textContent="☀️";
    else if(emojiId=="03d"||emojiId=="03n") emoji.textContent="☁️";
    else if(emojiId=="04d"||emojiId=="04n") emoji.textContent="☁️";
    else emoji.textContent="❓"   
}
let img=document.querySelector(".image");
const updateImage=async(city)=>{
    const URL=`https://api.unsplash.com/search/photos?query=${city}&client_id=${imageKey}`;
    let response=await fetch(URL);
    if(!response.ok){
        return;
    }
    let readableData=await response.json();
    const imageData=readableData.results[0].urls.regular;
    card.style.backgroundImage = `url('${imageData}')`;
    card.style.backgroundSize = "cover";
    card.style.backgroundPosition = "center";
}