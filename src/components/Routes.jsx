import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Clientes from '../pages/Clientes'
import Agenda from '../pages/Agenda'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/clientes' component={Clientes}/>
            <Route path='/agenda' component={Agenda}/>
        </Switch>
    )
}

export default Routes
