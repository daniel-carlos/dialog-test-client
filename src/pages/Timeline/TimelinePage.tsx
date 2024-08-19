import { useEffect } from "react"
import { MainContainerHeader } from "../../components/layout/MainContainerHeader"
import { TimelineComponent } from "./TimelineComponent"
import { useMe } from "../../contexts/user/meContext"

export const TimelinePage = () => {
    const me = useMe()
    
    return (
        <>
            <MainContainerHeader title="Timeline" />
            <TimelineComponent />
        </>
    )
}