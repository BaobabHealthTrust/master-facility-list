import React, { useEffect, useState } from "react";
import { hasFilterValuesForType } from "../../../services/helpers";
import FacilityView from "./Facility.view";

const API = process.env.REACT_APP_API_URL;

function FacilityContainer(props: Props) {
  const {
    drawerOpen,
    history,
    owners,
    loading,
    fetchOwners,
    filterOptions,
    filterResults,
    filteredFacilities,
    removeFilterValue,
    addFilterValue,
    basicAdvancedFilter,
    resourcesAdvancedFilter,
    utilitiesAdvancedFilter,
    servicesAdvancedFilter,
    toggleFacilityFilter,
    facilities,
    fetchFilteredFacilities
  } = props;

  const [facilitiesData, setFacilitiesData] = useState([] as any);

  useEffect(() => {
    const facilitiesData: any =
      filterOptions.length > 0 ? filteredFacilities : facilities;
    setFacilitiesData(facilitiesData);
  }, [facilities, filteredFacilities, filterOptions]);

  useEffect(() => {
    filterFacilities();
  }, [filterOptions]);

  useEffect(() => {
    fetchFilteredFacilities(filterOptions, filterResults);
  }, [filterResults]);

  useEffect(() => {
    if (owners.length == 0) {
      fetchOwners();
    }
  }, []);

  const handleFacilityClick = (facilityId: number) => {
    history.push(`facilities/${facilityId}`);
  };

  const isLoading = () =>
    loading.basicAdvancedFilter ||
    loading.utilitiesAdvancedFilter ||
    loading.resourcesAdvancedFilter ||
    loading.servicesAdvancedFilter ||
    loading.fetchFacilities;

  const downloadFileIn = (format: "pdf" | "csv" | "excel") => {
    const { filterOptions } = props;
    const facilityIds =
      filterOptions.length > 0 ? filteredFacilities.map(f => f.id) : [];
    const whereClause =
      filterOptions.length > 0 ? { id: { inq: facilityIds } } : {};
    window.open(
      `${API}/facilities/download?data=` +
        JSON.stringify({
          where: whereClause,
          format
        })
    );
  };

  const onAddFilter = async (
    value: { type: string; id: number; label: string; range?: any },
    options: Array<number> = []
  ) => {
    const { type, id } = value;
    if (id == -1) {
      let filterOptionsToRemove =
        type == "utilities" || type == "services"
          ? filterOptions.filter(
              option => option.type == type && options.includes(option.id)
            )
          : filterOptions.filter(option => option.type == type);

      for (let valueForType of filterOptionsToRemove) {
        removeFilterValue(valueForType);
      }
      return;
    }

    await addFilterValue(value);
  };

  const filterFacilities = async () => {
    if (hasFilterValuesForType("basic", filterOptions))
      await basicAdvancedFilter(filterOptions);

    if (hasFilterValuesForType("resources", filterOptions))
      await resourcesAdvancedFilter(filterOptions);

    if (hasFilterValuesForType("utilities", filterOptions))
      await utilitiesAdvancedFilter(filterOptions);

    if (hasFilterValuesForType("services", filterOptions))
      await servicesAdvancedFilter(filterOptions);
  };

  const removeFilter = async (value: any) => {
    await removeFilterValue(value);
  };

  return (
    <FacilityView
      onFacilityClicked={(facilityId: number) =>
        handleFacilityClick(facilityId)
      }
      drawerOpen={drawerOpen}
      onToggleDrawer={toggleFacilityFilter}
      onAddFilter={onAddFilter}
      onRemoveFilter={removeFilter}
      facilities={facilitiesData}
      filterOptions={filterOptions}
      downloadList={downloadFileIn}
      isLoading={isLoading()}
    />
  );
}

type Props = {
  drawerOpen: boolean;
  toggleFacilityFilter: Function;
  filterOptions: Array<any>;
  filterResults: any;
  facilities: Array<any>;
  filteredFacilities: Array<any>;
  owners: Array<any>;
  fetchOwners: Function;
  history?: any;
  addFilterValue: Function;
  removeFilterValue: Function;
  basicAdvancedFilter: Function;
  resourcesAdvancedFilter: Function;
  utilitiesAdvancedFilter: Function;
  servicesAdvancedFilter: Function;
  fetchFilteredFacilities: Function;
  loading: any;
};

export default FacilityContainer;
