import { navItems } from "@settings/nav.setting"
import Link from "next/link"

const Header = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light shadow-sm bg-light fixed-top">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" href="/">
                    <span className="ml-3 font-weight-bold">BRAND</span>
                </Link>
                <button
                    className="navbar-toggler navbar-toggler-right border-0"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar4"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbar4">
                    <ul className="navbar-nav mr-auto pl-lg-4">
                        {navItems.map((item, i) => (
                            <li className="nav-item px-lg-2 active" key={i}>
                                <Link href={item.link} className="nav-link">
                                    <span className="d-inline-block d-lg-none icon-width">
                                        <i className="fas fa-home" />
                                    </span>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Header