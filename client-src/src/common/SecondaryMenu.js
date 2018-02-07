//@flow
import * as React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import type { SecondaryLink } from '../types/helper-types';

type Props = {
    links: Array<SecondaryLink>,
    defaultActivePage: string
}

type State = {
    activePage: string
}

export default class SecondaryMenu extends React.Component<Props, State> {

    state = {
        activePage: this.props.defaultActivePage
    }

    handleClick(page: string, handler: ?Function): void {
        this.setState({
            activePage: page
        });

        handler && handler();
    }

    render() {
        return (
            <nav>
                <div class="nav-wrapper blue darken-2">
                    <ul class="left">
                        {
                            this.props.links.map(link => {
                                return (
                                    <li
                                        className={
                                            this.state.activePage === link.name
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        <Link
                                            to={(link.redirect && link.redirect) || ""}
                                            onClick={
                                                () =>
                                                    this.handleClick(link.name, link.clickHandler)}
                                        >
                                            {link.displayName.toUpperCase()}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </nav>
        );
    }
}