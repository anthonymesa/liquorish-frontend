import React, { useEffect } from 'react'
import HeaderV2 from '../headerv2/HeaderV2'
import { FiMenu } from 'react-icons/fi'
import { useNavigate } from 'react-router'
import './BarHome.css'

export default function BarHome(){

	const navigate = useNavigate()

	const [page_loaded, setPageLoaded] = React.useState(false)
	const [bar_data, setBarData] = React.useState(null)

	const loadBarData = () => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('dummy')
			}, 2000)
		})
	}

	useEffect(() => {
		loadBarData().then((value) => {
			console.log('you are a ' + value)

			setPageLoaded(true)
		})
	}, [])

	return (
		<div>
			{page_loaded && 
			<div>
				<HeaderV2 
					does_nave={false}
					title={bar_data.name}
					elements={[
						<FiMenu size="2em" onClick={() => { navigate('/home/bar/settings') }} />
					]}
				/>
				<BarDashboard />
				<BarFooter />
			</div>
			}
		</div>
	)
}

function BarDashboard(){

	const [dashboard_state, setDashboardState] = React.useState(0)

	const dashboard_view = () => {
		switch(dashboard_state){
			case 0:
				return <BarHomeOrderView />
			case 1:
				return <BarHomeTabView />
		}
	}

	return (
		<div>
			{ dashboard_view }
			<BarDashboardViewControl />
		</div>
	)
}

function BarHomeOrderView(){
	return (
		<div></div>
	)
}

function BarHomeTabView(){
	return (
		<div></div>
	)
}

function BarDashboardViewControl(){
	return (
		<div></div>
	)
}

function BarFooter(){
	return (
		<div>

		</div>
	)
}