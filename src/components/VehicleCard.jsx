import React, {useEffect,useState}from 'react'
import useGlobalReducer from '../hooks/useGlobalReducer';

const VehicleCard = ({ item }) => {

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
            <img src="https://picsum.photos/400/200" className="card-img-top" alt="vehicle card" />
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <div className="card-text">
                    {details ? ( 
                        <ul style={{ listStyle: "none" }}>
                        <li>Cargo capacity: {details.cargo_capacity}</li>
                        <li>Passengers: {details.passengers}</li>
                        <li>Cost in credits: {details.cost_in_credits}</li>
                    </ul>
                    ) : (
                        <p>Loading details...</p>
                    )}
                </div>
                <span className="card-actions d-flex justify-content-between">
                    <a href="#" className="btn btn-primary ">More details!</a>
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

export default VehicleCard