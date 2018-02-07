import React from "react";
export default ({ heading, data, icon }) => {
    return (
        <div className=" z-depth-2 mlf-w-9">
            <div className="mfl-card-title blue">
                <i class="material-icons mfl-icon left mfl-icon-color">{icon}</i>
                {heading}
            </div>
            <div className=" mfl-p-2 mfl-bm-5">
                <table className="mfl-card-row mfl-table-card">
                    <tbody>
                        {data.map((row, index) => {
                            return (
                                <tr key={index} className="mfl-card-row">
                                    <td className="mfl-summary-subheader">
                                        {row[0]}
                                    </td>
                                    <td className="right-align mfl-summary-subtext">
                                        {row[1] ? (
                                            row[1]
                                        ) : (
                                                <i class="material-icons mfl-icon right">
                                                    check
                                        </i>
                                            )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
