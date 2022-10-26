import {useState} from "react";


function Categories({value, onClickCategory}) {
    const [activeIndex, setActiveIndex] = useState(0);

    const categoriesList = ["Все", "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"]

    // const onClickCategory = (index) => {
    //     setActiveIndex(index)
    // }

    return (
        <div className="categories">
            <ul>
                {categoriesList.map((cat, index) => <li key={index} onClick={() => onClickCategory(index)}
                                                        className={index === value ? 'active' : ''}>{cat}</li>)}
            </ul>
        </div>
    )
}

export default Categories