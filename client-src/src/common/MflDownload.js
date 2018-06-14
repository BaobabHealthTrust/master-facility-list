import React, { Component } from "react";

export default ({ buttonConfiguration, mainButtonConfiguration }) => {
  return (
    <div className="fixed-action-btn horizontal mfl-download right">
      <a className={`btn-floating btn-large ${mainButtonConfiguration.color}`}>
        <i className="large material-icons">{mainButtonConfiguration.icon}</i>
      </a>

      <ul>
        {
          buttonConfiguration.map(buttonConfig => {
            return (
              <li>
                <a
                  className={`btn-floating ${buttonConfig.color} darken-1`}
                  // data-delay='500'
                  // data-tooltip={buttonConfig.name}
                  onClick={buttonConfig.action}
                >
                  <i className="material-icons">{buttonConfig.icon}</i>
                </a>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}
