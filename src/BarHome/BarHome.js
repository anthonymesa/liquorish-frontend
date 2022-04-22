import React, { useEffect } from 'react'
import HeaderV2 from '../headerv2/HeaderV2'
import { FiMenu } from 'react-icons/fi'
import { useNavigate } from 'react-router'
import './BarHome.css'
import { Button, Row } from 'react-bootstrap'
import ReadyStateIcon from '../ReadyStateIcon/ReadyStateIcon'
import PollingLayer from '../polling_layer/PollingLayer'

export default function BarHome(){

	const navigate = useNavigate()

	const [page_loaded, setPageLoaded] = React.useState(false)
	const [bar_data, setBarData] = React.useState(null)

	const loadBarData = () => {

        const bar_id = sessionStorage.getItem('client_id')

        return new Promise(async (resolve, reject) => {
            const url = 'https://liquorish-server.azurewebsites.net/getBar/' + bar_id
            const response = await fetch(url);
            const jsonResponse = await response.json();
            resolve(jsonResponse.value)
        });
	}

	useEffect(() => {
		loadBarData().then((value) => {
			setBarData(value)
			setPageLoaded(true)
		})
	}, [])

	return (
		<div className="root">
			{page_loaded && 
			<div>
				<HeaderV2 
					does_nave={false}
					title={bar_data.bar_name}
					elements={[
						<FiMenu size="2em" onClick={() => { navigate('/home/bar/settings') }} />
					]}
				/>
				<BarDashboard bar_data={bar_data}/>
				<BarFooter />
			</div>
			}
		</div>
	)
}

function BarDashboard({bar_data}){
	const [dashboard_state, setDashboardState] = React.useState(0)

	return (
		<div>
			{ (dashboard_state === 0) ? <BarHomeOrderView bar_data={bar_data}/> : null}
            { (dashboard_state === 1) ? <BarHomeTabView bar_data={bar_data}/> : null}
			<BarDashboardViewControl setDashboardState={setDashboardState}/>
		</div>
	)
}

function BarHomeOrderView({ bar_data }){
	
    const [order_list_dom, setBarOrderListDom] = React.useState(null)

    const getBarOrders = () => {
        return new Promise(async (resolve, reject) => {
            const url = 'https://liquorish-server.azurewebsites.net/getOrders/' +  bar_data.id
            const response = await fetch(url);
            const jsonResponse = await response.json();
            resolve(jsonResponse.value)
        })
    }
    
    const generateOrderListDom = (_bar_orders) => {
        return _bar_orders.map((bar_order) => <BarHomeOrderListElement  bar_order={bar_order} />)
    }

    const InitializeBarData = () => {
        getBarOrders().then((bar_orders) => {
            console.log(JSON.stringify(bar_orders))
            const bar_orders_list_dom = generateOrderListDom(bar_orders)
            setBarOrderListDom(bar_orders_list_dom)
        })
    }

    const updateOrders = () => {
        InitializeBarData()
    }

    useEffect(() => {
        InitializeBarData()
    }, [])
    
    return (
		<div>
            { order_list_dom }
            <PollingLayer polling_time={1000} timeout_ref={'bar_order_list_poll'} action={updateOrders} />
        </div>
	)
}

function BarHomeOrderListElement({bar_order}){
    return (
        <div key={bar_order.order_num} className="tab_drink">
            <Row onClick={() => {}}>
            { bar_order.drink_name }
            </Row>

            <div className="element_ready_icon">
            <ReadyStateIcon drink_data={bar_order}/>
            </div>

        </div>
    )
}

function BarHomeTabView(){
	return (
		<div></div>
	)
}

function BarDashboardViewControl({ setDashboardState }){
	return (
		<div className="bar-dashboard-view-control">
            <Button className="view-control-button" onClick={() => { setDashboardState(0) }}>Orders</Button>
            <Button className="view-control-button" onClick={() => { setDashboardState(1) }}>Tabs</Button>
        </div>
	)
}

function BarFooter(){
	return (
		<div className="liquorish-footer">
            <Button className="btn btn-primary">Transactions</Button>
            <Button className="btn btn-secondary">Invite User</Button>
		</div>
	)
}