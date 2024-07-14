import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ALL_COUNTRIES } from '../config';
import { List } from '../components/List';
import { Card } from '../components/Card';
import { Controls } from '../components/Controls/Controls';


// eslint-disable-next-line react/prop-types
export const HomePage = ({countries, setCountries}) => {
    const [filtredCountries, setFiltredCountries] = useState(countries);

    const { push } = useHistory();

    const handleSearch = (search, region) => {
        let data = [...countries];
        if (region) {
            data = data.filter(c => c.region.includes(region));
        }

        if (search) {
            data = data.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
        }

        setFiltredCountries(data);
    }

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (!countries.length) {
        axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data))
    }
  }, []);

  useEffect(() => {
      handleSearch();
      
  }, [countries]);

  return (
    <>
        <Controls onSearch={handleSearch} />
        <List>
          {
            filtredCountries.map(c => {
              const countryInfo = {
                img: c.flags.png,
                name: c.name,
                info: [
                  {
                    title: 'Population',
                    description: c.population.toLocaleString(),
                  },
                  {
                    title: 'Region',
                    description: c.region,
                  },
                  {
                    title: 'Capital',
                    description: c.capital,
                  }
                ],
              };
              return (
                <Card key={c.name} onClick={() => push(`/country/${c.name}`)} {...countryInfo} />
              )
            }
            )
          }
        </List>
    </>
  )
}
