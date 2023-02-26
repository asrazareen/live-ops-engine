import { useState } from "react"
import Nav from "./Nav"
const Sell = () => { 

    const [offerId, setOfferId] = useState("")
    const [offerTitle, setOfferTitle] = useState('')
    const [description, setDescription] = useState("")
    const [order, setOrder] = useState(0);
    const [item_id , setItemId] = useState("");
    const [quantity , setQuantity] = useState(0);
    const [days_of_week,setDaysofweek] = useState([]);
    const [dates_of_month,setDateofMonth] = useState([]);
    const [months_of_year , setMonthsofYear] = useState([]);
    const [target, setTarget] = useState("")
    const[currency,setCurrency] = useState("");
    const [cost ,setCost] = useState(0);
    const [url , setUrl] = useState("")

   

    const handleAddOffer = async (e) => {
        e.preventDefault();

        const token=sessionStorage.getItem("token")
        console.log(token)
        const formData = new FormData();
        formData.append("offerId" , offerId)
        formData.append("offerTitle" , offerTitle)
        formData.append("image" ,url)
        formData.append("description",description) 
        formData.append("order",order)
        formData.append("item_id",item_id)
        formData.append("quantity",quantity)
        formData.append("days_of_week",days_of_week)
        formData.append("dates_of_month",dates_of_month)
        formData.append("months_od_year" , months_of_year)
        formData.append("currency",currency)
        formData.append("cost",cost)
        formData.append("target",target)
     
        formData.forEach((val,key) => {
        console.log(val,key)})
       
              await fetch("http://localhost:5050/product" , {
            method:"POST",
            body:formData,
            headers: { Authorization: token },
            
        })
  
        
  
    }

    const imagePost= async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "offer_image");
        // formdata.forEach((val,key) => {
        //     console.log(val,key)})
        console.log(image)
       await fetch("https://api.cloudinary.com/v1_1/asrazareen/image/upload", {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url);
            })
    }

    return (
        <>
            <Nav />
            <div className="offer-div" >
                <div>
                <span className="image-name" >Enter Offer_id:</span><br />
                    <input className="offer-input" placeholder="offer_id"
                        onChange={(e) => { setOfferId(e.target.value) }}
                    />
                </div>
                <div>
                <span className="image-name" >Enter Offer_title:</span><br />
                    <input className="offer-input" placeholder="Offer_title"
                        onChange={(e) => { setOfferTitle(e.target.value) }}
                    />
                </div>
                <div>
                <span className="image-name" >Enter Offer_description:</span><br />
                    <input className="offer-input" placeholder="offer_description"
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                </div>

                <div>
                    <span className="image-name" >Select Offer_image:</span><br />
                    <input type="file" className="offer-input" accept="image/*"
                        onChange={(e) => { imagePost(e.target.files[0]) }}
                        placeholder="offer_image" />
                </div>
                <div>
                <span className="image-name" >Enter Offer_order:</span><br />
                    <input className="offer-input" placeholder="offer_sort_order"
                        onChange={(e) => { setOrder(e.target.value) }}
                    />
                </div>

                <div>
                    <span className="image-name" >Enter Offer Content:</span><br />
                    <input className="offer-input input" placeholder="Item_id" 
                    name="item_id"
                    onChange={(e) =>{setItemId(e.target.value)}}
                    />
                    <input type="number" className="offer-input input" placeholder="Quantity" 
                     name="quantity"
                    onChange={(e) => {setQuantity(e.target.value)}} />
                </div>
                <div>
                    <span className="image-name " >Enter Offer Schedule:</span><br />
                    <input className="offer-input input" placeholder="Days_of_week" 
                    name="days_of_week"
                    onChange={(e)=>{setDaysofweek(e.target.value)}} 
                    />
                    <input className="offer-input input" placeholder="Dates_of_months" 
                    name="dates_of_months"
                      onChange={(e) => {setDateofMonth(e.target.value)}} 
                    />
                    <input  className="offer-input input" placeholder="months_of_year"
                     name="months_of_year"
                      onChange={(e) => {setMonthsofYear(e.target.value)}} 
                    />
                </div>
                <div>
                <span className="image-name" >Enter Offer_target:</span><br />
                    <input className="offer-input" placeholder="target" 
                    onChange={(e) => {setTarget(e.target.value)}} />
                </div>

                <div>
                    <span className="image-name" >Enter Pricing:</span><br />
                    <input className="offer-input input" placeholder="Currency" 
                    name="currency"
                    onChange={(e) => {setCurrency(e.target.value)}} 
                    />
                    <input type='number' className="offer-input input" placeholder="Cost"
                        name="cost"
                        onChange={(e) => {setCost(e.target.value)}} 
                    />
                </div>

                <button className="btn add-btn" onClick={handleAddOffer} >Add Offer</button>
            </div>

        </>
    )
}

export default Sell