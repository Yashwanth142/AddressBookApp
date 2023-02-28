let AddressbookList;

window.addEventListener('DOMContentLoaded',(event)=>
{
   AddressbookList= getAddressbookDataFromStorage();
   document.querySelector(".addres-count").textContent= AddressbookList.length;
   createInnerHtml();
   localStorage.removeItem('editaddres');
});

const getAddressbookDataFromStorage= ()=>{
    return localStorage.getItem('AddressbookList')?JSON.parse(localStorage.getItem('AddressbookList')) : [];
}

const createInnerHtml=()=>
{   
    const headerHtml= "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>"
    
    if(AddressbookList.length==0) return;
    let innerHtml= `${headerHtml}`;
    
    for(const empPayrollData of AddressbookList){
        
        innerHtml= `${innerHtml}
        <tr>
            <td><img class="profile" alt="" src="${AddressbookData._profilePic}"></td>
            <td>${AddressbookData._name}</td>
            <td>${AddressbookData._gender}</td>
            <td>${getDeptHtml(empPayrollData._department)}
            </td>
            <td>${AddressbookData._salary}</td>
            <td>${AddressbookData._startDate}</td>
            <td><img id="${AddressbookData._id}" onclick= "remove(this)" alt="delete" src="Assets/Icons/delete-black-18dp.svg">
            <img id="${AddressbookData._id}" onclick= "update(this)" alt="edit" src="Assets/Icons/create-black-18dp.svg"></td>
        </tr>`;
    }
    
    document.querySelector('#table-display').innerHTML=innerHtml;
}

const createAddressbookJSON = () => {
    let AddressbookListLocal = [
      {       
        _name: 'Harish',
        _gender: 'male',
        _department: [
            'Engineering',
            'Finance'
        ],
        _salary: '500000',
        _startDate: '29 Oct 2019',
        _note: '',
        _id: new Date().getTime(),
        _profilePic: 'Assets/ProfilePic/profile_img-2.png'
      },
      {
        _name: 'Rita',
        _gender: 'female',
        _department: [
            'Sales'
        ],
        _salary: '400000',
        _startDate: '29 Oct 2019',
        _note: '',
        _id: new Date().getTime() + 1,
        _profilePic: 'Assets/ProfilePic/profile_img-1.png'
      }
    ];
    return AddressbookListLocal;
}
//creating getDeptHtml function 
//function is added differently, because there can more than one department associated to employee
//department object is recieved as input for method and placeholder and template literals are used to add all departments into innerHTML dynamically.
//for loop is used to iterate over all department from object and innerhtml containing tags in deptHtml is returned.
  const getDeptHtml= (deptList)=>
   {
      let deptHtml='';
      for(const dept of deptList)
      {
          deptHtml= `${deptHtml}<div class="dept-label">${dept}</div>`
      }
      return deptHtml;
    }
const remove = (node) =>{
  let AddressbookData= AddressbookList.find(addresData => addresData.id == node.id);
  if(!AddressbookData) return;
  const index=AddressbookList
                .map(addresData=addresData._id)
                .indexOf(AddressbookData._id);
  AddressbookList.splice(index,1);
  localStorage.setItem("AddressbookList",JSON.stringify(AddressbookList));
  document.querySelector(".addres-count").textContent=AddressbookList.length;
  createInnerHtml();
}
