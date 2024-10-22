import AppBar from '../Components/AppBar'

function AdminContentEdit() {

    return (
        <div>
            <main className="main">
                <div className="inner settings">
                    <div className="settings-title">Choose exchange</div>
                    <button className={`settings-item`} >
                        <div className="settings-item-image">
                            <div className="exchange-image is-binance">Binance</div>
                        </div>
                        <div className="settings-item-content">
                            <p>Binance</p>
                        </div>
                        <div className="settings-item-action">
                            <div className="icon is-24">Binance</div>
                        </div>
                    </button>                    
                </div>
            </main>
            <AppBar />            
        </div>
    )
}

export default AdminContentEdit
