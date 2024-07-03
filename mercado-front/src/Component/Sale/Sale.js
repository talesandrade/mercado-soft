import React, {useEffect, useState} from "react";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
        

function Sale(){

    const navigate = useNavigate();
    const [carrinho, setCarrinho] = useState([]);
    const [message, setMessage] = useState('');

    function addProducToCart(id, nome, valor, imposto){
        const copyCarrinho = [...carrinho];

        const item = copyCarrinho.find((carrinho) => carrinho.id === id);

        if (!item) {
            copyCarrinho.push({ id: id, nome: nome, valor: valor, imposto: imposto, qtd: 1 });
        } else {
            item.qtd = item.qtd + 1;
        }

        setCarrinho(copyCarrinho);
    }

    const FinalizarCarrinho = async () => {

            const copyCarrinho = [...carrinho];

            console.log(copyCarrinho);

            try {

                const res = await axios.post("http://localhost:8080/finalizar-venda",copyCarrinho);
                if(res.data.success){
                    setMessage(res.data.data.success);
                    setTimeout(
                        ()=>{
                            navigate('/salelist')
                        }, 2000
                    );
                }

            } catch (err) {
                console.log(err);
            }

            
        }


    const [productData, setProductData] = useState([]);
    const [formvalue, setFormvalue] = useState([]);
    const handleInput =(e)=>{
        setFormvalue({...formvalue, [e.target.name]:e.target.value});
    }
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
                    <h5>Painel de venda</h5>
                <p>{ message }</p>
                <br/>
                
                <Link to="/salelist" className="btn btn-success">Lista de vendas</Link>
                <br/><br/>
                <div class="container text-center">
                    <div class="row align-items-start">
                        {
                            productData.map((pData, index)=>{
                                return (
                                <div class="col-md-3">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">{pData.nome}</h5>
                                            <p class="card-text">R$ {pData.valor}</p>
                                            <button class="btn btn-primary" onClick={() => addProducToCart(pData.id,pData.nome,pData.valor,pData.imposto,)}>Adicionar</button>
                                        </div>
                                    </div>
                                </div>

                                );
                            })
                        }
                    </div>
                </div>
                <br/>
                <h5>Carrinho de compras</h5>
                                
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Valor Un</th>
                                <th scope="col">quantidade</th>
                                <th scope="col">Valor Líquido</th>
                                <th scope="col">impostos</th>
                                <th scope="col">total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                carrinho.map((cData, index)=>{
                                    return (
                                    <tr>
                                        <td>{cData.nome}</td>
                                        <td>R$ {cData.valor}</td>
                                        <td>{cData.qtd}</td>
                                        <td>R$ {(cData.valor*cData.qtd).toFixed(2)}</td>
                                        <td>{cData.imposto}%</td>
                                        <td>R$ {((cData.valor*cData.qtd)-((cData.imposto * (cData.valor*cData.qtd)) / 100)).toFixed(2) }</td>
                                    </tr>
                                    );
                                })
                            }
                            
                        </tbody>
                    </table>
                    <br/>
                    <button class="btn btn-primary" onClick={() => FinalizarCarrinho()}>Finalizar Compra</button>
            </div>
        </React.Fragment>
    );
}

export default Sale;