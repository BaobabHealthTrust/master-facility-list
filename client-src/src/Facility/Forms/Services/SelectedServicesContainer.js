import React from "react";
import PropTypes from "prop-types";

function SelectedServicesContainer(props) {
  const { services, onRemove } = props;
  return services.map(service => (
    <div key={service.id} className="p-4 mb-2 shadow w-full cursor-pointer">
      <div className="flex justify-between">
        <div>
          <strong>{service.service_type}</strong>
        </div>
        <div />
      </div>
      {service.first.map(first => (
        <div key={first.id} className="flex justify-between mt-4 ml-4">
          <div>{first.service_name}</div>
          <div>
            <i
              className="material-icons mr-4"
              onClick={() => onRemove(first.id)}
            >
              close
            </i>
          </div>
        </div>
      ))}
      {service.second.map(second => (
        <div key={second.id} className="flex justify-between mt-4 ml-8">
          <div>{second.service_name}</div>
          <div>
            <i
              className="material-icons mr-4"
              onClick={() => onRemove(second.id)}
            >
              close
            </i>
          </div>
        </div>
      ))}
      {service.third.map(third => (
        <div key={third.id} className="flex justify-between mt-4 ml-12">
          <div>{third.service_name}</div>
          <div>
            <i
              className="material-icons mr-4"
              onClick={() => onRemove(third.id)}
            >
              close
            </i>
          </div>
        </div>
      ))}
    </div>
  ));
}

SelectedServicesContainer.propTypes = {
  onClick: PropTypes.func,
  services: PropTypes.array
};

export default SelectedServicesContainer;
