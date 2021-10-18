import './Style.css';
import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Agenda() {
    const [pacients, setPacients] = useState([])
    const [schedulings, setSchedulings] = useState([])
    const [numero, setNumero] = useState('')
    const [horario, setHorario] = useState('')
    const [medico, setMedico] = useState('')
    const [local, setLocal] = useState('')

    function submit() {

      console.log(numero)
      
  
      console.log(medico)
  
      api.post('/send-message', {
        number: numero,
        medico: medico,
        local: local,
        horario: horario
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
  
      
  
      alert('Mensagem enviada com successo')
    }
  
    return (
      <div className = "form">
        <label>Data:</label><br />
        <input type='textarea' name='f_numero' value={numero} onChange={(e) => setNumero(e.target.value)} />
        <label>Médico:</label><br />
        <select value={medico} onChange={(e) => setMedico(e.target.value)} >
          <option value="CLINICO GERAL">CLINICO GERAL</option>
          <option value="CLINICO GERAL">CLINICO GERAL</option>
          <option value="CLINICO GERAL">CLINICO GERAL</option>
          <option value="CLINICO GERAL">CLINICO GERAL</option>
        </select>
        <label>Horário:</label><br />
        <input type='textarea' name='f_horario' value={horario} onChange={(e) => setHorario(e.target.value)} />
        <label>Local:</label><br/>
        <select value={local} onChange={(e) => setLocal(e.target.value)} >
          <option value="HSNF">HSNF</option>
          <option value="HSNF">HSNF</option>
          <option value="HSNF">HSNF</option>
          <option value="HSNF">HSNF</option>
        </select>
        <br></br>
        <button onClick={submit}>Enviar</button>
      </div>
      
    );
    async function getPacients() {
      const { data } = await api.get("/pacients")
      setPacients(data)

  }

  async function getSchedulings() {
      const { data } = await api.get("/schedulings")
      setSchedulings(data)

  }
  useEffect(() => {
      getPacients()
      getSchedulings()
      console.log(pacients)
      console.log(schedulings)

  }, [])
  
    
  }

export default Agenda
