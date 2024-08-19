
interface MainContainerHeaderProps {
    title: string
}

export const MainContainerHeader = ({ title }: MainContainerHeaderProps) => {

    return (
        <header id="main-container-header">
            <h1 id="">{title}</h1>
        </header>
    )
}