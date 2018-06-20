//@flow
import React from "react";
import {
  fetchCurrentDetails,
  fetchCurrentServices,
  setCurrentDetails
} from "../actions";
import Container from "./ServicesContainer";
import { connect } from "react-redux";
import { Service, ServiceType } from "../types/model-types";
import { Tab, Tabs } from 'react-materialize';
import { Col, Card } from 'react-materialize';

type Props = {
  services: Array<{ service: Service }>,
  serviceTypes: Array<ServiceType>,
  allServices: Array<Service>
}

class FacilityServices extends React.Component<Props> {
  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.fetchCurrentDetails(id);
    await this.props.fetchCurrentServices(id);
  }

  render() {
    return <div className="container"><h6>Under Construction</h6></div>
  }

  // render() {
  //   // TODO: Fix odd issue when loading tabs
  //   //TODO: Fix Services Hierarchy
  //   return (
  //     <div className="container">
  //       <Tabs className='tabs blue accent-1 mfl-tabs tabs-fixed-width '>
  //         {
  //           this.props.serviceTypes.map((type, index) => {
  //             return (
  //               <Tab title={type.service_type} active={index == 0}>
  //                 {
  //                   this.props.allServices.filter(service => {
  //                     return (
  //                       service.service_type_id === type.id && service.service_category_id === 0
  //                     )
  //                   }).map(tlService => {
  //                     return (
  //                       <Col m={4} s={12}>
  //                         <Card title={tlService.service_name}>
  //                           <ul>
  //                             {
  //                               this.props.allServices.filter(service => {
  //                                 return service.service_category_id === tlService.id
  //                               }).map(slService => {
  //                                 return (
  //                                   <li>
  //                                     <h6>{slService.service_name}</h6>
  //                                     <ul>
  //                                       {
  //                                         this.props.allServices.filter(service => {
  //                                           return service.service_category_id === slService.id
  //                                         }).map(tlService => (
  //                                           <li className='mt-4 ml-8'>
  //                                             >
  //                                             {tlService.service_name}
  //                                           </li>
  //                                         ))
  //                                       }
  //                                     </ul>
  //                                   </li>
  //                                 )
  //                               })
  //                             }
  //                           </ul>
  //                         </Card>
  //                       </Col>
  //                     )
  //                   })
  //                 }
  //               </Tab>
  //             )
  //           })
  //         }
  //       </Tabs>
  //     </div>
  //   );
  // }
}

const mapStateToProps = store => {
  return {
    facilities: store.facilities.list,
    services: store.facilities.currentServices,
    serviceTypes: store.dependancies.serviceTypes,
    allServices: store.facilities.services
  };
};

// TODO: Services and others should go into reducer yake

export default connect(mapStateToProps, {
  setCurrentDetails,
  fetchCurrentDetails,
  fetchCurrentServices
})(FacilityServices);
