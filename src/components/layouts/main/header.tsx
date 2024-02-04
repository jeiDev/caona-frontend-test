import { navItems } from "@settings/nav.setting"
import Link from "next/link"
import { useState } from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Navbar expanded={expanded} expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">
                    <span className="ml-3 font-weight-bold">BRAND</span>
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    onClick={() => setExpanded(!expanded)}
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {navItems.map((item, i) => (
                            <Nav.Link href={item.link} key={i}>{item.label}</Nav.Link>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header