import React ,{useState,useEffect} from "react";
import {
    Button,
  Container,
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
  Row
} from "react-bootstrap";
import "./toDoApp.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// to get data from local storage 
const getCategoriesFormLocalStorage = () =>{
  let categories = localStorage.getItem('categories');
  console.log(categories);
  if(categories){
    return JSON.parse(localStorage.getItem('categories'));
  }else{
    return [];
  }
} 

const ToDoAppIndex = () => {
const [categories , setCategories] = useState(getCategoriesFormLocalStorage());
const [addCategory, setaddCategory] = useState(false);
const [categoryName , setCategoryName] = useState('');
const [SelectedcategoryName , setSelectedCategoryName] = useState('');
const [categoryValue, setCategoryValue] = useState('');
const [selectedCheckbox,setSelectCheckbox] = useState([])



const addCategoryHandler = () => {
    const Cname = categories.filter((value)=>{
      return value.categoryName == categoryName
    }) 

    if(categoryName !== '' && Cname.length == 0 ){setCategories([...categories,{categoryName , categoryValues : []}])}
    if(SelectedcategoryName !== '' && categoryValue !== ''){
        let findObj = categories.find((object,i)=>{
            return object.categoryName == SelectedcategoryName;
            })
         findObj.categoryValues = [...findObj.categoryValues,categoryValue];
      
    }
    
    setCategoryName('');
    setCategoryValue('');
    setaddCategory(false); 
}

const checkboxHandler = () => {

  if(selectedCheckbox.length !== 0){
    selectedCheckbox.map((value,index)=>{
     
     categories.map((object,i)=>{
     
            object.categoryValues.map((categoryValue,indx)=>{
              if(categoryValue == value){
                object.categoryValues.splice(indx,1);};
            })
    })
    setCategories(categories);
  })
}
setSelectCheckbox([]);
}



useEffect(() => {

 localStorage.setItem('categories',JSON.stringify(categories))
  
}, [categories,addCategory,categoryName,SelectedcategoryName,categoryValue,selectedCheckbox])

  return (
    <div className="parentContainer">
        <div className="heading">
            <span style={{fontSize : '5rem'}}>📅</span>
            <h2 >ADD YOUR TO DO <span>✍</span> </h2>
        </div>
        
      <Container className="col-lg-12 bootstarpContainer">
         
        <InputGroup className="mb-3">
            {/* -----input ----- */}
          <FormControl aria-label="Text input with dropdown button" value={categoryValue} onChange={(e)=>setCategoryValue(e.target.value)}/>

          <DropdownButton
            variant="outline-secondary"
            title="Choose Category"
            id="input-group-dropdown-2"
            align="end"
            className="dropdownButton btn-warning"
            onSelect={(eventKey) => setSelectedCategoryName(eventKey)}
          >
            {categories.map((category,index)=>{
           return(
                    <Dropdown.Item key={index} eventKey={category.categoryName} href="#">{category.categoryName}</Dropdown.Item>
                ) 
            })}
                
          </DropdownButton>
            <Button className='addToDo' onClick={()=>{addCategoryHandler();}}>Add To Do</Button>

        </InputGroup>
        
      <div>
           {addCategory === true ?
            <div className="createNewCategoryInput"> 
                <input value={categoryName} onChange={(e) =>{setCategoryName(e.target.value)}}/> 
                <Button className="btn-success" onClick={()=>{addCategoryHandler();}}>+</Button>
            </div>
            : 
            <div onClick={(e) =>{setaddCategory(true);}} className="createNewCategory">Create New Category</div>
            }
            
            {/* remove all selected checkbox items */}
            
              <div onClick={() =>{checkboxHandler()}} className="removeAll">Remove all selected To Do's</div>

      </div>
            {categories.map((items, index) => {
                return (
                   <Container style={{color:'white', padding:'10px',textAlign:'center', fontSize:'1.2rem'}} className='col-lg-9'> {items.categoryValues.length !== 0 ?` 🢒 ${items.categoryName}` : null}
                    {items.categoryValues.length !== 0 && items.categoryValues.map((value, sIndex) => {
                     
                    return (
                      <Row>
                        <InputGroup className="mb-3" key={sIndex}>
                        <FormControl aria-label="Text input with checkbox" value={value} disabled/>
                        <InputGroup.Checkbox aria-label="Checkbox for following text input" value={value} onClick={(e) => setSelectCheckbox([...selectedCheckbox, e.target.value])}/>
                        </InputGroup>
                      </Row>
                    )  
                    })}
                   </Container> 
                );
            })}
      </Container>
    </div>
  );
};

export default ToDoAppIndex;
