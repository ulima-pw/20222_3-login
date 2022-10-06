import { useEffect, useState } from "react"

const URL_GET_COURSES = "https://script.google.com/macros/s/AKfycbzcXL0xn_GdwmaMAoH1TlLXVjBJqIlrYZdSwItJGn2nEpSgrBLW55-OO_41Ke9ndMpxwA/exec?entity=cursos"

const MainPage = () => {
    const [coursesList, setCoursesList] = useState([])

    const httpGetCourses = async() => {
        const resp = await fetch(URL_GET_COURSES)
        const data = await resp.json()
        setCoursesList(data)
    }

    useEffect(()=>{
        httpGetCourses()
    }, [])

    return <div className="container">
        <h1>Cursos Disponibles</h1>
        <table className="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                </tr>
            </thead>
            <tbody>
                {
                    coursesList.map((course) => {
                        return <tr key={`courses_${course.id}`}>
                            <td>{ course.id }</td>
                            <td>{ course.nombre }</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
}

export default MainPage