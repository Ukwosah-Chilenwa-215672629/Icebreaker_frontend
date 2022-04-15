import React from "react"
import { CircularProgress } from "@material-ui/core"
import './Skeleton.css'
export default function Skeleton(){

    const Circle = () => (
        <div className="circle">    
            <CircularProgress></CircularProgress>
        </div>
    )

    

    const customLoading = () => (
        <div className="custom">
            <div className="balls">
                <div className="ball b1"></div>
                <div className="ball b2"></div>
                <div className="ball b3"></div>
            </div>

            <span className="customText"> Loading...</span>
        </div>
    )

    return(
        <div>
            <Circle></Circle>
        </div>
        )
}