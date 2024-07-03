import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SaleList(){

    const [typeData, setTypeData] = useState([]);
    useEffect( ()=>{
        const getTypeList = async()=>{
            var res = await axios.get("http://localhost:8080/vendas");
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
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Produtos</th>
                            <th scope="col">Valor bruto</th>
                            <th scope="col">Imposto</th>
                            <th scope="col">Valor Líquido</th>
                            <th scope="col">Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            typeData.map((vData, index)=>{
                                return (
                                <tr>
                                    <th>{vData.id}</th>
                                    <td>{vData.produtos}</td>
                                    <td>R$ {vData.valor_bruto}</td>
                                    <td>R$ {vData.valor_imposto}</td>
                                    <td>R$ {vData.valor_liquido}</td>
                                    <td>{vData.data}</td>
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

export default SaleList;