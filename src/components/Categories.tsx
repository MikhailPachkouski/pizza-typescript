import React from 'react'

type CategoriesProps = {
    value: number
    onClickCategory: (index: number) => void
}

const Categories: React.FC<CategoriesProps> = React.memo(({value, onClickCategory}) => {

    const categoriesList = ["Все", "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"]

    return (
        <div className="categories">
            <ul>
                {categoriesList.map((cat, index) => <li key={index} onClick={() => onClickCategory(index)}
                                                        className={index === value ? 'active' : ''}>{cat}</li>)}
            </ul>
        </div>
    )
})

export default Categories