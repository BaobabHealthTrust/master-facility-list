<div className="row">
    <div className="col s12">
        <div className="mfl-graphs-container">
            <div className="mfl-dash-container">
                <div className="row">
                    <div className="col s12 m6 l4 xl2">
                        <div className="mfl-tm-5" />
                        <Card
                            icon="local_hospital"
                            stat={this.calculateTotal()}
                            title="Total Facilities"
                        />
                    </div>
                    {this.state.dashboardServices.map(
                        services => (
                            <div className="col s12 m6 l4 xl2">
                                <div className="mfl-tm-5" />
                                <Card
                                    icon={services.icon}
                                    stat={this.calculateTotalFacilitiesWith(
                                        services.id
                                    )}
                                    title={`Facilities with ${
                                        services.displayName
                                        }`}
                                />
                            </div>
                        )
                    )}
                    {/* TODO: Add Components for the other Statistics */}
                </div>
                <div className="row mfl-tm-2">
                    <div className="col s12 m6 l4 xl3">
                        <div className="mfl-tm-5" />
                        <FacilityOwnershipChart
                            data={ownershipData}
                        />
                    </div>

                    <div className="col s12 m6 l4 xl3">
                        <div className="mfl-tm-5" />
                        <FacilityOperationalChart
                            data={operationalStatusData}
                        />
                    </div>
                    <div className="col s12 m6 l4 xl3">
                        <div className="mfl-tm-5" />
                        <FacilityRegulatoryStatusChart
                            data={regulatoryStatusData}
                        />
                    </div>
                </div>
                <div className="row mfl-tm-2" />
            </div>
        </div>
    </div>
</div>