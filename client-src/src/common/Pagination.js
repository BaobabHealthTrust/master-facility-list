import React from "react";

const Pagination = () => {
    return (
        <ul class="pagination  right">
            <li class="disabled">
                <a href="#!">
                    <i class="material-icons">chevron_left</i>
                </a>
            </li>
            <li class="active blue">
                <a href="#!">1</a>
            </li>
            <li class="waves-effect">
                <a href="#!">2</a>
            </li>
            <li class="waves-effect">
                <a href="#!">3</a>
            </li>
            <li class="waves-effect">
                <a href="#!">4</a>
            </li>
            <li class="waves-effect">
                <a href="#!">5</a>
            </li>
            <li class="waves-effect">
                <a href="#!">
                    <i class="material-icons">chevron_right</i>
                </a>
            </li>
        </ul>
    );
};

export default Pagination;
