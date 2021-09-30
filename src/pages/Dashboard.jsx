import React, {useEffect} from 'react'

import { Link } from 'react-router-dom'

import Chart from 'react-apexcharts'

import { useSelector } from 'react-redux'

import StatusCard from '../components/status-card/StatusCard'

import Table from '../components/table/Table'

import Badge from '../components/badge/Badge'

import statusCards from '../assets/JsonData/status-card-data.json'

const chartOptions = {
    series: [{
        name: 'Agendamentos Online',
        data: [40,70,20,90,36,80,30,91,60]
    }, {
        name: 'Agendamentos Presenciais',
        data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10]
    }],
    options: {
        color: ['#6ab04c', '#2980b9'],
        chart: {
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: false
        }
    }
}

const topCustomers = {
    head: [
        'Nome',
        'Total de atendimentos',
        'Total gasto'
    ],
    body: [
        {
            "nome": "john doe",
            "order": "490",
            "valor": "$15,870"
        },
        {
            "nome": "frank iva",
            "order": "250",
            "valor": "$12,251"
        },
        {
            "nome": "anthony baker",
            "order": "120",
            "valor": "$10,840"
        },
        {
            "nome": "frank iva",
            "order": "110",
            "valor": "$9,251"
        },
        {
            "nome": "anthony baker",
            "order": "80",
            "valor": "$8,840"
        }
    ]
}

const renderCusomerHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderCusomerBody = (item, index) => (
    <tr key={index}>
        <td>{item.nome}</td>
        <td>{item.order}</td>
        <td>{item.valor}</td>
    </tr>
)

const latestOrders = {
    header: [
        "id",
        "cliente",
        "valor",
        "data",
        "status"
    ],
    body: [
        {
            id: "#OD1711",
            cliente: "john doe",
            date: "17 Jun 2021",
            valor: "$900",
            status: "agendado"
        },
        {
            id: "#OD1712",
            cliente: "frank iva",
            date: "1 Jun 2021",
            valor: "$400",
            status: "agendado"
        },
        {
            id: "#OD1713",
            cliente: "anthony baker",
            date: "27 Jun 2021",
            valor: "$200",
            status: "agendado"
        },
        {
            id: "#OD1712",
            cliente: "frank iva",
            date: "1 Jun 2021",
            valor: "$400",
            status: "agendado"
        },
        {
            id: "#OD1713",
            cliente: "anthony baker",
            date: "27 Jun 2021",
            valor: "$200",
            status: "cancelado"
        }
    ]
}

const orderStatus = {
    "agendado": "success",
    "cancelado": "danger"
}

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.cliente}</td>
        <td>{item.valor}</td>
        <td>{item.date}</td>
        <td>
            <Badge type={orderStatus[item.status]} content={item.status}/>
        </td>
    </tr>
)

const Dashboard = () => {

    const themeReducer = useSelector(state => state.ThemeReducer.mode)

    return (
        <div>
            <h2 className="page-header">Dashboard</h2>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        {
                            statusCards.map((item, index) => (
                                <div className="col-6" key={index}>
                                    <StatusCard
                                        icon={item.icon}
                                        count={item.count}
                                        title={item.title}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="col-6">
                    <div className="card full-height">
                        {/* chart */}
                        <Chart
                            options={themeReducer === 'theme-mode-dark' ? {
                                ...chartOptions.options,
                                theme: { mode: 'dark'}
                            } : {
                                ...chartOptions.options,
                                theme: { mode: 'light'}
                            }}
                            series={chartOptions.series}
                            type='line'
                            height='100%'
                        />
                    </div>
                </div>
                <div className="col-4">
                    <div className="card">
                        <div className="card__header">
                            <h3>Maiores Clientes</h3>
                        </div>
                        <div className="card__body">
                            <Table
                                headData={topCustomers.head}
                                renderHead={(item, index) => renderCusomerHead(item, index)}
                                bodyData={topCustomers.body}
                                renderBody={(item, index) => renderCusomerBody(item, index)}
                            />
                        </div>
                        <div className="card__footer">
                            <Link to='/'>Visualizar</Link>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <div className="card">
                        <div className="card__header">
                            <h3>Últimos agendamentos</h3>
                        </div>
                        <div className="card__body">
                            <Table
                                headData={latestOrders.header}
                                renderHead={(item, index) => renderOrderHead(item, index)}
                                bodyData={latestOrders.body}
                                renderBody={(item, index) => renderOrderBody(item, index)}
                            />
                        </div>
                        <div className="card__footer">
                            <Link to='/agenda'>Visualizar</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
