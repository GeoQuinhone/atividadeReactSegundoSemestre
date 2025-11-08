import { useNavigate } from "react-router-dom"

export const Home = () => {

    const navigate = useNavigate()

    return (
        <>
            <h1>Pagina HOME</h1>
            <button
                className="btn btn-primary"
                onClick={
                    () => {
                        navigate('/')
                    }
                }
            >Navegar</button>
        </>
    )
}