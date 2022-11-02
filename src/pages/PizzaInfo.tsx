import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

interface IPizza {
    title: string,
    imageUrl: string,
    price: number
}

const PizzaInfo: React.FC = () => {
    const [pizza, setPizza] = useState<IPizza>();
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function getPizzaInfo() {
            try {
                const res = await axios.get('https://633dc3e1f2b0e623dc7af0ee.mockapi.io/items/' + params.id)
                setPizza(res.data)
            } catch (e) {
                console.log(e)
                alert('Ошибка при получении данных!')
                navigate('/')
            }
        }

        getPizzaInfo()
    }, [])

    if (!pizza) {
        return <h2>Загрузка...</h2>
    }

    return (
        <div className='container'>
            <div className='pizza-info'>
                <img src={pizza.imageUrl} alt={pizza.title}/>
                <h1>{pizza.title}</h1>
                <h2>{pizza.price} р.</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis expedita maxime sapiente?
                    Expedita laborum magnam minus, nesciunt nisi vitae voluptatibus?</p>
                <button onClick={() => navigate('/')} className='button button--outline button--add' style={{margin: '0 auto'}}>Назад</button>
            </div>
        </div>
    );
};

export default PizzaInfo;