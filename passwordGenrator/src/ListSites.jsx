
function ListSites({ sites }) {
    return (
        sites.map(site => (
            <div key={Date.now()}>

                <h3>{site.web}--- {site.password}</h3>

            </div>
        ))
    )
}

export default ListSites;