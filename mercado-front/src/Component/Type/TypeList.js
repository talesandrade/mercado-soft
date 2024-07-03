import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function TypeList(){

    const [typeData, setTypeData] = useState([]);
    useEffect( ()=>{
        const getTypeList = async()=>{
            var res = await axios.get("http://localhost:8080/tipos");
            if (res?.data) {
                setTypeData(res.data.data);
            }
        }
        getTypeList();

    },[]);

    return(
        <React.Fragment>
            <div className="container">
            <br/>
                <h5>Tipos de produtos</h5>
                
                <Link to="/addtype" className="btn btn-success">Novo tipo</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Imposto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            typeData.map((tData, index)=>{
                                return (
                                <tr>
                                    <th>{tData.id}</th>
                                    <td>{tData.nome}</td>
                                    <td>{tData.imposto}%</td>
                                </tr>
                                );
                            })
                        }
                        
                    </tbody>
                </table>

            </div>
        </React.Fragment>
    );
}

export default TypeList;