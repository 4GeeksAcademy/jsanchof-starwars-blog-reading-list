import React, {useState, useEffect} from 'react'
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Link, useParams} from "react-router-dom";

const PlanetCard = ({ item }) => {

    const { dispatch } = useGlobalReducer();
    const [isFavorite, setIsFavorite] = useState(false);
    const [details, setDetails] = useState(null);

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: "delete_from_favorite", payload: { deleteUID: item.uid, deleteName: item.name } });
        } else {
            dispatch({ type: "add_to_favorite", payload: { addUID: item.uid, addName: item.name } });
        }
    };


    const getDetails = async (item) => {
        try {
            console.log("Fetching details from: " + item.url);
            const response = await fetch(item.url);
            if(!response.ok)
                console.log("Error al tratar de traer los detalles de: " + item.name);

            const data = await response.json();
            console.log(data);
            setDetails(data.result.properties);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
            getDetails(item);
        }, []);

    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src="https://picsum.photos/400/200" className="card-img-top" alt="Planet card" />
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <div className="card-text">
                    {details ? ( 
                        <ul style={{ listStyle: "none" }}>
                        <li>Population: {details.population}</li>
                        <li>Terrain: {details.terrain}</li>
                    </ul>
                    ) : (
                        <p>Loading details...</p>
                    )}
                </div>
                <span className="card-actions d-flex justify-content-between">
                    <Link to={`/planet-details/${item.uid}`} className="btn btn-primary">More details!</Link>
                    <a href="#" className="btn btn-light btn-favorite" >
                    <i
                        className={` fa-heart ${isFavorite ? "fa-solid favorite" : "fa-regular"}`}
                        onClick={toggleFavorite}
                    ></i>
                    </a>
                </span>
            </div>
        </div>

    )
}

export default PlanetCard