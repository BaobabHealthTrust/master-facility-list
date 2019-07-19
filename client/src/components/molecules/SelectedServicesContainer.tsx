import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function SelectedServicesContainer(props: Props) {
  const { services, onRemove } = props;
  return services.map((service: any) => (
    <div key={service.id} className="p-4 mb-2 shadow w-full cursor-pointer">
      <div className="flex justify-between">
        <div>
          <strong>{service.service_type}</strong>
        </div>
        <div />
      </div>
      {service.first.map((first: any) => (
        <div
          key={first.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "4px 0px 0px 4px"
          }}
        >
          <div>{first.service_name}</div>
          <div>
            <i onClick={() => onRemove(first.id)}>
              <FontAwesomeIcon icon={faTimes} />
            </i>
          </div>
        </div>
      ))}
      {service.second.map((second: any) => (
        <div
          key={second.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "4px 0px 0px 8px"
          }}
        >
          <div>{second.service_name}</div>
          <div>
            <i onClick={() => onRemove(second.id)}>
              <FontAwesomeIcon icon={faTimes} />
            </i>
          </div>
        </div>
      ))}
      {service.third.map((third: any) => (
        <div
          key={third.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "4px 0px 0px 12px"
          }}
        >
          <div>{third.service_name}</div>
          <div>
            <i onClick={() => onRemove(third.id)}>
              <FontAwesomeIcon icon={faTimes} />
            </i>
          </div>
        </div>
      ))}
    </div>
  ));
}

type Props = {
  services: any;
  onRemove: Function;
};

export default SelectedServicesContainer;
