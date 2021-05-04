import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import StackRoutes from './stack.routes'

const Routs = ()=>(
    <NavigationContainer>
        <StackRoutes />
    </NavigationContainer>
)

export default Routs