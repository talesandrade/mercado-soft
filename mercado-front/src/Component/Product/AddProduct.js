import axios from "axios";
import React, {useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";

function AddProduct(){

    const navigate = useNavigate();
    const [formvalue, setFormvalue] = useState({nome:'',valor:'',tipo:''});
    const [message, setMessage] = useState('');
    const handleInput =(e)=>{
        setFormvalue({...formvalue, [e.target.name]:e.target.value});
    }

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

    /*var tipos = axios.get("http://localhost:8080/tipos");
    var tiposlist = tipos.data;
    console.log(tipos);*/

    const handleSubmit =async(e)=>{
        e.preventDefault();
        
        var bodyFormData = new FormData();
        bodyFormData.append('nome', formvalue.nome);
        bodyFormData.append('valor', formvalue.valor);
        bodyFormData.append('tipo', formvalue.tipo);
        
        const res = await axios.post("http://localhost:8080/cadastrar-produtos",bodyFormData);

        if(res.data.success){
            setMessage(res.data.data.success);
            setTimeout(
                ()=>{
                    navigate('/productlist')
                }, 2000
            );
        }
    }

    return(
        <React.Fragment>
        <div className="container">
        <br/>
            <h5>Adicionar Produto</h5>
            <p>{ message }</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Nome do produto:</label>
                    <input type="text" name="nome" className="form-control" id="nome" required value={formvalue.nome} onChange={handleInput}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Valor:</label>
                    <input type="text" name="valor" className="form-control" required id="valor"value={formvalue.valor} onChange={handleInput}/>
                </div>
                <div className="mb-3">
                    <select className="form-select" name="tipo" aria-label="" required value={formvalue.tipo} onChange={handleInput}>
                        <option selected value="" >Selecione um tipo:</option>
                        {
                            typeData.map((tData, index)=>{
                                return (
                                    <option value={tData.id}>{tData.nome}</option>
                                );
                            })
                        }
                        
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Salvar</button>
            </form>
        </div>
        </React.Fragment>
    );
}

export default AddProduct;