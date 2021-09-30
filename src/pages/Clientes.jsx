import React from 'react'

import Table from '../components/table/Table'

import clientesList from '../assets/JsonData/clientes-list.json'

const clientesTableHead = [
    '',
    'nome',
    'email',
    'telefone',
    'total atendimentos',
    'total gasto',
    'endereço'
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.total_orders}</td>
        <td>{item.total_spend}</td>
        <td>{item.location}</td>
    </tr>
)

const Clientes = () => {
    return (
        <div>
            <h2 className="page-header">
                clientes
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                limit='10'
                                headData={clientesTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={clientesList}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Clientes
