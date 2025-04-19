import ItemList from "./ItemList";

const RestroCategories = ({data, showItems, setShowIdx})=>{
    const{title, itemCards} = data;
    const handleClick =()=>{
        setShowIdx();
    }
    return(
        <div>
            <div className="w-6/12 py-3 px-6 bg-slate-100 mx-auto my-6 shadow-lg">
                <div className="flex justify-between cursor-pointer" onClick={handleClick}>
                    <span>{title}  -  {itemCards.length}</span>
                    <span> arrow</span>
                </div>
                <div>
                    {showItems && <ItemList items = {itemCards}/>}
                </div>
            </div>
        </div>
    );
}

export default RestroCategories;
