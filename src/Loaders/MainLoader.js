import {React} from 'react';
import { ThreeCircles } from 'react-loader-spinner'

export default function MainLoader(){
    return(
        <>
        <div className="loaderCon">
        <ThreeCircles
        height="80" 
        width="80" 
        radius="9"
        color="#fa568d" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
        outerCircleColor="#5972b9"
        innerCircleColor="#fa568d"
        middleCircleColor="#5972b9"
        />
        </div>
        </>
    )
}