import React from 'react';
import {Link} from 'react-router-dom';

export default function Header (props) {
    return (
            <div className={'menu'}>
                <ul className={'menu-list'}>
                    {
                        props.pages.filter(page => page.vision === 'visible').map((page, i) => {
                            return (
                                <li key={i}>
                                    <Link to={page.path}>
                                        <p className={page.pageId}>{page.name}</p>

                                    </Link>
                                </li>
                            );
                        })
                    }
                </ul>

            </div>
)
}