import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {IoArrowBack} from 'react-icons/io5'
import { searchByCountry } from '../config';
import { Button } from '../Button';
import { Info } from '../components/Info';

export const Details = () => {
    const { name } = useParams();
    const { push, goBack } = useHistory();
    const [country, setCountry] = useState(null);

    useEffect(() => {
        axios.get(searchByCountry(name)).then(({ data }) => setCountry(data[0]));
    }, [name])

  return (
    <>
        <Button onClick={goBack}>
            <IoArrowBack /> Назад
        </Button>
        {country && <Info push={push} {...country}/>}
        Details {name}
    </>
  )
}
