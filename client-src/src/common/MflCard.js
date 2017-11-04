import React from "react";
export default ({ heading, data }) => {
    return (
        <div className=" z-depth-2 mlf-w-9 mfl-p-5">
            <p className="center mfl-summary-header">{heading}</p>

            <table>
                <tbody>
                    {data.map(row => {
                        return (
                            <tr className="mfl-card-row">
                                <td className="mfl-summary-subheader">
                                    {row[0]}
                                </td>
                                <td className="right-align mfl-summary-subtext">
                                    {row[1]}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
