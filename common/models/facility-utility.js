'use strict';

module.exports = function(Facilityutility) {
        Facilityutility.edit = async function(inputData,cb){
            console.log(inputData);
        	// await inputData.oldData.map(id=>{
         //       Facilityutility.deleteById(id,
        	//    function(err,results)
        	//    {console.log(results)});
        	//   });
        	// await inputData.newData && Facilityutility.create(inputData.newData,
         //        function(err,results)
        	//    {console.log(results)})
        }
    
    Facilityutility.remoteMethod("edit", {
        description: "Edit all FacilityUtilities by facility_id",
        accepts: { arg: "data", type: "object" },
        returns: { arg: "data", type: "object" }
    });
};
