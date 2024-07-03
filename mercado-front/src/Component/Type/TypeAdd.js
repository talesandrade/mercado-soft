import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function AddProduct(){

    const navigate = useNavigate();
    const [formvalue, setFormvalue] = useState({nome:'',imposto:''});
    const [message, setMessage] = useState('');
    const handleInput =(e)=>{
        setFormvalue({...formvalue, [e.target.name]:e.target.value});
    }

    const handleSubmit =async(e)=>{
        e.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.append('nome', formvalue.nome);
        bodyFormData.append('imposto', formvalue.imposto);
        const res = await axios.post("http://localhost:8080/tipos/cadastrar",bodyFormData);

        if(res.data.success){
            setMessage(res.data.data.success);
            setTimeout(
                ()=>{
                    navigate('/typelist')
                }, 2000
            );
        }
    }

    return(
        <React.Fragment>
        <div className="container">
        <br/>
            <h5>Adicionar Tipo</h5>
            <p>{ message }</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Nome do tipo:</label>
                    <input type="text" name="nome" className="form-control" id="nome" value={formvalue.nome} onChange={handleInput}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Imposto:</label>
                    <input type="text" name="imposto" className="form-control" id="valor"value={formvalue.valor} onChange={handleInput}/>
                </div>
                <button type="submit" className="btn btn-primary">Salvar</button>
            </form>
        </div>
        </React.Fragment>
    );
}

export default AddProduct;