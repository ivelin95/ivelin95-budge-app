//save all incoming data
const data = {
    allItems: {
        exp: [],
        inc: []
    },
    totals: {
        exp: 0,
        inc: 0
    },
    budget: 0,
    percent: -1

};
//save auto generated id 

var myId=[0]


function getInputValues(e){
    const type =document.getElementById('tpy');
    const description =document.querySelector('.add__description').value;
    const numb =document.querySelector('.add__value').value;
    //generate id 
    var id 
    var last_element = myId[myId.length - 1];
    id = last_element + 1 ;
    myId.push(id)
    if(type.options[type.selectedIndex].value==='exp'){
        data.allItems.exp.push(numb);
        data.totals.exp+=parseInt(numb)
        console.log(data.totals.exp)
        let addToExpenses=data.allItems.exp
        data.budget= data.budget-  data.allItems.exp
       
        renderExpenses(description, addToExpenses ,id )
    }else if (type.options[type.selectedIndex].value==='inc'){
        data.allItems.inc.push(numb)
        data.totals.inc+=parseInt(numb)
        data.budget+=parseInt(numb)
         let addToIncome=data.allItems.inc;
     
        renderIncome(description,addToIncome , id)
        
    }
   
    //render income and expenses
    renderTotal();
    console.log(data)
}
//render to income
function renderIncome(description,addToIncome,id){
    
    const markup=`<div class="item clearfix check" data-id="${id}" id="inc" data-value="${addToIncome}">
    <div class="item__description">${description}</div>
    <div class="right clearfix">
        <div class="item__value">${addToIncome}</div>
        <div class="item__delete">
            <button class="item__delete--btn" onclick="deleteRows(${addToIncome})"><i class="ion-ios-close-outline"></i></button>
        </div>
    </div>
</div>`

document.querySelector('.income__list').insertAdjacentHTML('afterbegin', markup);
data.allItems.inc=[];


};
//render expenses
function renderExpenses(description, addToExpenses , id){
   
   const markup=`  <div class="item clearfix check" data-id="${id}" id="exp"  data-value="${addToExpenses}">
   <div class="item__description">${description} </div>
   <div class="right clearfix">
       <div class="item__value">${addToExpenses}</div>
       
       <div class="item__delete">
           <button class="item__delete--btn" onclick="deleteRows(${addToExpenses});" ><i class="ion-ios-close-outline"></i></button>
       </div>
   </div>
</div>`

document.querySelector('.expenses__list').insertAdjacentHTML('afterbegin', markup);
data.allItems.exp=[];

};

//update current mounth
window.onload= (e) => {
   
      var d = new Date();
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      document.querySelector('.budget__title--month').innerHTML = months[d.getMonth()];
}

//delete__rows and update UI
function deleteRows(){
    let clickedDataId=parseInt(event.target.parentElement.parentElement.parentElement.parentElement.dataset.id)
    let id=event.target.parentElement.parentElement.parentElement.parentElement.id;
    let value = parseInt(event.target.parentElement.parentElement.parentElement.parentElement.dataset.value);

    for(let i = 0 ; i<myId.length; i++){
       if(myId[i]===clickedDataId){
        var elem = document.querySelector('[data-id="'+clickedDataId+'"]')
          if(id=== 'inc'){
             elem.remove();
            data.budget -= value ;
            data.totals.inc-= value;
           // console.log(data.budget);
            document.querySelector('.budget__value').innerHTML= data.budget;
            document.querySelector('.budget__income--value').innerHTML=data.totals.inc;
            console.log(data.totals.inc)
          }else if (id==="exp"){
            console.log("check exp")
            elem.remove();
            data.budget += value ;
            data.totals.exp = data.totals.exp - value;
            //console.log(data.budget);
            document.querySelector('.budget__value').innerHTML= data.budget;
            document.querySelector('.budget__expenses--value').innerHTML=data.totals.exp
          }
        
    }
  
    }
};

function renderTotal(){
        income=data.totals.inc  ;
        expense=data.totals.exp;

document.querySelector('.budget__value').innerHTML= data.budget ;
document.querySelector('.budget__income--value').innerHTML=income;
document.querySelector('.budget__expenses--value').innerHTML=expense;
};


//eventlistener
document.querySelector('.add__btn').addEventListener('click' , getInputValues);


