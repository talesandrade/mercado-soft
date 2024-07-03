import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductList(){

    const [productData, setProductData] = useState([]);
    useEffect( ()=>{
        const getProductList = async()=>{
            var res = await axios.get("http://localhost:8080/produtos");
            if (res?.data) {
                setProductData(res.data.data);
            }
        }
        getProductList();

    },[]);

    return(
        <React.Fragment>
            <div className="container">
            <br/>
                <h5>Lista de Produtos</h5>
                
                <Link to="/addproduct" className="btn btn-success">Adicionar Produtos</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productData.map((pData, index)=>{
                                return (
                                <tr>
                                    <th>{pData.id}</th>
                                    <td>{pData.nome}</td>
                                    <td>R$ {parseFloat(pData.valor).toFixed(2)}</td>
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

export default ProductList;