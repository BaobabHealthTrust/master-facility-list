import React, { Component } from "react";
import { Col, Card } from 'react-materialize';

export default ({ services, facilityType }) => {
  const topLevelServices = services.filter(service => {
    return service.service.service_category_id === 0;
  });
  // TODO: Sort out hierarchy
  return (
    <div className="row">
      {
        topLevelServices.length === 0
        && <h6>There are no Sub Services for {facilityType}</h6>
      }
      {
        topLevelServices.map(tlService => {
          return (
            <Col m={4} s={12}>
              <Card title={tlService.service.service_name}>
                <ul>
                  {
                    services.filter(service => {
                      return service.service.service_category_id === tlService.service.id
                    }).map(secondaryService => {
                      return (
                        <li>
                          <h6 className="flex flex-row align-center">
                            <i class="material-icons">keyboard_arrow_right</i>
                            <span>{secondaryService.service.service_name}</span>
                          </h6>
                        </li>
                      )
                    })
                  }
                </ul>
              </Card>
            </Col>
          )
        })
      }
    </div >
  )
}
