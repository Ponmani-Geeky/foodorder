let name=document.getElementById('name');
let mailid=document.getElementById('Email');
let mobileno=document.getElementById('mobile');
let functiontype=document.querySelector('.functiontype');
let panelfood=document.querySelector('.planel-food');
let foodform =document.querySelector('.signup-form');
let fooddiv =document.querySelector('.food-form');
let fooddetail =document.querySelector('.food-detail');
let foodimg =document.querySelector('.food-image');
let nameerror=false;
let mailiderror1=false;
let mailiderror2=false;
let mobileerror1=false;
let mobileerror2=false;

//span tag
let nameerr=document.getElementById('nameerr');
let mailerr=document.getElementById('mailerr');
let mobileerr=document.getElementById('mobileerr');

//submit button
let submit=document.querySelector('.btn-submit');
submit.addEventListener("click",addfoodlist);

//onfocus
// name.addEventListener("onfocus",focusbox);
// mailid.addEventListener("onfocus",focusbox);
// mobileno.addEventListener("onfocus",focusbox);
// functiontype.addEventListener("onfocus",focusbox);


function focusbox(event){
  console.log('........event',event.target.id);
  let currentfocus=event.target.id;
  if(currentfocus==='name'){
          name.classList.remove('emptybox');
          nameerr.innerHTML='';
  }
  if(currentfocus==='Email'){
    mailid.classList.remove('emptybox');
    mailerr.innerHTML='';
}
if(currentfocus==='mobile'){
    mobileno.classList.remove('emptybox');
    mobileerr.innerHTML='';
}

}



let foodlist={};
function addfoodlist(event){
    foodlist=[];
    console.log('inside----function')
    event.preventDefault();
if(name.value===""){
    name.classList.add('emptybox');
    nameerr.innerHTML='Please Enter the name';
    nameerror=false;
}
else{
    nameerror=true;
}
if(mailid.value===""){
    mailid.classList.add('emptybox');
    mailerr.innerHTML='Please Enter the mailid';
    mailiderror1=false;
}
else{
    mailiderror1=true;
}
let mail=/[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
if(!mail.test(mailid.value)){
    mailid.classList.add('emptybox');
    mailerr.innerHTML='Please Enter the Vaild Mailid';
    mailiderror2=false;
}
else{
    mailiderror2=true;
}
if(mobileno.value===""){
    mobileno.classList.add('emptybox');
    mobileerr.innerHTML='Please Enter the MobileNo';
    mobileerror1=false;
}
else{
    mobileerror1=true;
}

let mobile=/^((\+)?(\d{2}[-]))?(\d{10}){1}?$/;
if(!mobileno.value.match(mobile)){
    mobileno.classList.add('emptybox');
    mobileerr.innerHTML='Please Enter the Valid Mobileno';
    mobileerror2=false;
}
else{
    mobileerror2=true;
}
console.log('nnnnnnnn',name.value)
// foodlist.push(name.value);
// foodlist.push(mailid.value);
// foodlist.push(mobileno.value);
// foodlist.push(functiontype.value);
console.log(nameerror);
console.log(mailiderror1)
console.log(mailiderror2)
console.log(mobileerror1)
console.log(mobileerror2)
if(nameerror & mailiderror1 & mailiderror2 & mobileerror1 & mobileerror2){
foodlist={
    name:name.value,
    mailid:mailid.value,
    mobileno:mobileno.value,
    functiontype:functiontype.value
}

console.log('fooodddlist>>>>>>>>>>>>>>>>>>>>>>>>>>>',foodlist)
//  dbupdate();
 placedorder();
console.log('stringfyyyy',JSON.stringify(foodlist));
}
}

//Orderplaced function

    function placedorder(){
        const mediaQuery = window.matchMedia('(min-width:600px)')
            panelfood.style.display='none';
            foodform.style.display='none';
      let thank=document.createElement('h1');
      thank.innerHTML='ThankYou for ordering with us';
      thank.style.color='green';
      fooddiv.appendChild(thank);
      fooddiv.style.marginTop='150px'
      fooddiv.style.textAlign='center';
      fooddiv.style.backgroundColor='white';
      fooddetail.style.backgroundColor='white';
      foodimg.style.marginTop='-125px';
      thank.style.fontFamily='Rubik, sans-serif';
      thank.style.textShadow='10px 10px 10px rgba(0,0,0,.5), 20px 20px 20px rgba(0,0,0,.4), 30px 30px 30px rgba(0,0,0,.1)';


      if(mediaQuery.matches){
        foodimg.style.marginTop='101px';
        fooddiv.style.marginTop='198px';
      }
    }


async function dbupdate(){
    let foodres = await fetch('http://localhost:3000/foodapi/foodsorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(foodlist)
      }).then(response=>{
        // placedorder();
        console.log('resultt>>>>>>>>>>>>', response.json());
      })
      
     
     
}
