let isUpdate=false;
let AddressbookObject={};

window.addEventListener('DOMContentLoaded',(event)=>{
    const name= document.querySelector('#name');
    const textError= document.querySelector('.text-error');
    name.addEventListener('input',function(){
        if(name.value.length==0)
        {
            textError.textContent="";
            return;
        }
        try{
            (new AddressbookData()).name=name.value;
            textError.textContent="";
        }
        catch(e)
        {
            textError.textContent=e;
        }
    });

    const salary= document.querySelector('#salary');
    setTextValue('.salary-output',salary.value);
    salary.addEventListener('input',function(){
    setTextValue('.salary-output',salary.value);
 
    });
    checkForUpdate();

    dateError= document.querySelector(".date-error");
    var year= document.querySelector('#year');
    var month= document.querySelector('#month');
    var day=document.querySelector('#day');

    year.addEventListener('input',checkDate);
    month.addEventListener('input',checkDate);
    day.addEventListener('input',checkDate)

    function checkDate()
    { 
    try
    {
        let dates= getInputValueById("#day")+" "+getInputValueById("#month")+" "+getInputValueById("#year");
        dates=new Date(Date.parse(dates));
        (new empPayrollData()).startDate=dates;
        dateError.textContent="";
    }
    catch(e)
    {
        dateError.textContent=e;
    }
    }

});

const checkForUpdate=()=>{
    const AddressbookJSON = localStorage.getItem('editEmp');
    isUpdate=AddressbookJSON?true : false;
    if(!isUpdate) return;
    AddressbookObject=JSON.parse(AddressbookJSON);
    setForm();
}
const setForm=()=>{
    setValue('#name',AddressbookObject._name);
    setSelectedValues('[name=profile]',AddressbookObject._profilePic);
    setSelectedValues('[name=gender]',AddressbookObject._gender);
    setSelectedValues('[name=departement]',AddressbookObject._department);
    setValue('#salary',AddressbookObject._salary);
    setTextValue('.salary-output',AddressbookObject._salary);
    setValue('#notes',AddressbookObject._note);
    let date=stringifyDate(AddressbookObject.startDate).split(" ");
    setValue('#day',date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
}
const setSelectedValues = (propertyValue,value) =>{
    let allItems=document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked=true;
            }
        }
        else if(item.value===value){
            item.checked=true;
        }
    });
}

const save = (event) =>{
    event.preventDefault();
    event.stopPropagation();
    try
    {
        setAddressbookObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    }
    catch(e)
    {
        return;
    }
}
function createAndUpdateStorage(AddressbookData){
    
    //Address book list is array of objects of Addreessbook data
    let AddressbookList= JSON.parse(localStorage.getItem("AddressbookList"));

    if(AddressbookList!=undefined)
    {
        AddressbookList.push(AddressbookData);
    }
    else
    {
        AddressbookList=[AddressbookData];
    }
    alert(AddressbookList.toString());
    localStorage.setItem("AddressbookList",JSON.stringify(AddressbookList));
}

const setAddressbookObject=()=>{
    AddressbookObject._name=getInputValueById('#name');
    AddressbookObject._profilePic= getSelectedValues('[name=profile]').pop();
    AddressbookObject._gender= getSelectedValues('[name=gender]').pop();
    AddressbookObject._department=getSelectedValues('[name=department]');
    AddressbookObject._salary= getInputValueById('#salary');
    AddressbookObject._note=getInputValueById('#notes');
    let date= getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    AddressbookObject.startDate= Date.parse(date);
    //alert(AddressbookData.toString());
    //return addressbookDate;
}
const getSelectedValues=(propertyValue)=>{
    let allItems= document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}
const getInputValueById=(id)=>
{
    let value= document.querySelector(id).value;
    return value;
}
const getInputElementValue=(id)=>{
    let value= document.getElementById(id).value;
    return value;
}
//reset form
const resetForm=()=>{
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day',1);
    setValue('#month','January');
    setValue('#year','2020');
}
const unsetSelectedValues= (propertyValue)=>{
    let allItems= document.querySelectorAll(propertyValue);
    allItems.forEach(items=>{
        items.checked=false;
    });
}
const setTextValue=(id,value)=>
{
    const element= document.querySelector(id);
    element.textContent=value;
}
const setValue=(id,value)=>
{
    const element= document.querySelector(id);
    element.value=value;
}
