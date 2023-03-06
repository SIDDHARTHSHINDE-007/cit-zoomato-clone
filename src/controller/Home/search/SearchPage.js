import { useEffect, useState } from "react";
import axios from "axios";
import {useParams,useNavigate} from"react-router-dom";
import Header from "../../Header";
// import Header from "../Header";


function Searchpage(){
  let { id } = useParams();
  let Navigate=useNavigate();

  let [filterData, setFilterData] = useState({ Collection: id });
  let [SearchData, setSearchData] = useState([]);
 
  let [locList, setLocList] = useState([]);
  let getFilterData = async (filterData) => {
    let URL = "http://localhost:1111/api/filter";
    let { data } = await axios.post(URL, filterData);
    setSearchData([...data.newResult]);
  };
  let getLocationList = async (filterData) => {
    let URL = "http://localhost:1111/api/get-location";
    let { data } = await axios.get(URL);

    setLocList([...data.location]);
  };
  let makeFilter=(event,type)=>{
let value=event.target.value;
let _filter={...filterData}
switch(type){
case"location":
if(Number(value)>0){
_filter["location"]=value;
}
else {delete _filter["location"]}
break;
case"sort":
_filter["sort"]=value;
break;
case"cost-for-two":
let _cost=(value.split("-"));
_filter["lcost"]=_cost[0];
_filter["hcost"]=_cost[1];
}
getFilterData(_filter);
setFilterData({..._filter});

  };
  

  useEffect(()=>{
    getFilterData(filterData);
    getLocationList();
  },[]);


return(<> <Header color="bg-danger"/>
 
<div className=" container-fluid ">
<h5 className="mt-3 break-title">Breakfast Places In Mumbai</h5>
</div>

<div className=" d-flex col-10 mb-5">
<div className="box col-4 me-3">
<div className="filter-title">
<p className="mb-0 ms-3 mt-3">Filter</p>

</div>
<div className="collapse show container" id="collapseFilter">
<div>
  <label htmlFor="" className="form-label ms-1">Select Location</label>
  <select className="form-select form-select-sm ms-1"onChange={(event)=>makeFilter(event,"location")}>
    <option value="-1">All</option>
   {locList.map((loc,index)=>{
   return (<option value={loc.location_id}key={index}>
    {loc.name},{loc.city}
   </option>);
  })}
  </select>
</div>
</div>


<div>
<p className="mt-4 mb-2 ms-3 fw-bold">Cuisine</p>
</div>
<div className="ms-1 ms-3">
<input type="checkbox" className="form-check-input" />
<label htmlFor="" className="form-check-label ms-1">North Indian</label>
</div>
<div className="ms-1 ms-3">
<input type="checkbox" className="form-check-input" />
<label htmlFor="" className="form-check-label ms-1">North Indian</label>
</div><div className="ms-1 ms-3">
<input type="checkbox" className="form-check-input" />
<label htmlFor="" className="form-check-label ms-1">North Indian</label>
</div><div className="ms-1 ms-3">
<input type="checkbox" className="form-check-input" />
<label htmlFor="" className="form-check-label ms-1">North Indian</label>
</div>

<div>
<p className="mt-4 mb-2 fw-bold ms-3">Cost For Two</p>
</div>
<div className="ms-1">
<input type="radio" className="form-check-input ms-2" 
value="0-500"name="cost-for-two"
onChange={(event)=>makeFilter(event,"cost-for-two")}
/>
<label htmlFor="" className="form-check-label ms-1">less then 500</label>
</div>
<div className="ms-1">
<input type="radio" className="form-check-input ms-2" 
value="500-1000"name="cost-for-two"
onChange={(event)=>makeFilter(event,"cost-for-two")}
/>
<label htmlFor="" className="form-check-label ms-1"> 500 to 1000</label>
</div>
<div className="ms-1">
<input type="radio" className="form-check-input ms-2"
value="1000-1500"name="cost-for-two"
onChange={(event)=>makeFilter(event,"cost-for-two")}
/>
<label htmlFor="" className="form-check-label ms-1">1000 to 1500</label>
</div>
<div className="ms-1">
<input type="radio" className="form-check-input ms-2" 
value="1500-2000"name="cost-for-two"
onChange={(event)=>makeFilter(event,"cost-for-two")}
/>
<label htmlFor="" className="form-check-label ms-1">1500 to 2000</label>
</div>
<div className="ms-1">
<input type="radio" className="form-check-input ms-2" 
value="2000-999999"name="cost-for-two"
onChange={(event)=>makeFilter(event,"cost-for-two")}
/>
<label htmlFor="" className="form-check-label ms-1">2000+</label>
</div>
<div>
<p className="mt-4 mb-2 ms-3 fw-bold">Sort</p>
</div>
<div className="ms-1">
<input type="radio" className="form-check-input" value="1"onChange={(event)=>makeFilter(event,"sort")}
name="sort"

/>
<label htmlFor="" className="form-check-label ms-1">Price low to high</label>
</div>
<div className="ms-1">
<input type="radio" className="form-check-input"value="-1"onChange={(event)=>makeFilter(event,"sort")}
name="sort"
/>
<label htmlFor="" className="form-check-label ms-1">Price high to low</label>
</div>
</div>

<div className="col-12 col-lg-8 col-md-7 ">
{SearchData.map((restaurant,index)=>{
  return( <div className="col-12 food-shadow p-4 mb-4 box-two"key={index}
  onClick={()=>Navigate("/Restaurant/"+restaurant._id)}>

   <div className="d-flex align-items-center">
     <img src={"/images/"+restaurant.image}className="food-item" />
     <div className="ms-5">
       <p className="h4 fw-bold">{restaurant.name}</p>
       <span className="fw-bold text-muted">{restaurant.city}</span>
       <p className="m-0 text-muted">
         <i
           className="fa fa-map-marker fa-2x text-danger"
           aria-hidden="true"></i>
         {restaurant.locality}, {restaurant.city} …
       </p>
     </div>
   </div>
   <hr />
   <div className="d-flex">
     <div>
       <p className="m-0">CUISINES:</p>
       <p className="m-0">COST FOR TWO:</p>
     </div>
     <div className="ms-5">
       <p className="m-0 fw-bold">
        {
        restaurant.cuisine.reduce((pVaule,cValue)=>{
          return pVaule.name+','+cValue.name;
        })}
        </p>
       <p className="m-0 fw-bold">
         <i className="fa fa-inr fa-2x " aria-hidden="true"></i>
         {restaurant.min_price}
       </p>
     </div>
     <div className="d-flex p-images ms-5">
       <img src="./images/assets/1663154883979.png" alt=""/>
     </div>
   </div>
   
   </div> );
  })}



<div className="col-12 pagination d-flex justify-content-center">
<ul className="pages">

  <li >&lt;</li>
  {/* className="active"onClick={()=>Navigate("/")} */}
  <li className="active "onClick={()=>Navigate("/")} >1</li>
  <li className="active"onClick={()=>Navigate("/")} >2</li>
  <li className="active"onClick={()=>Navigate("/")} >3</li>
  <li>4</li>
  <li >&gt;</li>
</ul>
</div>
</div>
</div>

</>
)
}
export default Searchpage;
