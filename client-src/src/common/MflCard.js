import React from "react";
export default ({ heading, data, icon }) => {
    return (
        <div className=" z-depth-2 mlf-w-9 mfl-p-2 mfl-bm-5">
            <p className="center mfl-summary-header mfl-p-2">
                <i class="material-icons mfl-icon left">{icon}</i>
                {heading}
            </p>

            <table className="mfl-card-row mfl-table-card">
                <tbody>
                    {data.map(row => {
                        return (
                            <tr className="mfl-card-row">
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
    );
};
